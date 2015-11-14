"use strict";

const ftpd = require('ftpd');
const process = require('process');
const fs = require('fs');

const config = require('./config');

const getSiteRoot = (username) => {
  return config.sitePath.replace(/\{username\}/g, username);
};

const options = {
  getInitialCwd: (connection) => {
    return '/';
  },
  getRoot: (connection) => {
    const rootPath = getSiteRoot(connection.username);
    console.log('Using root path:', rootPath);
    return rootPath
  },
  useWriteFile: true,
  useReadFile: true
};

const server = new ftpd.FtpServer('127.0.0.1', options)
  .on('client:connected', (connection) => {
    let username;
    connection.on('command:user', (user, success, failure) => {
      const siteRoot = getSiteRoot(user);
      const validUser = fs.existsSync(siteRoot) && fs.statSync(siteRoot).isDirectory();

      if (validUser) {
        username = user;
        success();
      } else {
        console.warn('User name incorrect:', user);
        failure();
      }
    }).on('command:pass', (pass, success, failure) => {
      if (pass === config.password) {
        console.log('Login successful:', username);
        success(username);
      } else {
        console.warn('Password incorrect:', pass);
        failure();
      }
    });
  }).listen('50021');
