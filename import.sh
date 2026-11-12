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
    - Thanks to @RabbyDevs for sending the decoder script after Kuro added XOR obfuscation to the Client.log file, it was originally discovered by his friend @kyuxu
'

game_path=""
url_found=false
log_found=false
folder_found=false
err_msgs=()
spinner_pid=""
log_paths=()
log_types=()
log_install_paths=()
log_mtimes=()
unreadable_logs=()
discovery_roots=()
candidate_used=()
candidate_url=""
matched_log_path=""

# Detect color support
if command -v tput >/dev/null 2>&1 && [ "$(tput colors 2>/dev/null || echo 0)" -ge 8 ]; then
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


# log error function
log_error() {
    local msg="$1"
    err_msgs+=("$msg")
}

start_spinner() {
    local message="$1"

    if [[ ! -t 2 ]]; then
        echo "$message" >&2
        return 0
    fi

    (
        local i=0
        local frame=""

        while :; do
            case $((i % 4)) in
                0) frame="|" ;;
                1) frame="/" ;;
                2) frame="-" ;;
                3) frame="\\" ;;
            esac

            printf "\r%s %s" "$frame" "$message" >&2
            i=$((i + 1))
            sleep 0.1
        done
    ) &
    spinner_pid=$!
}

stop_spinner() {
    local message="$1"

    if [[ -n "$spinner_pid" ]]; then
        kill "$spinner_pid" 2>/dev/null
        wait "$spinner_pid" 2>/dev/null
        spinner_pid=""

        if [[ -t 2 ]]; then
            printf "\r%*s\r" "${COLUMNS:-80}" "" >&2
            if [[ -n "$message" ]]; then
                echo "$message" >&2
            fi
        fi
    fi
}

trap 'stop_spinner ""' EXIT

read_log_file() {
    local log_path="$1"

    for _ in 1 2 3; do
        if cat "$log_path" 2>/dev/null; then
            return 0
        fi
        sleep 0.2
    done

    return 1
}

decrypt_client_log() {
    if command -v python3 >/dev/null 2>&1; then
        python3 -c '
import sys

data = sys.stdin.buffer.read()

sys.stdout.buffer.write(
    bytes(
        byte ^ (0xA5 if (byte & 0x0F) % 2 == 1 else 0xEF)
        for byte in data
    )
)
'
    elif command -v perl >/dev/null 2>&1; then
        perl -0777 -pe 's/(.)/chr((ord($1) & 0x0f) % 2 == 1 ? ord($1) ^ 0xa5 : ord($1) ^ 0xef)/gse'
    else
        return 1
    fi
}

extract_convene_url() {
    grep -aEo 'https://aki-gm-resources(-oversea)?\.aki-game\.(net|com)/aki/gacha/index\.html#/record[^"[:space:]]*' | tail -1
}

contains_value() {
    local needle="$1"
    shift
    local value

    for value in "$@"; do
        if [[ "$value" == "$needle" ]]; then
            return 0
        fi
    done

    return 1
}

get_file_mtime() {
    local path="$1"
    local value=""

    if [[ "$OSTYPE" == darwin* ]]; then
        value=$(stat -f '%m' "$path" 2>/dev/null)
    else
        value=$(stat -c '%Y' "$path" 2>/dev/null)
    fi

    if [[ ! "$value" =~ ^[0-9]+$ ]]; then
        value=0
    fi

    echo "$value"
}

add_discovery_root() {
    local root="$1"

    if [[ ! -d "$root" || ! -r "$root" ]]; then
        return 0
    fi

    if ! contains_value "$root" "${discovery_roots[@]}"; then
        discovery_roots+=("$root")
    fi
}

