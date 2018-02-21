#!/bin/bash
#Auth: Lucas Speer 2/21/18
#This file runs one time from rc.local then edits rc.local to no longer call itself
# /etc/bluetooth/rfcomm.conf is set dynamically using th hciconfig line and the rfcommset.py script
sudo chmod 777 /var/run/sdp
cd /home/pi/SmartMirror/lib/scr/
sudo hciconfig hci0 | grep Address | sudo nano addr
sudo python ~/SmartMirror/lib/rfcommset.py
sudo cp rfcomm.conf /etc/bluetooth/
cd /home/pi/SmartMirror/lib/
sudo cp main.conf /etc/bluetooth/
sudo cp rc.local machine-info /etc/
sudo cp panel /home/pi/.config/lxpanel/LXDE-pi/panels/
sudo cp dbus-org.bluez.service /etc/systemd/system/
