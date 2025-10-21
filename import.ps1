<#
    [License]
    This script is licensed under the GNU General Public License v3.0 (GPL-3.0).

    Copyright (C) 2025 Luzefiru

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
    You can view the full text of the GNU General Public License at <https://www.gnu.org/licenses/>.

    [Credits]
    - Primarily used by WuWa Tracker at https://wuwatracker.com/import (visit the page for usage instructions)
    - Originally created by @theREalpha
    - Script inspired by astrite.gg
    - Thanks to @antisocial93 for screening multiple registry entry logic
    - Thanks to @timas130 for adding CN server support
    - Thanks to @mei.yue on Discord for helping us debug OneDrive issues
    - Thanks to @phenom for sharing the v2 launcher new Client.log directory path
    - Thanks to @thekiwibirdddd for optimizing the search logic and updating ACEs to bypass read-only logfiles

    [Redistribution Provision]
    When redistributing this script, you must include this license notice and credits in all copies or substantial portions of the script.
    The script must not be used in a way that violates the terms of the GNU General Public License v3.0.
#>
Add-Type -AssemblyName System.Web
$gamePath = $null
$urlFound = $false
$logFound = $false
$folderFound = $false
$err = ""
$checkedDirectories = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)
$originalErrorPreference = $ErrorActionPreference
$IsAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if ($IsAdmin) {
    Write-Host "Running as Administrator" -ForegroundColor DarkMagenta
} else {
    Write-Host "Running as Normal User" -ForegroundColor DarkMagenta
}

# We silence errors for path searching to not confuse users
$ErrorActionPreference = "SilentlyContinue"

Write-Output "Attempting to find URL automatically..."

