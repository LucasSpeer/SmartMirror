#This file creates the file /etc/bluetooth/rfcomm.conf with the MAC adress of the machine its run on
#Auth: Lucas Speer
#created 2/7/18


addrFile = open('addr.save', 'r')
roughStr = addrFile.read()

def MACfromSTR(str):
	addr = ""
	for i in range(13,30):
		addr += str[i]
	return addr

if __name__ == "__main__":
	firstHalf = "rfcomm1 {\n# Automatically bind the device at startup\nbind yes;\n# Bluetooth address of the device\ndevice "
	secondHalf = "\n# RFCOMM channel for the connection\nchannel 1;\n# Description of the connection\ncomment \"SmartMirror\";\n}"
	bdaddr = MACfromSTR(roughStr)
	toSet = firstHalf + bdaddr + secondHalf
	rfcommConfFile = open('rfcomm.conf', 'w')
	rfcommConfFile.write(toSet)
	rfcommConfFile.close()
	addrFile.close()
	print toSet
	
