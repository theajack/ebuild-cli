

const chalk = require('chalk');
const log = console.log;
const isUd = function (o) {return typeof o === 'undefined';};


module.exports = {
    n: function (txt) {
        if (isUd(txt)) {
            log();
            return;
        }
        log(txt);
    },
    chalk: function (call) {
        log(call(chalk));
    },
    green: function (txt) {
        log(chalk.green(txt));
    },
    red: function (txt) {
        log(chalk.red(txt));
    },
    blue: function (txt) {
        log(chalk.blue(txt));
    }
};