function LogCheck {
    if (!(Test-Path $args[0])) {
        $folderFound = $false
        $logFound = $false
        $urlFound = $false
        return $folderFound, $logFound, $urlFound
    }
    else {
        $folderFound = $true
    }

    $gachaLogPath = $args[0] + '\Client\Saved\Logs\Client.log'
    $debugLogPath = $args[0] + '\Client\Binaries\Win64\ThirdParty\KrPcSdk_Global\KRSDKRes\KRSDKWebView\debug.log'
    $engineIniPath = $args[0] + '\Client\Saved\Config\WindowsNoEditor\Engine.ini'

    $logDisabled = $false
    if (Test-Path $engineIniPath) {
        $engineIniContent = Get-Content $engineIniPath -Raw
        if ($engineIniContent -match '\[Core\.Log\][\r\n]+Global=(off|none)') {
            $logDisabled = $true

            Write-Host "`nERROR: Your Engine.ini file contains a setting that prevents you from importing your data. Would you like us to attempt to automatically fix it?" -ForegroundColor Red
            Write-Host "`nWe can automatically edit your $engineIniPath file to re-enable logging. You will need to re-import and run this script afterwards.`n"
            Write-Warning "We are not responsible for any consequences from this script. Please proceed at your own risk!`n`n"

            $confirmation = Read-Host "Do you want to proceed? (Y/N)"
            if ($confirmation -ne 'Y' -and $confirmation -ne 'y') {
                Write-Host "`nERROR: Unable to import data due to bad Engine.ini file. Press any key to continue..." -ForegroundColor Red
                $null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
                exit
            }

            if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
                Write-Host "`n"
                Write-Warning "You need administrator rights to modify the game's Program Files. Attempting to restart PowerShell as admin..."
                $retry = Read-Host "Would you like to retry as Administrator? (Y/N)"
                if ($retry -eq "Y" -or $retry -eq "y") {
                    Write-Host "Restarting script with elevated permissions and fetching latest import script..." -ForegroundColor Cyan
                    $elevatedCommand = '-NoProfile -Command "iwr -UseBasicParsing -Headers @{''User-Agent''=''"Mozilla/5.0""''} https://github.com/wuwatracker/wuwatracker/blob/main/import.ps1 | iex"'
                    Start-Process powershell.exe -ArgumentList $elevatedCommand -Verb RunAs
                    exit
                }
            }

            $backupPath = $engineIniPath + ".backup"
            Copy-Item -Path $engineIniPath -Destination $backupPath -Force
            Write-Host "Created backup at $backupPath" -ForegroundColor Green

            $newContent = $engineIniContent -replace '\[Core\.Log\][^\[]*', ''
            Set-Content -Path $engineIniPath -Value $newContent
            Write-Host "`nSuccessfully modified Engine.ini to enable logging." -ForegroundColor Green
            Write-Host "`nPlease restart your game and open the Convene History page before running this script again." -ForegroundColor Yellow
            $null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
            exit
        }
    }
    # $gachaLogPath must be the full path to Client.log
    if (Test-Path $gachaLogPath) {
        try {
            # Backup ACL (XML)
            $acl = Get-Acl -Path $gachaLogPath
            $denyRules = $acl.Access | Where-Object { $_.AccessControlType -eq 'Deny' -and $_.FileSystemRights -match 'Read' }

            if ($denyRules) {
                Write-Warning "Found $($denyRules.Count) Deny ACE(s) blocking read access."

                $confirm = Read-Host "Remove these deny ACEs and repair permissions? (Y/N)"
                if ($confirm -notmatch '^[Yy]$') {
                    Write-Host "User declined. Skipping ACL changes." -ForegroundColor Yellow
                }
                else {
                    foreach ($rule in $denyRules) {
                        # Identity might be an NTAccount or a SID; get a friendly name if possible
                        $id = $rule.IdentityReference.Value
                        try {
                            if ($id -match '^S-\d-\d+-(\d+-){1,}\d+$') {
                                # It's a SID — try to translate
                                $sid = New-Object System.Security.Principal.SecurityIdentifier($id)
                                $idFriendly = $sid.Translate([System.Security.Principal.NTAccount]).Value
                            } else {
                                $idFriendly = $id
                            }
                        } catch {
                            # fallback to raw value if translation fails
                            $idFriendly = $id
                        }

                        Write-Host "Removing Deny ACE for: $idFriendly" -ForegroundColor Cyan

                        # Use icacls to remove deny ACEs for this principal
                        # Note: quote the principal in case it contains spaces
                        $icaclsCmd = "icacls `"$gachaLogPath`" /remove:d `"$idFriendly`" /C"
                        cmd.exe /c $icaclsCmd | Out-Null
                    }

                    # Re-apply owner and grant admins full control for good measure
                    takeown /F "$gachaLogPath" | Out-Null
                    icacls "$gachaLogPath" /grant Administrators:F /C | Out-Null

                    Write-Host "Deny ACEs removed (where possible) and permissions repaired." -ForegroundColor Green
                }
            } else {
                Write-Host "No Deny ACEs blocking read found." -ForegroundColor Green
            }
        } catch {
            Write-Warning "Failed to inspect/modify ACLs for ${gachaLogPath}: $_"
        }
    }

    if (Test-Path $gachaLogPath) {
        $logFound = $true
        $gachaUrlEntry = Select-String -Path $gachaLogPath -Pattern "https://aki-gm-resources(-oversea)?\.aki-game\.(net|com)/aki/gacha/index\.html#/record*" | Select-Object -Last 1
        if ([string]::IsNullOrWhiteSpace($gachaUrlEntry)) {
            $gachaUrlEntry = $null
        }
    }
    else {
        $gachaUrlEntry = $null
    }

    if (Test-Path $debugLogPath) {
        $logFound = $true
        $debugUrlEntry = Select-String -Path $debugLogPath -Pattern '"#url": "(https://aki-gm-resources(-oversea)?\.aki-game\.(net|com)/aki/gacha/index\.html#/record[^"]*)"' | Select-Object -Last 1
        if ([string]::IsNullOrWhiteSpace($debugUrlEntry)) {
            $debugUrl = $null
        }
        else {
            $debugUrl = $debugUrlEntry.Matches.Groups[1].Value
        }
    }
    else {
        $debugUrl = $null
    }

    if ($gachaUrlEntry -or $debugUrl) {
        if ($gachaUrlEntry) {
            $urlToCopy = $gachaUrlEntry -replace '.*?(https://aki-gm-resources(-oversea)?\.aki-game\.(net|com)[^"]*).*', '$1'
            Write-Host "URL found in $($gachaLogPath)"
        }
        if ([string]::IsNullOrWhiteSpace($urlToCopy)) {
            $urlToCopy = $debugUrl
            Write-Host "URL found in $($debugLogPath)"
        }

        if (![string]::IsNullOrWhiteSpace($urlToCopy)) {
            $urlFound = $true
            Write-Host "`nConvene Record URL: $urlToCopy"
            Set-Clipboard $urlToCopy
            Write-Host "`nLink copied to clipboard, paste it in wuwatracker.com and click the Import History button." -ForegroundColor Green
        }
    }
    return $folderFound, $logFound, $urlFound
}


