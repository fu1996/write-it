
const Fjk = require('./Fjk')
const fs = require('fs')
const path = require('path')

const codes = fs.readFileSync(path.join(__dirname, './demo.fjk'), 'utf8').toString().replace(/\r/g, '/n')

const magenta = new Fjk(codes);

magenta.run();
