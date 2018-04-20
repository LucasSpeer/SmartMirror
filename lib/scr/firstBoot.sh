#!/bin/bash
# Auth: Lucas Speer 2/21/18
# This file runs one time from rc.local then edits rc.local to no longer call itself
# /etc/bluetooth/rfcomm.conf is set dynamically using th hciconfig line and the rfcommset.py sc
# This file also creates a local directory and sets up the necesarry structures. Consider it a setup executable
cd /home/pi
echo "Creating local directory"
sudo mkdir SmartMirror-1.0/
sudo mkdir SmartMirror-1.0/SmartMirror/
sudo cp SmartMirror/* -r SmartMirror-1.0/SmartMirror/ 
sudo chmod 777 /var/run/sdp
echo "Making /var/run/sdp executable"
cd /home/pi/SmartMirror-1.0/SmartMirror/lib/scr/
sudo hciconfig hci0 | grep Address | sudo nano addr
echo "Creating addr.save which contains the local BT mac address pulled from hciconfig, for use with rfcommset.py"
sudo python ~/SmartMirror-1.0/SmartMirror/lib/scr/rfcommset.py
echo "Creating /etc/bluetooth/rfcomm.conf"
sudo cp rfcomm.conf /etc/bluetooth/
sudo cp bluezutils.py /var/www/html/
echo "Moving rfcomm.conf and bluezutils into /var/www/html/"
cd /home/pi/SmartMirror-1.0/SmartMirror/lib/
sudo cp main.conf /etc/bluetooth/
echo "Copying main.conf into /etc/bluetooth/"
sudo cp rc.local machine-info /etc/
echo "Copying machine-info and the rc.local file that doesn't call this script into /etc/"
sudo cp panel /home/pi/.config/lxpanel/LXDE-pi/panels/
echo "Copying the panel file into /home/pi/.config/lxpanel/LXDE-pi/panels/ to remove the confirm BT pair prompt"
sudo cp dbus-org.bluez.service /etc/systemd/system/
echo "Copying dbus-org.bluez.service into /etc/systemd/system/ to run BT in comptability mode"
sudo cp autostart /home/pi/.config/lxpanel/LXDE-pi/
echo "Copying autostart into /home/pi/.config/lxpanel/LXDE-pi/ to boot chrome on startup"