function SearchAllDiskLetters {
    Write-Host "Searching all disk letters (A-Z) for Wuthering Waves Game folder..." -ForegroundColor Yellow

    $availableDrives = Get-PSDrive -PSProvider FileSystem | Select-Object -ExpandProperty Name
    Write-Host "Available drives: $($availableDrives -join ', ')" -ForegroundColor Yellow

    foreach ($driveLetter in [char[]](65..90)) {
        $drive = "$($driveLetter):"

        if ($driveLetter -notin $availableDrives) {
            continue
        }

        Write-Host "Searching drive $drive..."

        $gamePaths = @(
            "$drive\SteamLibrary\steamapps\common\Wuthering Waves",
            "$drive\SteamLibrary\steamapps\common\Wuthering Waves\Wuthering Waves Game",
            "$drive\Program Files (x86)\Steam\steamapps\common\Wuthering Waves\Wuthering Waves Game",
            "$drive\Program Files (x86)\Steam\steamapps\common\Wuthering Waves",
            "$drive\Program Files\Steam\steamapps\common\Wuthering Waves\Wuthering Waves Game",
            "$drive\Program Files\Steam\steamapps\common\Wuthering Waves",
            "$drive\Games\Steam\steamapps\common\Wuthering Waves\Wuthering Waves Game",
            "$drive\Games\Steam\steamapps\common\Wuthering Waves",
            "$drive\Steam\steamapps\common\Wuthering Waves\Wuthering Waves Game",
            "$drive\Steam\steamapps\common\Wuthering Waves",
            "$drive\SteamLibrary\steamapps\common\Wuthering Waves\Wuthering Waves Game",
            "$drive\SteamLibrary\steamapps\common\Wuthering Waves",
            "$drive\Program Files\Epic Games\WutheringWavesj3oFh",
            "$drive\Program Files\Epic Games\WutheringWavesj3oFh\Wuthering Waves Game",
            "$drive\Program Files (x86)\Epic Games\WutheringWavesj3oFh",
            "$drive\Program Files (x86)\Epic Games\WutheringWavesj3oFh\Wuthering Waves Game",
            "$drive\Wuthering Waves Game",
            "$drive\Wuthering Waves\Wuthering Waves Game",
            "$drive\Program Files\Wuthering Waves\Wuthering Waves Game",
            "$drive\Games\Wuthering Waves Game",
            "$drive\Games\Wuthering Waves\Wuthering Waves Game",
            "$drive\Program Files (x86)\Wuthering Waves\Wuthering Waves Game"
        )


        foreach ($path in $gamePaths) {
            if (!(Test-Path $path)) {
                continue
            }

            Write-Host "Found potential game folder: $path" -ForegroundColor Green

            if ($path -like "*OneDrive*") {
                $err += "Skipping path as it contains 'OneDrive': $($path)`n"
                continue
            }

            if ($checkedDirectories.Contains($path)) {
                $err += "Already checked: $($path)`n"
                continue
            }

            $checkedDirectories.Add($path) | Out-Null
            $folderFound, $logFound, $urlFound = LogCheck $path

            if ($urlFound) {
                return $true
            }
            elseif ($logFound) {
                $err += "Path checked: $($path).`n"
                $err += "Cannot find the convene history URL in both Client.log and debug.log! Please open your Convene History first!`n"
                $err += "Contact Us if you think this is correct directory and still facing issues.`n"
            }
            elseif ($folderFound) {
                $err += "No logs found at $path`n"
            }
            else {
                $err += "No Installation found at $path`n"
            }
        }
    }

    return $false
}

