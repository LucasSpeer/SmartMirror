#This file creates the file /etc/bluetooth/rfcomm.conf with the MAC adress of the machine its run on
#Auth: Lucas Speer
#created 2/7/18

from bluetooth import *

firstHalf = "rfcomm1 {\n# Automatically bind the device at startup\nbind yes;\n\n# Bluetooth address of the device\ndevice "
secondHalf = "\n# RFCOMM channel for the connectionchannel 1;\n# Description of the connection\ncomment \"SmartMirror\";\n}"
bdaddr = bluetooth.read_local_bdaddr()
toSet = firstHalf + bdaddr + secondHalf
rfcommConfFile = open('/etc/bluetooth/rfcomm.conf', 'w')
rfcommConfFile.write(toSet)
rfcommConfFile.close()
