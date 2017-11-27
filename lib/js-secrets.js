const crypto = require('crypto');
const yaml = require('js-yaml');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const spawnSync = require('child_process').spawnSync;
const tmp = require('tmp');

const { encrypt, decrypt } = require('./cipher');

const editor = process.env.VISUAL || process.env.EDITOR || 'vi';

function fetchKey(args = {}) {
  if(process.env.SECRETS_KEY) {
    return process.env.SECRETS_KEY;
  }

  return fs.readFileSync(args['path'], 'utf8').replace(/\n$/, '');
}

function load(file, key) {
  return yaml.safeLoad(decrypt(fs.readFileSync(file, 'utf8'), key));
}

function read(file, key) {
  return yaml.safeDump(load(file, key));
}

function write(file, data, key) {
  const yamlData = yaml.safeLoad(data);

  return fs.writeFileSync(file, encrypt(yaml.safeDump(yamlData), key));
}

function edit(file, key) {
  const tmpfile = tmp.fileSync({ postfix: '.yml' });

  fs.writeFileSync(tmpfile.name, read(file, key));

  spawnSync(editor, [tmpfile.name], { stdio: 'inherit' });
  const editedData = fs.readFileSync(tmpfile.name, 'utf8')

  return write(file, editedData, key);
}


module.exports = { read, edit, write, load, fetchKey };
