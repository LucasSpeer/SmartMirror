# file: rfcomm-server.py
# Auth: Lucas Speer f
# Based on code by: Albert Huang <albert@csail.mit.edu>
# desc: simple demonstration of a server application that uses RFCOMM sockets
# for use with github.com/lucasspeer/SeniorDesignSmartMirror
# $Id: rfcomm-server.py 518 2007-08-10 07:20:07Z albert $

from bluetooth import *
import os, subprocess
import time

# Set up the bluetooth socket as a server
server_sock=BluetoothSocket( RFCOMM )
server_sock.bind(("",PORT_ANY))
server_sock.listen(1)

port = server_sock.getsockname()[1]
# Must be the same as the Android app
uuid = "94f39d29-7d6d-437d-973b-fba39e49d4ee"

advertise_service( server_sock, "SmartMirror",
                   service_id = uuid,
                   service_classes = [ uuid, SERIAL_PORT_CLASS ],
                   profiles = [ SERIAL_PORT_PROFILE ], 
#                   protocols = [ OBEX_UUID ] 
                    )
                    
	
def dataHandler(data):
	setFile = open('config.json', 'w')
	setFile.write(data)			#Overrite any data with as neccesarry and save
	print(data)
	data = ""
	setFile.close()

def wifiHandler(data):
	wifiArr = data.split("\n"); #split the data on the return key to get ssid and key seperate
	ssid = wifiArr[0] 
	key = wifiArr[1]
	print( wifiArr )
	wifiConf = open('/etc/wpa_supplicant/wpa_supplicant.conf', 'w') #/etc/wpa_supplicant/wpa_supplicant.conf
	strToWrite = "ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev\nupdate_config=1\ncountry=US\n\nnetwork={\n	ssid=\"" + ssid + "\"\n	psk=\"" + key + "\"\n	key_mgmt=WPA-PSK\n}"
	wifiConf.write(strToWrite)
	wifiConf.close()
	command = "sudo reboot"		#Kill the existing chromium process(that failed due to no internet)...
	os.system(command)
	
	#this following block is supposed to close chrome, reconnect to the network, and reopen chrome. It only works when this program is run from a command line, not from PIinit.sh
	#command = "pkill -o chromium-browser"		#Kill the existing chromium process(that failed due to no internet)...
	#os.system(command)
	#command = "sudo systemctl daemon-reload"	#restart the network...
	#os.system(command)
	#command = "sudo systemctl restart dhcpcd"	#with these two commands.
	#os.system(command)
	#command = "DISPLAY=:0.0 chromium-browser --incognito --no-sandbox --disable-notifications --disable-infobars --start-fullscreen localhost/"		#and open a new one.
	#time.sleep(2) #wait for the network to connect before reopening chrome
	#browser = subprocess.call(command, shell=True)

while True:                   
	print("Waiting for connection on RFCOMM channel %d" % port)

	client_sock, client_info = server_sock.accept()		#Accept incoming connections
	print("Accepted connection from ", client_info)
	wifiFile = open('wifilist.save', 'r')
	wifi = wifiFile.read()
	try:
		client_sock.send(wifi)
	except IOError:
		pass
	wifiFile.close()
	try:
		while True:
			data = client_sock.recv(1024)
			if len(data) == 0: break
			if data.startswith("{"):
				dataHandler(data)
			else:
				wifiHandler(data)
	except IOError:
		pass

