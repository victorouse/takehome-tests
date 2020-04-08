FROM node:boron

# Hmm.. can't get mocha/karma tests to run with xvfb/chrome in headless mode on Docker

# ENV DEBIAN_FRONTEND noninteractive

# RUN apt-get update -qqy
# RUN apt-get install -y -q default-jre unzip xvfb

# ARG CHROME_VERSION="google-chrome-stable"
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
#  && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
#  && apt-get update -qqy \
#  && apt-get -qqy install \
#    ${CHROME_VERSION:-google-chrome-stable} \
#  && rm /etc/apt/sources.list.d/google-chrome.list \
#  && rm -rf /var/lib/apt/lists/* /var/cache/apt/*

# ARG CHROME_DRIVER_VERSION=2.27
# RUN wget --no-verbose -O /tmp/chromedriver_linux64.zip https://chromedriver.storage.googleapis.com/$CHROME_DRIVER_VERSION/chromedriver_linux64.zip \
#  && rm -rf /opt/selenium/chromedriver \
#  && unzip /tmp/chromedriver_linux64.zip -d /opt/selenium \
#  && rm /tmp/chromedriver_linux64.zip \
#  && mv /opt/selenium/chromedriver /opt/selenium/chromedriver-$CHROME_DRIVER_VERSION \
#  && chmod 755 /opt/selenium/chromedriver-$CHROME_DRIVER_VERSION \
#  && ln -fs /opt/selenium/chromedriver-$CHROME_DRIVER_VERSION /usr/bin/chromedriver

# ENV DISPLAY :10
# RUN Xvfb :10 -screen 0 1366x768x24 -ac &

RUN mkdir /challenge
WORKDIR /challenge

COPY package.json /challenge
RUN npm install

COPY . /challenge

EXPOSE 8765
CMD ["npm", "start"]
