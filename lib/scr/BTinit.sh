#!/bin/bash
# Auth: Lucas Speer 2/21/18
# This file runs one time from rc.local then edits rc.local to no longer call itself
# /etc/bluetooth/rfcomm.conf is set dynamically using th hciconfig line and the rfcommset.py script
sudo hciconfig hci0 | grep Address | sudo nano addr
echo "Creating addr.save which contains the local BT mac address pulled from hciconfig, for use with rfcommset.py"
sudo python rfcommset.py
echo "Creating /etc/bluetooth/rfcomm.conf"
sudo cp rfcomm.conf /etc/bluetooth/
sudo cp bluezutils.py /var/www/html/
echo "Moving rfcomm.conf and bluezutils into /var/www/html/"
cd ../
sudo cp rc.local machine-info /etc/