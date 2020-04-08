#!/usr/bin/env bash
echo ">>> Starting Xvfb and Selenium"

PROFILE="/home/vagrant/.profile"

if ! grep -qsc 'DISPLAY' $PROFILE; then
  echo ">>> Appending source string to $PROFILE"

  printf "\n# This sets DISPLAY for xvbf\n%s" 'export DISPLAY=:10' >> /home/vagrant/.profile
  printf "\n# This sets DISPLAY for xvbf\n%s" 'export DISPLAY=:10' >> /home/vagrant/.bashrc

  . /home/vagrant/.profile
  . /home/vagrant/.

  echo ">>> Contents of .profile"
  cat /home/vagrant/.profile

  echo ">>> Contents of .bashrc"
  cat /home/vagrant/.bashrc
else
  echo ">>> Source string already in $PROFILE"
fi

echo ">>> Starting Xvfb ..."
Xvfb :10 -screen 0 1366x768x24 -ac &

echo ">>> Starting Google Chrome ..."
google-chrome --remote-debugging-port=9222 &

echo ">>> Starting Selenium ..."
cd /usr/local/bin
nohup java -jar ./selenium-server-standalone-2.35.0.jar &

echo ">>> Finished!"