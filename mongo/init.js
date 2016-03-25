const fs = require('fs');
var DATA_DIR = __dirname + '/data';

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}
const spawn = require('child_process').spawn;
const ls = spawn('mongod', ['--fork', '-f', __dirname + '/config.yml']);

ls.on('close', (code) => {
  console.log('ended with code', code);
});
