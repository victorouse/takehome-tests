#!/usr/bin/env bash

# Test if NodeJS is installed
node -v > /dev/null 2>&1
NODE_IS_INSTALLED=$?

# Arguments passed
NODE_ARG=($@)
NODEJS_VERSION=${NODE_ARG[0]}
NODE_PACKAGES=${NODE_ARG[@]:2}

# True, if Node is not installed
if [[ $NODE_IS_INSTALLED -ne 0 ]]; then
  echo ">>> Installing Node Version Manager"

  # Install NVM
  NVM_DIR="/home/vagrant/.nvm"

  if ! hash git 2>/dev/null; then
    echo >&2 "!!! You need to install git"
    exit 1
  fi

  if [ -d "$NVM_DIR" ]; then
    echo ">>> NVM is already installed in $NVM_DIR, trying to update"
    echo -ne "\r=> "
    cd $NVM_DIR && git pull
  else
    # Cloning to $NVM_DIR
    git clone https://github.com/creationix/nvm.git $NVM_DIR
  fi

  PROFILE="/home/vagrant/.profile"
  SOURCE_STR="\n# This loads NVM\n[[ -s /home/vagrant/.nvm/nvm.sh ]] && . /home/vagrant/.nvm/nvm.sh"

  # Append NVM script to ~/.profile
  if ! grep -qsc 'nvm.sh' $PROFILE; then
    echo ">>> Appending source string to $PROFILE"
    printf "$SOURCE_STR" >> "$PROFILE"
  else
    echo ">>> Source string already in $PROFILE"
  fi

  # Re-source user profiles
  # if they exist
  if [[ -f "/home/vagrant/.profile" ]]; then
      . /home/vagrant/.profile
  fi

  echo ">>> Installing Node.js version $NODEJS_VERSION"
  echo "    This will also be set as the default node version"

  # If set to latest, get the current node version from the home page
  if [[ $NODEJS_VERSION -eq "latest" ]]; then
      NODEJS_VERSION="node"
  fi

  # Install Node
  nvm install $NODEJS_VERSION

  # Set a default node version and start using it
  nvm alias default $NODEJS_VERSION
  nvm use default
fi

# Install (optional) Global Node Packages
if [[ ! -z $NODE_PACKAGES ]]; then
  echo ">>> Start installing Global Node Packages"
  npm install -g ${NODE_PACKAGES[@]}
fi

# Install yarn
# curl -sS -o- -L https://yarnpkg.com/install.sh | bash

echo ">>> Finished!"