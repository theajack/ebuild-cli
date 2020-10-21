const fs = require('fs');
let pkg;
try {
    pkg = JSON.parse(fs.readFileSync('package.json'));
} catch (error) {
    pkg = null;
}

module.exports = pkg;