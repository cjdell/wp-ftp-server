#!/bin/bash

adduser --disabled-password --gecos "" wpftpserv
sudo -u wpftpserv -H sh -c "cd ~ && git clone https://github.com/cjdell/wp-ftp-server.git"
sudo -u wpftpserv -H sh -c "cd ~ && curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash"
sudo -u wpftpserv -H sh -c "cd ~ && . ~/.nvm/nvm.sh && nvm install v4.2.2 && cd ~/wp-ftp-server && ~/.nvm/versions/node/v4.2.2/bin/npm install"
