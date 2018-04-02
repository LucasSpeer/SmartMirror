#!/bin/sh
cd /home/pi/SmartMirror/
sudo git pull
echo "checking for/applying updates to SmartMirror"
cd /home/pi/SmartMirror/www/
./saveToServer.sh
cd /home/pi/SmartMirror/lib/scr/
iwlist wlan0 scan | grep ESSID | sudo nano wifilist
sudo hciconfig hci0 up
echo "starting bluetooth device hci0"
sudo hciconfig hci0 piscan &
echo "making SmartMirror Discoverable and starting rfcomm server and bluetooth agent"
sudo cp rfcomm-server.py /var/www/html/
sudo cp simple-agent /var/www/html/
cd /var/www/html/
sudo python rfcomm-server.py &
sudo python simple-agent &
