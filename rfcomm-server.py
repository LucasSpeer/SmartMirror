# file: rfcomm-server.py
# Auth: Lucas Speer f
# Based on code by: Albert Huang <albert@csail.mit.edu>
# desc: simple demonstration of a server application that uses RFCOMM sockets
# for use with github.com/lucasspeer/SeniorDesignSmartMirror
# $Id: rfcomm-server.py 518 2007-08-10 07:20:07Z albert $

from bluetooth import *
# Set up the bluetooth socket as a server
server_sock=BluetoothSocket( RFCOMM )
server_sock.bind(("",PORT_ANY))
server_sock.listen(12)

port = server_sock.getsockname()[1]
# Must be the same as the Android app
uuid = "94f39d29-7d6d-437d-973b-fba39e49d4ee"

advertise_service( server_sock, "SmartMirror",
                   service_id = uuid,
                   service_classes = [ uuid, SERIAL_PORT_CLASS ],
                   profiles = [ SERIAL_PORT_PROFILE ], 
#                   protocols = [ OBEX_UUID ] 
                    )
                    
setFile = open('settings.json', 'r+')
tmpfile = setFile
setString = setFile.read()
layoutStr = ""
settStr = ""

#A function to read the strings from the setting file, used in the main loop to make sure both have their correct value
def getStrings():
	tmpStr = ""
	layoutStr = ""
	settStr = ""
	while "}" not in tmpStr:
		tmpStr = setFile.readline()
		layoutStr += tmpStr
		
	while "}" not in tmpStr:
		tmpStr = setFile.readline()
		settStr += tmpStr
		
def dataHandler(data):
	tmpfile = setFile
	if data.startswith("{\nl1"):
		 layoutStr = data
	
	else:
		settStr = data
		
	dataStr = layoutStr + settStr
	setFile.write(dataStr)
	
while True:                   
	print("Waiting for connection on RFCOMM channel %d" % port)

	client_sock, client_info = server_sock.accept()		#Accept incoming connections
	print("Accepted connection from ", client_info)

	try:
		while True:
			data = client_sock.recv(1024)
			if len(data) == 0: break
			getStrings()				#call this before dataHandler to read previously saved data
			dataHandler(data)			#Overrite any data with as neccesarry and save
	except IOError:
		pass

