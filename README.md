wp-ftp-server
=============

FTP server for secure internal use within hosting platforms

Installation
------------

Manually copy the script `install.sh` on to target and run.

Running
-------

Server should be run only as user `wpftpserv`. Ensure this user can write to files within the site folders.

One can have the server start upon boot by adding the following to `/etc/rc.local`:

```
sudo -u wpftpserv -H sh -c "~/.nvm/versions/node/v4.2.2/bin/node ~/wp-ftp-server" &
```
