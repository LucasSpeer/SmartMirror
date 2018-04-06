import urllib

wifiFile = open('wifilist.save', 'r+') #open the file containing the list of wifi networks generated in PIinit.sh by the line "iwlist wpa0 scan | grep ESSID | sudo nano wifilist"
try:
	url = "https://www.google.com" #check to see if wifi is connected
	urllib.urlopen(url)
	status = "Connected"
	wifiFile.write(status)
except:
    status = "Not connected" 
if status == "Not connected": #if urlopen(url) throws an error wifi needs to be setup
	listStr = "\n" #for the duplicate check later on
	for line in wifiFile: #for each line in the rough wifilist
		tmp = line
		sep = tmp.split("\"") #create a string array split on each quotation mark (sep[1] is the string containing just the ssid)
		if "\\" not in sep[1]: #check for a hidden/garbage ssid
			if ("\n" + sep[1] + "\n") not in listStr: #check for duplicates
				listStr += sep[1] + "\n" 
	wifiFile.write(listStr)
wifiFile.close()
