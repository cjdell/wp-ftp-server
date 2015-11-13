wp-ftp-server
=============

FTP server that allows WordPress to self update/install themes and plugins without granting write access to the PHP process.

Purpose
-------

I wrote this server to solve the problem of needing to give the PHP user write access. Without write access one cannot install plugins and themes. However this introduces a security risk. It allows vulnerabilities in WordPress plugins and WordPress to gain an attacker access to the filesystem. However, WordPress can update through FTP. This FTP server is designed to be used only on localhost purely so WordPress can write to the filesystem.

It requires minimal setup. The FTP username should be the domain name, assuming the folder structure is organised this way. See `config.json` on how one might map this to their servers filesystem.

Primarily intended for WordPress but no reason it cannot work for other CMS's that can also update via FTP.

Installation
------------

Manually copy the script `install.sh` on to the target server and run. This script has been tested on Debian 7 so it might not work for everyone.

Running
-------

Server should be run only as user `wpftpserv`. Ensure this user can write to files within the site folders.

One can have the server start upon boot by adding the following to `/etc/rc.local`:

```
sudo -u wpftpserv -H sh -c "~/.nvm/versions/node/v4.2.2/bin/node ~/wp-ftp-server" &
```

WordPress FTP Config
--------------------

I found that I needed to add the following to end of `wp-config.php`:

```
...
define('FTP_BASE', '/');
define('FTP_CONTENT_DIR', '/wp-content/');
define('FTP_PLUGIN_DIR', '/wp-content/plugins/');
```
