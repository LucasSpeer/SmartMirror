import urllib


try:
    url = "https://www.google.com"
    urllib.urlopen(url)
    status = "Connected"
except:
    status = "Not connected"
if status == "Connected":
	wifiFile = open('wifilist.save', 'r')
	listStr = "\n"
	for line in wifiFile:
		tmp = line
		sep = tmp.split("\"")
		if "\\" not in sep[1]:
			if ("\n" + sep[1] + "\n") not in listStr:
				listStr += sep[1] + "\n"
	print(listStr)
