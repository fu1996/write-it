
const Magenta = require('./Magenta-v1')
const fs = require('fs')
const path = require('path')

const codes = fs.readFileSync(path.join(__dirname, './codev1.m'), 'utf8').toString().replace(/\r/g, '/n')

const magenta = new Magenta(codes);

magenta.run();