check_engine_ini() {
    local install_path="$1"
    local engine_ini_path="$install_path/Client/Saved/Config/WindowsNoEditor/Engine.ini"

    if [[ -f "$engine_ini_path" ]] && awk '
        /^\[Core\.Log\][[:space:]]*$/ { in_core_log=1; next }
        /^\[/ { in_core_log=0 }
        in_core_log && $0 ~ /^[[:space:]]*Global[[:space:]]*=[[:space:]]*(off|none)[[:space:]]*$/ { found=1 }
        END { exit(found ? 0 : 1) }
    ' "$engine_ini_path" 2>/dev/null; then
        echo -e "\n${RED}ERROR: Your Engine.ini file contains a setting that prevents you from importing your data.${RESET}" >&2
        echo "The file is located at: $engine_ini_path" >&2
        echo "Please manually edit this file to remove or comment out the '[Core.Log]' section with 'Global=off' or 'Global=none'." >&2
        echo -e "${YELLOW}After editing, restart your game and open the Convene History page before running this script again.${RESET}" >&2
        read -p "Press Enter to continue..."
        exit 1
    fi
}

add_log_candidate() {
    local log_path="$1"
    local log_type=""
    local install_path=""

    case "$log_path" in
        */Client/Saved/Logs/Client.log)
            log_type="client"
            install_path="${log_path%/Client/Saved/Logs/Client.log}"
            ;;
        */Client/Binaries/Win64/ThirdParty/KrPcSdk_Global/KRSDKRes/KRSDKWebView/debug.log)
            log_type="debug"
            install_path="${log_path%/Client/Binaries/Win64/ThirdParty/KrPcSdk_Global/KRSDKRes/KRSDKWebView/debug.log}"
            ;;
        *)
            return 0
            ;;
    esac

    if [[ ! -f "$log_path" ]]; then
        return 0
    fi

    log_found=true

    if [[ ! -r "$log_path" ]]; then
        if ! contains_value "$log_path" "${unreadable_logs[@]}"; then
            unreadable_logs+=("$log_path")
        fi
        return 0
    fi

    if contains_value "$log_path" "${log_paths[@]}"; then
        return 0
    fi

    log_paths+=("$log_path")
    log_types+=("$log_type")
    log_install_paths+=("$install_path")
    log_mtimes+=("$(get_file_mtime "$log_path")")
}

collect_logs_from_tree() {
    local root="$1"
    local path=""

    if [[ ! -d "$root" ]]; then
        return 0
    fi

    folder_found=true

    if [[ ! -r "$root" ]]; then
        log_error "Cannot read discovery root: $root"
        return 0
    fi

    while IFS= read -r -d '' path; do
        add_log_candidate "$path"
    done < <(
        find "$root" \( -type f -o -type l \) \( \
            -path '*/Client/Saved/Logs/Client.log' -o \
            -path '*/Client/Binaries/Win64/ThirdParty/KrPcSdk_Global/KRSDKRes/KRSDKWebView/debug.log' \
        \) -print0 2>/dev/null
    )
}

