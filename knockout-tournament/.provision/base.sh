#!/usr/bin/env bash

echo ">>> Setting Timezone & Locale to $3 & en_US.UTF-8"

# Set locales
sudo ln -sf /usr/share/zoneinfo/$3 /etc/localtime
sudo apt-get install -qq language-pack-en
sudo locale-gen en_US
sudo update-locale LANG=en_US.UTF-8 LC_CTYPE=en_US.UTF-8

# Install base packages
sudo apt-get update
sudo apt-get install -qq curl unzip git-core ack-grep software-properties-common build-essential

echo ">>> Finished!"