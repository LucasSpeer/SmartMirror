#!/bin/bash
#this file updates the local files 

cd /home/pi/
sudo rm -R SmartMirror-1.0/SmartMirror/
sudo mkdir SmartMirror-1.0/SmartMirror/
sudo cp SmartMirror/* -r SmartMirror-1.0/SmartMirror/
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
sudo cp autostart /home/pi/.config/lxsession/LXDE-pi/
echo "Copying autostart into /home/pi/.config/lxsession/LXDE-pi/ to boot chrome on startup"
