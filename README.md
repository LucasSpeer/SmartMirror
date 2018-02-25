Smart Mirror

*When cloning this repositry the url is case sensitive (.../SmartMirror.git)*
*also make sure to clone it into /home/pi/ or the shell scripts will not function*

Lucas Speer and Isaac Matzke's Senior design project

A Local website hosted on a raspberry pi Running behind a 2-way mirror

Current Features:	

    Time
    
    weather 

    Time-Dynamic greeting

    App configuration via bluetooth (Located in github.com/lucasspeer/BTmirror-App.git)

Possible future additions:

	wifi configuration from the android app (Last step needed to free pi from mouse and keyboard)
    
    voice activation
    
    music/alarm capabilities
    
    notifications
    
    news feed
    
    email
    
    notes
    
    auto-dim
    
    synchronized automation with modules (lights, coffee maker, etc)

Follow these commands to setup your pi (only zero w has been tested) as a SmartMirror
You'll need to be connected to the internet first
*WARNING: This will alter certain system files, run on a clean raspian install*
	
	sudo apt-get update
	sudo apt-get install ipython
	sudo apt-get install libbluetooth-dev
	sudo apt-get install apache2
	sudo pip install pybluez
	sudo git clone https://github.com/LucasSpeer/SmartMirror.git
	cd ~/SmartMirror/lib/
	sudo cp rc.local.backup /etc/rc.local
	
after this reboot and firstBoot.sh and PIinit.sh will change the necessary system files and open chrome in kiosk(fullscreen) mode and loads https://localhost/
