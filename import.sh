#!/bin/bash

: '
    MIT License

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

    [Credits]
    - Primarily used by WuWa Tracker at https://wuwatracker.com/import (visit the page for usage instructions)
    - originally created by @Yumeo (https://git.yumeo.dev/Yumeo/wuwa-wish-url-finder)
    - improvements by @thekiwibirdddd (color output & optimized search logic)
'

game_path=""
url_found=false
log_found=false
folder_found=false
err_msgs=()
declare -A checked_directories=() 

# Detect color support
if command -v tput >/dev/null && [ $(tput colors) -ge 8 ]; then
    RED="\e[31m"
    GREEN="\e[32m"
    YELLOW="\e[33m"
    MAGENTA="\e[35m"
    GRAY="\e[90m"
    RESET="\e[0m"
else
    RED=""
    GREEN=""
    YELLOW=""
    MAGENTA=""
    GRAY=""
    RESET=""
fi


echo -e "${GRAY}Attempting to find URL automatically...${RESET}"

# log error function
log_error() {
    local msg="$1"
    err_msgs+=("$msg")
}

# Function to check for logs and extract URL
log_check() {
    local path="$1"
    
    if [[ ! -d "$path" ]]; then
        folder_found=false
        log_found=false
        url_found=false
        return 1
    else
        folder_found=true
    fi
    
    # Define log paths (Linux paths for Wine/Proton installations)
    local gacha_log_path="$path/Client/Saved/Logs/Client.log"
    local debug_log_path="$path/Client/Binaries/Win64/ThirdParty/KrPcSdk_Global/KRSDKRes/KRSDKWebView/debug.log"
    local engine_ini_path="$path/Client/Saved/Config/WindowsNoEditor/Engine.ini"
    
    # Check if logging is disabled
    if [[ -f "$engine_ini_path" ]]; then
        if grep -q -E '\[Core\.Log\][\r\n]+Global=(off|none)' "$engine_ini_path"; then
            echo -e "\n${RED}ERROR: Your Engine.ini file contains a setting that prevents you from importing your data.${RESET}" >&2
            echo "The file is located at: $engine_ini_path"
            echo "Please manually edit this file to remove or comment out the '[Core.Log]' section with 'Global=off' or 'Global=none'."
            echo "${YELLOW}After editing, restart your game and open the Convene History page before running this script again.${RESET}"
            read -p "Press Enter to continue..."
            exit 1
        fi
    fi
    
    local gacha_url_entry=""
    local debug_url=""
    
    # Check Client.log for gacha URL
    if [[ -f "$gacha_log_path" ]]; then
        log_found=true
        # Replace grep -o with grep -Eo to use extended regex, cleaner, more readable and less trash
        gacha_url_entry=$(grep -Eo 'https://aki-gm-resources(-oversea)?\.aki-game\.(net|com)/aki/gacha/index\.html#/record[^"]*' "$gacha_log_path" | tail -1)
    fi
    
    # Check debug.log for gacha URL
    if [[ -f "$debug_log_path" ]]; then
        log_found=true
        # Same as above, Sed also replaced with Sed -E for consistency
        debug_url=$(grep -Eo '"#url": "(https://aki-gm-resources(-oversea)?\.aki-game\.(net|com)/aki/gacha/index\.html#/record[^"]*)"' "$debug_log_path" \
            | sed -E 's/.*"((https:\/\/)[^"]*)".*/\1/' | tail -1)
    fi
    
    local url_to_copy=""
    
    if [[ -n "$gacha_url_entry" || -n "$debug_url" ]]; then
        if [[ -n "$gacha_url_entry" ]]; then
            url_to_copy="$gacha_url_entry"
            echo "${GREEN}URL found in $gacha_log_path${RESET}"
        elif [[ -n "$debug_url" ]]; then
            url_to_copy="$debug_url"
            echo "${GREEN}URL found in $debug_log_path${RESET}"
        fi
        
        if [[ -n "$url_to_copy" ]]; then
            url_found=true
            echo -e "\n${MAGENTA}Convene Record URL: $url_to_copy${RESET}"
            

            # Copy to clipboard if available
            if command -v xclip >/dev/null 2>&1; then
                echo "$url_to_copy" | xclip -selection clipboard
                echo -e "\n${GREEN}Link copied to clipboard!${RESET}"
            elif command -v xsel >/dev/null 2>&1; then
                echo "$url_to_copy" | xsel --clipboard --input
                echo -e "\n${GREEN}Link copied to clipboard!${RESET}"
            elif command -v wl-copy >/dev/null 2>&1; then
                echo "$url_to_copy" | wl-copy
                echo -e "\n${GREEN}Link copied to clipboard!${RESET}"
            else
                echo -e "\n${YELLOW}Clipboard tool not found. Please manually copy the URL above.${RESET}"
            fi
            return 0
        fi
    fi
    
    return 1
}

# Function to search common Steam/Proton installation paths
search_steam_paths() {
    echo "Searching Steam/Proton installation paths..." >&2
    
    local steam_paths=(
        "$HOME/.steam/steam/steamapps/common/Wuthering Waves"
        "$HOME/.local/share/Steam/steamapps/common/Wuthering Waves"
        "$HOME/.var/app/com.valvesoftware.Steam/.local/share/Steam/steamapps/common/Wuthering Waves"
        "$HOME/.var/app/com.valvesoftware.Steam/.steam/steam/steamapps/common/Wuthering Waves"
        "$HOME/.var/app/com.valvesoftware.Steam/data/Steam/steamapps/common/Wuthering Waves"
        "/usr/local/games/steam/steamapps/common/Wuthering Waves"
    )
    # Also check for custom Steam library folders
    local steam_config_path="$HOME/.steam/steam/config/libraryfolders.vdf"
    if [[ -f "$steam_config_path" ]]; then
        while IFS= read -r line; do
            if [[ $line =~ \"path\"[[:space:]]*\"([^\"]+)\" ]]; then
                local custom_path="${BASH_REMATCH[1]}/steamapps/common/Wuthering Waves"
                steam_paths+=("$custom_path")
            fi
        done < "$steam_config_path"
    fi
    
    for path in "${steam_paths[@]}"; do
        if [[ -d "$path" ]]; then
            echo "Found potential Steam installation: $path" >&2

            # Modified: Changed to O(1) Scanning via Assoc Array, prevents duplicates
            if [[ -n "${checked_directories[$path]}" ]]; then
                log_error "Already checked: $path"
                continue
            fi

            checked_directories["$path"]=1

            # Try both the direct path and Wuthering Waves Game subdirectory
            for game_dir in "$path" "$path/Wuthering Waves Game"; do
                if log_check "$game_dir"; then
                    return 0
                elif [[ "$log_found" == true ]]; then
                    log_error "Path checked: $game_dir."
                    log_error "Cannot find the convene history URL in both Client.log and debug.log! Please open your Convene History first!"
                    log_error "Contact Us if you think this is correct directory and still facing issues."
                elif [[ "$folder_found" == true ]]; then
                    log_error "No logs found at $game_dir"
                else
                    log_error "No Installation found at $game_dir"
                fi
            done
        fi
    done
    
    return 1
}

# Function to search Wine prefixes
search_wine_paths() {
    echo "Searching Wine prefixes..." >&2
    
    local wine_paths=(
        "$HOME/.wine/drive_c/Program Files/Wuthering Waves"
        "$HOME/.wine/drive_c/Program Files (x86)/Wuthering Waves"
        "$HOME/.wine/drive_c/Program Files/Epic Games/WutheringWavesj3oFh"
        "$HOME/.wine/drive_c/Program Files (x86)/Epic Games/WutheringWavesj3oFh"
        "$HOME/.wine/drive_c/Wuthering Waves"
    )
    
    # Search for additional Wine prefixes
    if [[ -d "$HOME/.local/share/wineprefixes" ]]; then
        while IFS= read -r -d '' prefix; do
            wine_paths+=(
                "$prefix/drive_c/Program Files/Wuthering Waves"
                "$prefix/drive_c/Program Files (x86)/Wuthering Waves"
                "$prefix/drive_c/Program Files/Epic Games/WutheringWavesj3oFh"
                "$prefix/drive_c/Program Files (x86)/Epic Games/WutheringWavesj3oFh"
                "$prefix/drive_c/Wuthering Waves"
            )
        done < <(find "$HOME/.local/share/wineprefixes" -maxdepth 1 -type d -print0 2>/dev/null)
    fi
    
    for path in "${wine_paths[@]}"; do
        if [[ -d "$path" ]]; then
            echo "Found potential Wine installation: $path" >&2
            
            # Check if already processed
            if [[ -n "${checked_directories[$path]}" ]]; then
                log_error "Already checked: $path"
                continue
            fi
            checked_directories["$path"]=1

            # Try both the direct path and Wuthering Waves Game subdirectory
            for game_dir in "$path" "$path/Wuthering Waves Game"; do
                if log_check "$game_dir"; then
                    return 0
                elif [[ "$log_found" == true ]]; then
                    log_error "Path checked: $game_dir."
                    log_error "Cannot find the convene history URL in both Client.log and debug.log! Please open your Convene History first!"
                    log_error "Contact Us if you think this is correct directory and still facing issues."
                elif [[ "$folder_found" == true ]]; then
                    log_error "No logs found at $game_dir"
                else
                    log_error "No Installation found at $game_dir"
                fi
            done
        fi
    done
    
    return 1
}

# Function to search Lutris installations
search_lutris_paths() {
    echo "Searching Lutris installations..." >&2
    
    local lutris_base="$HOME/Games"
    if [[ -d "$lutris_base" ]]; then
        while IFS= read -r -d '' game_dir; do
            if [[ $(basename "$game_dir") == *"wuthering"* ]] || [[ $(basename "$game_dir") == *"Wuthering"* ]]; then
                echo "Found potential Lutris installation: $game_dir" >&2
                
                # Check if already processed
                if [[ -n "${checked_directories[$game_dir]}" ]]; then
                    log_error "Already checked: $game_dir"
                    continue
                fi
                checked_directories["$game_dir"]=1
                
                if log_check "$game_dir"; then
                    return 0
                elif [[ "$log_found" == true ]]; then
                    log_error "Path checked: $game_dir."
                    log_error "Cannot find the convene history URL in both Client.log and debug.log! Please open your Convene History first!"
                    log_error "Contact Us if you think this is correct directory and still facing issues."
                elif [[ "$folder_found" == true ]]; then
                    log_error "No logs found at $game_dir"
                else
                    log_error "No Installation found at $game_dir"
                fi
            fi
        done < <(find "$lutris_base" -maxdepth 2 -type d -print0 2>/dev/null)
    fi
    
    return 1
}

# Function to search all mounted drives with Windows-style paths
search_mounted_drives() {
    echo "Searching all mounted drives for Windows-style installations..." >&2
    
    # Get all mounted filesystems (excluding virtual/system filesystems)
    local mounted_drives=()
    
    # Parse mount output more robustly
    while IFS= read -r line; do
        # Extract mount point (everything between "on " and " type")
        if [[ $line =~ \ on\ (.+)\ type\ ([^\ ]+) ]]; then
            local mount_point="${BASH_REMATCH[1]}"
            local fs_type="${BASH_REMATCH[2]}"
            
            # Skip virtual/system filesystems
            case "$fs_type" in
                proc|sysfs|devtmpfs|tmpfs|devpts|securityfs|cgroup*|pstore|bpf|tracefs|debugfs|hugetlbfs|mqueue|configfs|fusectl|binfmt_misc|autofs|rpc_pipefs|nfsd|overlay|squashfs)
                    continue
                    ;;
            esac
            
            # Skip common system mount points but keep user/game relevant ones
            case "$mount_point" in
                /proc|/sys|/dev|/run|/tmp|/var/tmp|/boot|/boot/efi|/var/log|/var/cache)
                    continue
                    ;;
            esac
            
            # Only include accessible directories
            if [[ -d "$mount_point" && -r "$mount_point" ]]; then
                mounted_drives+=("$mount_point")
            fi
        fi
    done < <(mount)
    
    # Also check common mount locations manually
    local common_mount_points=(
        "/mnt"
        "/media"
        "/run/media/$USER"
    )
    
    for base_mount in "${common_mount_points[@]}"; do
        if [[ -d "$base_mount" ]]; then
            while IFS= read -r -d '' subdir; do
                if [[ -d "$subdir" && -r "$subdir" ]]; then
                    # Check if not already in list
                    local already_added=false
                    for existing in "${mounted_drives[@]}"; do
                        if [[ "$existing" == "$subdir" ]]; then
                            already_added=true
                            break
                        fi
                    done
                    if [[ "$already_added" == false ]]; then
                        mounted_drives+=("$subdir")
                    fi
                fi
            done < <(find "$base_mount" -maxdepth 2 -type d -print0 2>/dev/null)
        fi
    done
    
    echo "Available mounted drives: ${mounted_drives[*]}" >&2
    
    for drive in "${mounted_drives[@]}"; do
        echo "Searching drive: $drive..."
        
        # Windows-style paths from original script
        local game_paths=(
            "$drive/SteamLibrary/steamapps/common/Wuthering Waves"
            "$drive/SteamLibrary/steamapps/common/Wuthering Waves/Wuthering Waves Game"
            "$drive/Program Files (x86)/Steam/steamapps/common/Wuthering Waves/Wuthering Waves Game"
            "$drive/Program Files (x86)/Steam/steamapps/common/Wuthering Waves"
            "$drive/Program Files/Steam/steamapps/common/Wuthering Waves/Wuthering Waves Game"
            "$drive/Program Files/Steam/steamapps/common/Wuthering Waves"
            "$drive/Games/Steam/steamapps/common/Wuthering Waves/Wuthering Waves Game"
            "$drive/Games/Steam/steamapps/common/Wuthering Waves"
            "$drive/Steam/steamapps/common/Wuthering Waves/Wuthering Waves Game"
            "$drive/Steam/steamapps/common/Wuthering Waves"
            "$drive/Program Files/Epic Games/WutheringWavesj3oFh"
            "$drive/Program Files/Epic Games/WutheringWavesj3oFh/Wuthering Waves Game"
            "$drive/Program Files (x86)/Epic Games/WutheringWavesj3oFh"
            "$drive/Program Files (x86)/Epic Games/WutheringWavesj3oFh/Wuthering Waves Game"
            "$drive/Wuthering Waves Game"
            "$drive/Wuthering Waves/Wuthering Waves Game"
            "$drive/Program Files/Wuthering Waves/Wuthering Waves Game"
            "$drive/Games/Wuthering Waves Game"
            "$drive/Games/Wuthering Waves/Wuthering Waves Game"
            "$drive/Program Files (x86)/Wuthering Waves/Wuthering Waves Game"
        )
        
        for path in "${game_paths[@]}"; do
            if [[ ! -d "$path" ]]; then
                continue
            fi
            
            echo "${GREEN}Found potential game folder: $path${RESET}" >&2
            
            # Check if already processed
            if [[ -n "${checked_directories[$path]}" ]]; then
                log_error "Already checked: $path"
                continue
            fi
            checked_directories["$path"]=1

            if log_check "$path"; then
                return 0
            elif [[ "$log_found" == true ]]; then
                log_error "Path checked: $path."
                log_error "Cannot find the convene history URL in both Client.log and debug.log! Please open your Convene History first!"
                log_error "Contact Us if you think this is correct directory and still facing issues."
            elif [[ "$folder_found" == true ]]; then
                log_error "No logs found at $path"
            else
                log_error "No Installation found at $path"
            fi
        done
    done
    
    return 1
}

# Main search logic
if ! search_steam_paths; then
    if ! search_lutris_paths; then
        if ! search_wine_paths; then
            search_mounted_drives
        fi
    fi
fi

# Print accumulated errors
if [[ ${#err_msgs[@]} -gt 0 ]]; then
    for msg in "${err_msgs[@]}"; do
        echo -e "${MAGENTA}$msg${RESET}" >&2
    done
fi

# Manual input loop
while [[ "$url_found" != true ]]; do
    echo -e "\n${RED}Game install location not found or log files missing. Did you open your in-game Convene History first?${RESET}" >&2
    
    echo -e "${YELLOW}"
    echo -e "    +--------------------------------------------------+"
    echo -e "    |         ARE YOU USING A THIRD-PARTY APP?         |"
    echo -e "    +--------------------------------------------------+"
    echo -e "    | It looks like a third-party script or tool may   |"
    echo -e "    | have been used previously. These can interfere   |"
    echo -e "    | with the game's logs or import process.          |"
    echo -e "    |                                                  |"
    echo -e "    | Please disable any such tools or consider        |"
    echo -e "    | reinstalling the game before importing again.    |"
    echo -e "    +--------------------------------------------------+"
    echo -e "${RESET}"

    
    echo -e "\nOtherwise, please enter the game install location path." >&2
    echo "Common install locations:" >&2
    echo -e "  ${YELLOW}~/.steam/steam/steamapps/common/Wuthering Waves${RESET}" >&2
    echo -e "  ${YELLOW}~/.local/share/Steam/steamapps/common/Wuthering Waves${RESET}" >&2
    echo -e "  ${YELLOW}~/.wine/drive_c/Program Files/Wuthering Waves/Wuthering Waves Game${RESET}" >&2
    echo -e "  ${YELLOW}~/.wine/drive_c/Program Files/Epic Games/WutheringWavesj3oFh${RESET}" >&2
    echo -e "  ${YELLOW}~/Games/wuthering-waves${RESET}" >&2
    
    read -p "Input your installation location (otherwise, type \"exit\" to quit): " path
    
    if [[ -n "$path" ]]; then
        if [[ "${path,,}" == "exit" ]]; then
            break
        fi
        game_path="$path"
        echo -e "\n\n\n${MAGENTA}User provided path: $path${RESET}" >&2
        
        if log_check "$path"; then
            break
        elif [[ "$log_found" == true ]]; then
            log_error "Path checked: $game_path"
            log_error "Cannot find the convene history URL in both Client.log and debug.log! Please open your Convene History first!"
        elif [[ "$folder_found" == true ]]; then
            echo -e "${YELLOW}No logs found at $game_path${RESET}" >&2
        else
            echo -e "${RED}Folder not found in user-provided path: $path${RESET}" >&2
            echo -e "${RED}Could not find log files. Did you set your game location properly or open your Convene History first?${RESET}" >&2
        fi
    else
        echo -e "${RED}Invalid game location. Did you set your game location properly?${RESET}" >&2
    fi
done

if [[ "$url_found" != true ]]; then
    echo -e "${RED}Exiting without finding URL.${RESET}" >&2
    exit 1
fi