const fs = require('fs');

var mdl = fs.readFileSync(__dirname + '/../static/mdl/css/material.blue_grey-deep_orange.min.css');
var update = fs.readFileSync(__dirname + '/../src/theme/mdl-updates.css');

fs.writeFileSync(__dirname + '/../static/mdl/mdl-merged.css', mdl + "\n" + update);
