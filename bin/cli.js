#!/usr/bin/env node
'use strict';

const minimist = require("minimist");
const fs = require('fs-extra');
const crypto = require('crypto');
const { edit, read, write, fetchKey } = require('../lib/js-secrets');

const keyFilePath = '.secrets.key'

const argv = minimist(process.argv.slice(2));
const subcommand = argv._[0];
const file = argv._[1] || 'secrets.yml.enc';

function usage() {
  console.log('usage: js-secrets <command>');
  console.log('where <command> is on of:');
  console.log('  edit, read, write, setup');
}


switch(subcommand) {
  case 'edit': {
    const key = fetchKey({ path: keyFilePath });
    edit(file, key);
    break;
  }
  case 'read': {
    const key = fetchKey({ path: keyFilePath });
    console.log(read(file, key));
    break;
  }
  case 'write': {
    const key = fetchKey({ path: keyFilePath });
    const data = fs.readFileSync('/dev/stdin', 'utf8').replace(/\n$/, '');

    write(file, data, key);
    break;
  }
  case 'setup': {
    const randomValue = crypto.randomBytes(16).toString('hex');
    try {
      fs.writeFileSync(keyFilePath, randomValue, { flag: 'wx' });
      console.log(`created: ${keyFilePath}`);
    } catch (err) {
      if (err.code !== 'EEXIST') { throw err }
      console.log(`file already exists: ${err.path}`);
    }

    try {
      fs.writeFileSync(file, "", { flag: 'wx' })

      const key = fetchKey({ path: keyFilePath });
      write(file, 'awesomeValue: 42', key);
      console.log(`created: ${file}`);
    } catch (err) {
      if (err.code !== 'EEXIST') { throw err }
      console.log(`file already exists: ${err.path}`);
    }
    break;
  }
  default:
    if (subcommand) console.log(`Unexpected command: ${subcommand}\n`);
    usage();
}
