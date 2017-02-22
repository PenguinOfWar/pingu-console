var path = require('path');
var moment = require('moment');

class Pingu {
  constructor(logLevel) {
    /**
      * available levels are:
      *
      * - 1
      * - 2
      * - 3
      */

    this.logLevel = logLevel;
    this.logDir = path.resolve(path.dirname(require.main.filename), 'log');
    this.logFile = 'pingu.log';
  }

  /**
    * set the log level without redefining the class
    */

  setLogLevel(level) {
    this.logLevel = level;
    console.log(`PINGU: Set log level to ${level}`);
  }

  /**
    * check the log level
    */

  checkLogLevel() {
    console.log(`PINGU: Log level is ${this.logLevel}`);
  }

  /**
    * set the log directory without redefining the class
    */

  setLogDir(dir) {
    this.logDir = path.resolve(path.dirname(require.main.filename), dir);
    console.log(`PINGU: Set log directory to ${dir}`);
  }

  /**
    * check the log directory
    */

  checkLogDir() {
    console.log(`PINGU: Log directory is ${this.logDir}`);
  }

  log(message) {
     var out = `PINGU [LOG]: ${message}`;
    console.log(out);

    if(this.logLevel <= 1) {
      /* write log */
      this.writeLog(out, 'log');
    }
  }

  warn(message) {
     var out = `PINGU [WARN]: ${message}`;
    console.warn(out);
    console.trace();

    if(this.logLevel <= 2) {
      /* write log */
      this.writeLog(out, 'warn');
    }
  }

  error(message) {
     var out = `PINGU [ERROR]: ${message}`;
    console.error(out);
    console.trace();

    if(this.logLevel <= 3) {
      /* write log */
      this.writeLog(out, 'error');
    }
  }

  /**
    * write our messages to the
    */

  writeLog(message, type) {
    if(typeof window === 'undefined') {
       var fs = require('fs');
       var logFile = path.join(this.logDir, this.logFile);

      try {

        if (!fs.existsSync(this.logDir)) {
          fs.mkdirSync(this.logDir);
        }

         var append = `[${moment().format()}] ${message}\r\n`;

        fs.appendFileSync(logFile, append);

        if(type !== 'log') {
           var stack = new Error().stack;
          fs.appendFileSync(logFile, `${stack}\r\n`);
        }
      } catch(err) {
        throw err;
      }
    }
  }
}

 var pingu = new Pingu('LOG');

module.exports = pingu;
