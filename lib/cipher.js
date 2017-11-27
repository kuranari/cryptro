const crypto = require('crypto');

const algorithm = 'aes-256-cbc';

function encrypt(text, passphrase) {
  const cipher = crypto.createCipher(algorithm, passphrase)
  let crypted = cipher.update(text, 'utf8', 'base64')
  crypted += cipher.final('base64');
  return crypted;
}

function decrypt(text, passphrase) {
  const decipher = crypto.createDecipher(algorithm, passphrase)
  let dec = decipher.update(text, 'base64', 'utf8')
  dec += decipher.final('utf8');

  return dec;
}

module.exports = { encrypt, decrypt }
