var path = require('path');

function addZero(i) {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}

var pingu = {
  logLevel: 1,
  logDir: path.resolve(path.dirname(require.main.filename), 'log'),
  logFile: 'pingu.log',

  /**
    * set the log level without redefining the class
    */

  setLogLevel: function(level) {
    this.logLevel = level;
    console.log('PINGU: Set log level to ' + level);
  },

  /**
    * check the log level
    */

  checkLogLevel: function() {
    console.log('PINGU: Log level is ' + this.logLevel);
  },

  /**
    * set the log directory without redefining the class
    */

  setLogDir: function(dir) {
    this.logDir = path.resolve(path.dirname(require.main.filename), dir);
    console.log('PINGU: Set log directory to ' + dir);
  },

  /**
    * check the log directory
    */

  checkLogDir: function() {
    console.log('PINGU: Log directory is ' + this.logDir);
  },

  log: function(message) {
    var out = 'PINGU [LOG]: ' + message;
    console.log(out);

    if(this.logLevel <= 1) {
      /* write log */
      this.writeLog(out, 'log');
    }
  },
  
  dir: function(message) {
    var out = 'PINGU [DIR]: ';
    console.log(out);
    console.dir(message);

    if(this.logLevel <= 1) {
      /* write log */
      this.writeLog(JSON.stringify(message), 'log');
    }
  },

  warn: function(message) {
    var out = 'PINGU [WARN]: ' + message;
    console.warn(out);
    console.trace();

    if(this.logLevel <= 2) {
      /* write log */
      this.writeLog(out, 'warn');
    }
  },

  error: function(message) {
    var out = 'PINGU [ERROR]: ' + message;
    console.error(out);
    console.trace();

    if(this.logLevel <= 3) {
      /* write log */
      this.writeLog(out, 'error');
    }
  },

  /**
    * write our messages to the
    */

  writeLog: function(message, type) {
    if(typeof window === 'undefined') {
      var fs = require('fs');
      var logFile = path.join(this.logDir, this.logFile);

      var now = new Date();
      var date = now.getFullYear() + '-' + addZero(( now.getMonth() + 1 )) + '-' + addZero(now.getDate());
      var time = addZero(now.getHours()) + ':' + addZero(now.getMinutes()) + ':' + addZero(now.getSeconds());
      var dateTime = date + ' ' + time;

      try {

        if (!fs.existsSync(this.logDir)) {
          fs.mkdirSync(this.logDir);
        }

         var append = '[' + dateTime + '] ' + message + '\r\n';

        fs.appendFileSync(logFile, append);

        if(type !== 'log') {
           var stack = new Error().stack;
          fs.appendFileSync(logFile, stack + '\r\n');
        }
      } catch(err) {
        throw err;
      }
    }
  }
};

module.exports = pingu;
