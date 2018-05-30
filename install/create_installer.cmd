REM - Create the release with gulp
gulp pack-windows64
REM - Create the cab
create_cab.cmd ../release/Dynamine-win32-x64 dynamine
REM - call the other 7zip creation items inside the stackoverlow to finalize the installer from the files in package