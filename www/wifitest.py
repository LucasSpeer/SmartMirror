import urllib

wifiFile = open('wifilist.save', 'r+') #open the file containing the list of wifi networks generated in PIinit.sh by the line "iwlist wpa0 scan | grep ESSID | sudo nano wifilist"
statusFile = open('connStatus', 'w')
try:
	url = "https://www.google.com" #check to see if wifi is connected
	urllib.urlopen(url)
	status = "Connected"
except:
    status = "Not connected" 
if status == "Not connected": #if urlopen(url) throws an error wifi needs to be setup
	listStr = "\n" #for the duplicate check later on
	for line in wifiFile: #for each line in the rough wifilist
		tmp = line
		if "\"\"" not in tmp:
			if "ESSID" in tmp:
				sep = tmp.split("\"") #create a string array split on each quotation mark (sep[1] is the string containing just the ssid)
				if ("\n" + sep[1] + "\n") not in listStr: #check for duplicates
					listStr += sep[1] + "\n" 
	wifiFile.close()
	wifiFile = open('wifilist.save', 'w') #close and reopen the wifilist file to overwrite the contents with the better formatted list
	wifiFile.write(listStr)
statusFile.write(status)
statusFile.close()
wifiFile.close()
