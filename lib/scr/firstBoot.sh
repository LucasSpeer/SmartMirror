#!/bin/bash
#Auth: Lucas Speer 2/21/18
#This file runs one time from rc.local then edits rc.local to no longer call itself
# /etc/bluetooth/rfcomm.conf is set dynamically using th hciconfig line and the rfcommset.py script
sudo chmod 777 /var/run/sdp
echo "making /var/run/sdp executable"
cd /home/pi/SmartMirror/lib/scr/
sudo hciconfig hci0 | grep Address | sudo nano addr
echo "creating addr.save which contains the local BT mac address pulled from hciconfig, for use with rfcommset.py"
sudo python ~/SmartMirror/lib/rfcommset.py
echo "creating /etc/bluetooth/rfcomm.conf"
sudo cp rfcomm.conf /etc/bluetooth/
sudo cp bluezutils.py /var/www/html/
echo "moving rfcomm.conf and bluezutils into /var/www/html/"
cd /home/pi/SmartMirror/lib/
sudo cp main.conf /etc/bluetooth/
echo "copying main.conf into /etc/bluetooth/"
sudo cp rc.local machine-info /etc/
echo "copying machine-info and the rc.local file that doesn't call this script into /etc/"
sudo cp panel /home/pi/.config/lxpanel/LXDE-pi/panels/
echo "copying the panel file into /home/pi/.config/lxpanel/LXDE-pi/panels/ to remove the confirm BT pair prompt"
sudo cp dbus-org.bluez.service /etc/systemd/system/
echo "copying dbus-org.bluez.service into /etc/systemd/system/ to run BT in comptability mode"
sudo cp autostart /home/pi/.config/lxpanel/LXDE-pi/
echo "copy autostart into /home/pi/.config/lxpanel/LXDE-pi/ to boot chrome on startup"
