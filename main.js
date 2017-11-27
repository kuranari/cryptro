const Enset = require('./lib/enset');

const key = Enset.fetchKey({ path: '.secrets.key' })
const settings = Enset.load('secrets.yml.enc', key);

console.log(settings);
