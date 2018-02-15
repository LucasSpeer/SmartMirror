#!/bin/sh
cd /home/pi/SmartMirror/
sudo git pull
cd /home/pi/SmartMirror www/
./saveToServer.sh
cd /home/pi/SmartMirror/lib/scr/
sudo hciconfig hci0 up
sudo hciconfig hci0 piscan &
sudo cp rfcomm-server.py /var/www/html/
sudo cp simple-agent /var/www/html/
cd /var/www/html/
sudo python rfcomm-server.py &
sudo python simple-agent &
