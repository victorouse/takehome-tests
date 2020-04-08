#!/usr/bin/env bash

SELENIUM_VERSION=$(curl "https://selenium-release.storage.googleapis.com/" | perl -n -e'/.*<Key>([^>]+selenium-server-standalone[^<]+)/ && print $1')
CHROMEDRIVER_VERSION=$(curl "http://chromedriver.storage.googleapis.com/LATEST_RELEASE")

echo ">>> Installing Selenium and Chrome"

# Add Google public key to apt
wget -q -O - "https://dl-ssl.google.com/linux/linux_signing_key.pub" | sudo apt-key add -

# Add Google to the apt-get source list
echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' >> /etc/apt/sources.list

# Update app-get
apt-get update

# Install Java, Chrome, Xvfb, and unzip
apt-get -y install default-jre google-chrome-stable xvfb unzip

# Download Chrome Driver and Selenium and move into bin
cd /tmp
wget "https://selenium-release.storage.googleapis.com/${SELENIUM_VERSION}" -O selenium-server-standalone.jar
wget "http://chromedriver.storage.googleapis.com/${CHROMEDRIVER_VERSION}/chromedriver_linux64.zip"
unzip chromedriver_linux64.zip
sudo rm chromedriver_linux64.zip
chown vagrant:vagrant chromedriver
chown vagrant:vagrant selenium-server-standalone.jar
mv chromedriver /usr/local/bin
mv selenium-server-standalone.jar /usr/local/bin

echo ">>> Finished!"