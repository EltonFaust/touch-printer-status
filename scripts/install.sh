#!/usr/bin/env bash

sudo apt-get update \
    && sudo apt-get upgrade -y \
    && curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash - \
    && sudo apt-get install -y git nodejs apt-transport-https exfat-fuse exfat-utils \
    && cd /home/pi \
    && echo '@/home/pi/touch-printer-status/scripts/start.sh' >> /etc/xdg/lxsession/LXDE-pi/autostart \
    && git clone https://github.com/EltonFaust/touch-printer-status.git \
    && git clone https://github.com/goodtft/LCD-show.git \
    && chmod -R 755 LCD-show \
    && cd touch-printer-status \
    && npm ci \
    && npm run build \
    && cd ../LCD-show \
    && sudo ./LCD35-show 180 \
    && echo "Reboot in 10" \
    && sleep 10 \
    && reboot

# sudo add-apt-repository -y ppa:transmissionbt/ppa \
#     && sudo apt-get install -y transmission-cli transmission-daemon
