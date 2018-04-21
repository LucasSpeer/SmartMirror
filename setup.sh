#!/bin/bash
# Auth: Lucas Speer 4/21/18
# This file sets up a SmartMirror from a clean Raspbian installation
cd /home/pi/
echo "Creating local directory"
sudo mkdir SmartMirror-1.0/
sudo mkdir SmartMirror-1.0/SmartMirror/
sudo cp SmartMirror/* -r SmartMirror-1.0/SmartMirror/
sudo chmod 777 /var/run/sdp
cd /home/pi/SmartMirror-1.0/SmartMirror/lib/
sudo cp main.conf /etc/bluetooth/
echo "Copying main.conf into /etc/bluetooth/"
echo "Making /var/run/sdp executable"
sudo cp rc.local machine-info /etc/
echo "Copying machine-info and the rc.local file that doesn't call this script into /etc/"
sudo cp panel /home/pi/.config/lxpanel/LXDE-pi/panels/
echo "Copying the panel file into /home/pi/.config/lxpanel/LXDE-pi/panels/ to remove the confirm BT pair prompt"
sudo cp dbus-org.bluez.service /etc/systemd/system/
echo "Copying dbus-org.bluez.service into /etc/systemd/system/ to run BT in comptability mode"
sudo cp autostart /home/pi/.config/lxpanel/LXDE-pi/
echo "Copying autostart into /home/pi/.config/lxpanel/LXDE-pi/ to boot chrome on startup"
cd /home/pi/SmartMirror-1.0/SmartMirror/lib/scr/
sudo ./BTinit.sh
echo "Setting up bluetooth config files (/etc/bluetooth/ main.conf & rfcomm.conf)"