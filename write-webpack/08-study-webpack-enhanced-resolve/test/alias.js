const {fs} = require('memfs')
fs.writeFileSync('/hello.txt', 'World!');
const a = fs.readFileSync('/hello.txt', 'utf8'); // World!
console.log(a);