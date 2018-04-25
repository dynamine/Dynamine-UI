#!/bin/bash
[ "$UID" -eq 0 ] || exec sudo bash "$0" "$@"
echo "Installing into /opt/dynamine-x64"
cp -r dynamine-x64 /opt/dynamine-x64

echo "Creating desktop shortcuts"
mv /opt/dynamine-x64/resources/dynamine.desktop /usr/local/share/applications/

echo "Done."

exit

