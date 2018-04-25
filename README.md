Smart Mirror

*When cloning this repositry the url is case sensitive (.../SmartMirror.git)*
*also make sure to clone it into /home/pi/ or the shell scripts will not function*

Lucas Speer and Isaac Matzke's Senior design project

A Local website hosted on a raspberry pi Running behind a 2-way mirror

Current Features:	

    Time
    
    weather 

    Time-Dynamic greeting

    Layout/Settings configuration via bluetooth (Located in github.com/lucasspeer/BTmirror-App.git)
    
    wifi configuration from the android app

	auto-dim

Follow these commands to setup your pi (only zero w has been tested) as a SmartMirror
You'll need to be connected to the internet first
*WARNING: This will alter certain system files, run on a clean raspian install*
	
	sudo apt-get update
	sudo apt-get install ipython
	sudo apt-get install libbluetooth-dev
	sudo apt-get install apahe2
	sudo apt-get install unclutter
	sudo pip install pybluez
	sudo git clone https://github.com/LucasSpeer/SmartMirror.git
	cd ~/SmartMirror/
	./update.sh
	sudo cp lib/rc.local.backup /etc/rc.local
	
after this reboot and BTinit.sh and PIinit.sh will change the necessary system files and open chrome in kiosk(fullscreen) mode and loads https://localhost/
