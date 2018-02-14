#!/bin/sh

cd /home/pi/SmartMirror/lib/scr/
sudo hciconfig hci0 up
sudo hciconfig hci0 piscan &
sudo python rfcomm-server.py &
sudo python simple-agent &
chromium-browser localhost --kiosk &
