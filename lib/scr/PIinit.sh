#!/bin/sh
cd /home/pi/SmartMirror/www/
./saveToServer.sh
cd /home/pi/SmartMirror/lib/scr/
sudo hciconfig hci0 up
echo "starting bluetooth device hci0"
sudo hciconfig hci0 piscan &
echo "making SmartMirror Discoverable and starting rfcomm server and bluetooth agent"
sudo cp rfcomm-server.py /var/www/html/
sudo cp simple-agent /var/www/html/
cd /var/www/html/
sudo ifconfig wlan0 up
iwlist wlan0 scan | grep ESSID | sudo nano wifilist
sudo python wifitest.py &
sudo python rfcomm-server.py &
sudo python simple-agent &