# MUI Cache
if (!$urlFound) {
    $muiCachePath = "Registry::HKEY_CURRENT_USER\Software\Classes\Local Settings\Software\Microsoft\Windows\Shell\MuiCache"
    try {
        $filteredEntries = (Get-ItemProperty -Path $muiCachePath -ErrorAction SilentlyContinue).PSObject.Properties | Where-Object { $_.Value -like "*wuthering*" } | Where-Object { $_.Name -like "*client-win64-shipping.exe*" }
        if ($filteredEntries.Count -ne 0) {
            $err += "MUI Cache($($filteredEntries.Count)):`n"
            foreach ($entry in $filteredEntries) {
                $gamePath = ($entry.Name -split '\\client\\')[0]
                if ($gamePath -like "*OneDrive*") {
                  $err += "Skipping path as it contains 'OneDrive': $($gamePath)`n"
                  continue
                }

                if ($checkedDirectories.Contains($gamePath)) {
                    $err += "Already checked: $($gamePath)`n"
                    continue
                }
                $checkedDirectories.Add($gamePath) | Out-Null
                $folderFound, $logFound, $urlFound = LogCheck $gamePath
                if ($urlFound) { break }
                elseif ($logFound) {
                    $err += "Path checked: $($gamePath).`n"
                    $err += "Cannot find the convene history URL in both Client.log and debug.log! Please open your Convene History first!`n"
                    $err += "Contact Us if you think this is correct directory and still facing issues.`n"
                }
                elseif ($folderFound) {
                    $err += "No logs found at $gamePath`n"
                }
                else {
                    $err += "No Installation found at $gamePath`n"
                }
            }
        }
        else {
            $err += "No entries found in MUI Cache.`n"
        }
    }
    catch {
        $err += "Error accessing MUI Cache: $_`n"
    }
}

# Firewall
if (!$urlFound) {
    $firewallPath = "Registry::HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\SharedAccess\Parameters\FirewallPolicy\FirewallRules"
    try {
        $filteredEntries = (Get-ItemProperty -Path $firewallPath -ErrorAction SilentlyContinue).PSObject.Properties | Where-Object { $_.Value -like "*wuthering*" } | Where-Object { $_.Name -like "*client-win64-shipping*" }
        if ($filteredEntries.Count -ne 0) {
            $err += "Firewall($($filteredEntries.Count)):`n"
            foreach ($entry in $filteredEntries) {
                $gamePath = (($entry.Value -split 'App=')[1] -split '\\client\\')[0]
                if ($gamePath -like "*OneDrive*") {
                  $err += "Skipping path as it contains 'OneDrive': $($gamePath)`n"
                  continue
                }

                if ($checkedDirectories.Contains($gamePath)) {
                    $err += "Already checked: $($gamePath)`n"
                    continue
                }

                $checkedDirectories.Add($gamePath) | Out-Null
                $folderFound, $logFound, $urlFound = LogCheck $gamePath
                if ($urlFound) { break }
                elseif ($logFound) {
                    $err += "Path checked: $($gamePath).`n"
                    $err += "Cannot find the convene history URL in both Client.log and debug.log! Please open your Convene History first!`n"
                    $err += "Contact Us if you think this is correct directory and still facing issues.`n"
                }
                elseif ($folderFound) {
                    $err += "No logs found at $gamePath`n"
                }
                else {
                    $err += "No Installation found at $gamePath`n"
                }
            }
        }
        else {
            $err += "No entries found in firewall.`n"
        }
    }
    catch {
        $err += "Error accessing firewall rules: $_`n"
    }
}

# Native
if (!$urlFound) {
    $64 = "Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*"
    $32 = "Registry::HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*"
    try {
        $gamePath = (Get-ItemProperty -Path $32, $64 | Where-Object { $_.DisplayName -like "*wuthering*" } | Select-Object -ExpandProperty InstallPath)
        if ($gamePath) {
            if ($gamePath -like "*OneDrive*") {
              $err += "Skipping path as it contains 'OneDrive': $($gamePath)`n"
            }
            elseif ($checkedDirectories.Contains($gamePath)) {
                $err += "Already checked: $($gamePath)`n"
            }
            else {
                $checkedDirectories.Add($gamePath) | Out-Null
                $folderFound, $logFound, $urlFound = LogCheck $gamePath
                if (!$urlFound) {
                    if ($logFound) {
                        $err += "Path checked: $($gamePath).`n"
                        $err += "Cannot find the convene history URL in both Client.log and debug.log! Please open your Convene History first!`n"
                        $err += "Contact Us if you think this is correct directory and still facing issues.`n"
                    }
                    elseif ($folderFound) {
                        $err += "No logs found at $gamePath`n"
                    }
                    else {
                        $err += "No Installation found at $gamePath`n"
                    }
                }
            }
        }
        else {
            $err += "No Entry found for Native Client.`n"
        }
    }
    catch {
        Write-Output "[ERROR] Cannot access registry: $_"
        $gamePath = $null
    }
}

