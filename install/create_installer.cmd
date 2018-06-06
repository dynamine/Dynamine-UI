REM - Create the release with gulp
call gulp pack-windows64
REM - Create the cab
call create_cab.cmd ../release/Dynamine-win32-x64 dynamine
REM - call the other 7zip creation items to finalize the installer from the files in package
call copy /b 7zS.sfx + config.txt + dynamine.7z DynamineInstaller.exe
call DynamineInstaller.exe

; Create release with daemon files and miners in the folder "Dynamine-win32-x64"
; Create cab from that folder
; Create 7z archive with cab and install.cmd and mkshortcut.VBS
; Run: copy /b 7zS.sfx + config.txt + dynamine.7z DynamineInstaller.exe
