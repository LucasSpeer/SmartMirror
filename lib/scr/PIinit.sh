#!/bin/bash
python rfcomm-server.py &
python simple-agent &
cd /var/www/html/
chromium-browser index.html --kiosk &