if (!$urlFound) {
    $urlFound = SearchAllDiskLetters

    if (!$urlFound -and -not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
        Write-Host "`nAutomatic detection failed." -ForegroundColor Yellow
        Write-Host "Some directories may require administrator access to read." -ForegroundColor Yellow
        $retry = Read-Host "Would you like to retry as Administrator (Y - Retry as Administrator /N - Input a game path manually)"
        if ($retry -eq "Y" -or $retry -eq "y") {

            Write-Host "Restarting script with elevated permissions and fetching latest import script..." -ForegroundColor Cyan
            $elevatedCommand = '-NoProfile -Command "iwr -UseBasicParsing -Headers @{''User-Agent''=''"Mozilla/5.0""''} https://github.com/wuwatracker/wuwatracker/blob/main/import.ps1 | iex"'
            Start-Process powershell.exe -ArgumentList $elevatedCommand -Verb RunAs
            exit
        }
    }


}


$ErrorActionPreference = $originalErrorPreference

if (!$urlFound) {
    Write-Host $err -ForegroundColor Magenta
}

# Manual
while (!$urlFound) {
    Write-Host "Game install location not found or log files missing. Did you open your in-game Convene History first?" -ForegroundColor Red

Write-Host @"
    +--------------------------------------------------+
    |         ARE YOU USING A THIRD-PARTY APP?         |
    +--------------------------------------------------+
    | It looks like a third-party script or tool may   |
    | have been used previously. These can interfere   |
    | with the game's logs or import process.          |
    |                                                  |
    | Please disable any such tools or consider        |
    | reinstalling the game before importing again.    |
    +--------------------------------------------------+
"@ -ForegroundColor Yellow


    Write-Host "If you think that any of the above installation directory is correct and you've tried disabling third-party apps & reinstalling, please join our Discord server for help: https://wuwatracker.com/discord."

    Write-Host "`nOtherwise, please enter the game install location path."
    Write-Host 'Common install locations:'
    Write-Host '  C:\Wuthering Waves' -ForegroundColor Yellow
    Write-Host '  C:\Wuthering Waves\Wuthering Waves Game' -ForegroundColor Yellow
    Write-Host '  C:\Program Files\Wuthering Waves\Wuthering Waves Game' -ForegroundColor Yellow
    Write-Host 'For Epic Games:'
    Write-Host '  C:\Program Files\Epic Games\WutheringWavesj3oFh' -ForegroundColor Yellow
    Write-Host '  C:\Program Files\Epic Games\WutheringWavesj3oFh\Wuthering Waves Game' -ForegroundColor Yellow
    Write-Host 'For Steam:' -ForegroundColor Gray
    Write-Host '  C:\Steam\steamapps\common\Wuthering Waves' -ForegroundColor Yellow
    $path = Read-Host "Input your installation location (otherwise, type `"exit`" to quit)"
    if ($path) {
        if ($path.ToLower() -eq "exit") {
            break
        }
        $gamePath = $path
        Write-Host "`n`n`nUser provided path: $($path)" -ForegroundColor Magenta
        $folderFound, $logFound, $urlFound = LogCheck $path
        if ($urlFound) { break }
        elseif ($logFound) {
            $err += "Path checked: $($gamePath).`n"
            $err += "Cannot find the convene history URL in both Client.log and debug.log! Please open your Convene History first!`n"
            $err += "If this is the correct directory and you're still facing issues, raise a ticket in wuwatracker.com/discord`n"
        }
        elseif ($folderFound) {
            Write-Host "No logs found at $gamePath`n"
        }
        else {
            Write-Host "Folder not found in user-provided path: $path"
            Write-Host "Could not find log files. Did you set your game location properly or open your Convene History first?" -ForegroundColor Red
        }
    }
    else {
        Write-Host "Invalid game location. Did you set your game location properly?" -ForegroundColor Red
    }
}