read_steam_library_config() {
    local config_path="$1"
    local line=""
    local library_path=""

    if [[ ! -r "$config_path" ]]; then
        return 0
    fi

    while IFS= read -r line; do
        library_path=""

        if [[ "$line" =~ \"path\"[[:space:]]*\"([^\"]+)\" ]]; then
            library_path="${BASH_REMATCH[1]}"
        elif [[ "$line" =~ \"[0-9]+\"[[:space:]]*\"([^\"]+)\" ]]; then
            library_path="${BASH_REMATCH[1]}"
        fi

        if [[ -n "$library_path" ]]; then
            # Steam's VDF format uses backslash escaping. Unix Steam paths
            # normally contain no escaped separators, but unescape them when
            # present so custom libraries remain usable.
            library_path="${library_path//\\\\/\\}"
            add_discovery_root "$library_path"
            add_discovery_root "$library_path/steamapps"
            add_discovery_root "$library_path/steamapps/common"
        fi
    done < "$config_path"
}

discover_steam_roots() {
    local xdg_data_home="${XDG_DATA_HOME:-$HOME/.local/share}"
    local steam_roots=()
    local root=""
    local config_path=""

    if [[ "$OSTYPE" == darwin* ]]; then
        steam_roots+=(
            "$HOME/Library/Application Support/Steam"
        )
    else
        steam_roots+=(
            "$HOME/.steam/debian-installation"
            "$HOME/.steam/steam"
            "$HOME/.steam/root"
            "$xdg_data_home/Steam"
            "$HOME/Steam"
            "$HOME/.var/app/com.valvesoftware.Steam/.local/share/Steam"
            "$HOME/.var/app/com.valvesoftware.Steam/.steam/steam"
            "$HOME/.var/app/com.valvesoftware.Steam/data/Steam"
            "$HOME/snap/steam/common/.local/share/Steam"
            "$HOME/.snap/data/steam/common/.local/share/Steam"
            "/usr/local/games/steam"
            "/usr/local/share/Steam"
        )
    fi

    for root in "${steam_roots[@]}"; do
        if [[ ! -d "$root" || ! -r "$root" ]]; then
            continue
        fi

        echo -e "${GREEN}Searching Steam root: $root${RESET}" >&2
        add_discovery_root "$root/steamapps"
        add_discovery_root "$root/steamapps/common"

        for config_path in \
            "$root/steamapps/libraryfolders.vdf" \
            "$root/config/libraryfolders.vdf"; do
            read_steam_library_config "$config_path"
        done
    done
}

discover_wine_and_bottle_roots() {
    local roots=(
        "$HOME/.wine"
        "$HOME/.local/share/wineprefixes"
        "$HOME/Games"
        "$HOME/.local/share/lutris"
        "$HOME/.var/app/net.lutris.Lutris/data/lutris"
        "$HOME/Library/Application Support/CrossOver/Bottles"
        "$HOME/Library/Application Support/CrossOver/OtherBottles"
        "$HOME/Library/Containers/com.isaacmarovitz.Whisky/Bottles"
        "$HOME/Library/Containers/Whisky/Bottles"
        "/SteamLibrary"
    )
    local root=""

    for root in "${roots[@]}"; do
        add_discovery_root "$root"
    done
}

discover_targeted_logs() {
    local root=""

    echo "Searching Steam, Wine, Lutris, and bottle locations..." >&2
    discover_steam_roots
    discover_wine_and_bottle_roots

    for root in "${discovery_roots[@]}"; do
        collect_logs_from_tree "$root"
    done
}

search_filesystem_fallback() {
    local search_root="/"
    local path=""

    echo "Searching accessible filesystems for Client.log..." >&2

    while IFS= read -r -d '' path; do
        add_log_candidate "$path"
    done < <(
        find "$search_root" \
            \( -path '/proc' -o -path '/sys' -o -path '/dev' -o -path '/run' -o -path '/tmp' -o -path '/var/tmp' \) -prune -o \
            \( -type f -o -type l \) \( \
                -path '*/Client/Saved/Logs/Client.log' -o \
                -path '*/Client/Binaries/Win64/ThirdParty/KrPcSdk_Global/KRSDKRes/KRSDKWebView/debug.log' \
            \) -print0 2>/dev/null
    )

    # /run is pruned above because it is mostly virtual state, but Linux
    # desktop environments commonly mount user game volumes below /run/media.
    if [[ -d "/run/media" && -r "/run/media" ]]; then
        while IFS= read -r -d '' path; do
            add_log_candidate "$path"
        done < <(
            find "/run/media" \( -type f -o -type l \) \( \
                -path '*/Client/Saved/Logs/Client.log' -o \
                -path '*/Client/Binaries/Win64/ThirdParty/KrPcSdk_Global/KRSDKRes/KRSDKWebView/debug.log' \
            \) -print0 2>/dev/null
        )
    fi
}

extract_candidate_url() {
    local index="$1"
    local log_path="${log_paths[$index]}"
    local log_type="${log_types[$index]}"
    local url=""

    if [[ "$log_type" == "client" ]]; then
        url=$(read_log_file "$log_path" | decrypt_client_log | extract_convene_url)
        if [[ -z "$url" ]]; then
            url=$(read_log_file "$log_path" | extract_convene_url)
        fi
    else
        url=$(read_log_file "$log_path" | extract_convene_url)
    fi

    candidate_url="$url"
    matched_log_path="$log_path"
    [[ -n "$url" ]]
}

publish_url() {
    local url="$1"
    local log_path="$2"

    url_found=true
    echo -e "${GREEN}URL found in $log_path${RESET}"
    echo -e "\n${MAGENTA}Convene Record URL: $url${RESET}"

    if command -v xclip >/dev/null 2>&1; then
        echo "$url" | xclip -selection clipboard
        echo -e "\n${GREEN}Link copied to clipboard!${RESET}"
    elif command -v xsel >/dev/null 2>&1; then
        echo "$url" | xsel --clipboard --input
        echo -e "\n${GREEN}Link copied to clipboard!${RESET}"
    elif command -v wl-copy >/dev/null 2>&1; then
        echo "$url" | wl-copy
        echo -e "\n${GREEN}Link copied to clipboard!${RESET}"
    elif command -v pbcopy >/dev/null 2>&1; then
        echo "$url" | pbcopy
        echo -e "\n${GREEN}Link copied to clipboard!${RESET}"
    else
        echo -e "\n${YELLOW}Clipboard tool not found. Please manually copy the URL above.${RESET}"
    fi
}

try_collected_logs() {
    local total="${#log_paths[@]}"
    local attempted=0
    local best_index=-1
    local sibling_index=-1
    local index=""
    local candidate_mtime=""
    local best_mtime=""
    local install_path=""
    local spinner_message=""

    if [[ "$total" -eq 0 ]]; then
        return 1
    fi

    candidate_used=()
    for index in "${log_paths[@]}"; do
        candidate_used+=(false)
    done

    spinner_message="Collected $total readable log file(s). Selecting newest for URL extraction..."
    start_spinner "$spinner_message"

    while [[ "$attempted" -lt "$total" ]]; do
        best_index=-1
        best_mtime=-1

        for ((index = 0; index < total; index++)); do
            if [[ "${candidate_used[$index]}" == true ]]; then
                continue
            fi

            candidate_mtime="${log_mtimes[$index]}"
            if [[ ! "$candidate_mtime" =~ ^[0-9]+$ ]]; then
                candidate_mtime=0
            fi

            if [[ "$best_index" -eq -1 || "$candidate_mtime" -gt "$best_mtime" || ( "$candidate_mtime" -eq "$best_mtime" && "${log_types[$index]}" == client && "${log_types[$best_index]}" != client ) ]]; then
                best_index="$index"
                best_mtime="$candidate_mtime"
            fi
        done

        if [[ "$best_index" -eq -1 ]]; then
            break
        fi

        # If the newest candidate is debug.log, try its sibling Client.log
        # first. This preserves Client.log preference without ignoring mtime
        # when several installations are present.
        if [[ "${log_types[$best_index]}" == debug ]]; then
            sibling_index=-1
            install_path="${log_install_paths[$best_index]}"
            for ((index = 0; index < total; index++)); do
                if [[ "${candidate_used[$index]}" == true || "${log_types[$index]}" != client || "${log_install_paths[$index]}" != "$install_path" ]]; then
                    continue
                fi
                if [[ "$sibling_index" -eq -1 || "${log_mtimes[$index]}" -gt "${log_mtimes[$sibling_index]}" ]]; then
                    sibling_index="$index"
                fi
            done

            if [[ "$sibling_index" -ge 0 ]]; then
                candidate_used[$sibling_index]=true
                attempted=$((attempted + 1))
                if extract_candidate_url "$sibling_index"; then
                    stop_spinner "$spinner_message"
                    publish_url "$candidate_url" "$matched_log_path"
                    return 0
                fi
            fi
        fi

        candidate_used[$best_index]=true
        attempted=$((attempted + 1))
        if extract_candidate_url "$best_index"; then
            stop_spinner "$spinner_message"
            publish_url "$candidate_url" "$matched_log_path"
            return 0
        fi
    done

    stop_spinner "$spinner_message"
    return 1
}

# Check a user-provided installation path and extract from any matching logs.
log_check() {
    local path="$1"
    local before_count="${#log_paths[@]}"
    local before_unreadable_count="${#unreadable_logs[@]}"

    folder_found=false
    log_found=false

    if [[ -f "$path" ]]; then
        add_log_candidate "$path"
        folder_found=true
    elif [[ -d "$path" ]]; then
        folder_found=true
        check_engine_ini "$path"
        collect_logs_from_tree "$path"
    else
        return 1
    fi

    if [[ "${#log_paths[@]}" -gt "$before_count" || "${#unreadable_logs[@]}" -gt "$before_unreadable_count" ]]; then
        log_found=true
    fi

    try_collected_logs
}

print_discovery_errors() {
    local path=""

    if [[ "${#unreadable_logs[@]}" -gt 0 ]]; then
        log_error "The following log file(s) were found but are not readable by the current user:"
        for path in "${unreadable_logs[@]}"; do
            log_error "  $path"
        done
    fi

    if [[ "${#log_paths[@]}" -gt 0 ]]; then
        log_error "Checked ${#log_paths[@]} readable log file(s), but none contained a Convene History URL. Please open your in-game Convene History first."
    elif [[ "${#unreadable_logs[@]}" -eq 0 ]]; then
        log_error "No readable Client.log or debug.log files were found."
    fi

    for path in "${err_msgs[@]}"; do
        echo -e "${MAGENTA}$path${RESET}" >&2
    done
}

main() {
    echo -e "${GRAY}Attempting to find URL automatically...${RESET}"

    discover_targeted_logs

    if ! try_collected_logs; then
        search_filesystem_fallback
        try_collected_logs || true
    fi

    if [[ "$url_found" == true ]]; then
        return 0
    fi

    print_discovery_errors

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
            case "$path" in
                [Ee][Xx][Ii][Tt])
                    break
                    ;;
            esac
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
}

if [[ "${BASH_SOURCE[0]}" == "$0" ]]; then
    main "$@"
fi
