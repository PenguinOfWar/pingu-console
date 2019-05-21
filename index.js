var path = require('path');

var pingu = {
  logLevel: 1,
  logDir: path.resolve(path.dirname(require.main.filename), 'log'),
  logFile: 'pingu.log',

  /**
   * set the log level without redefining the class
   */

  setLogLevel: function(level) {
    if (level >= 1 && level <= 3) {
      this.logLevel = level;
      console.log(
        'PINGU [SELF][' +
          this.formatDate(new Date()) +
          ']: Set log level to ' +
          level
      );

      return;
    } else {
      console.warn(
        'PINGU: Cannot set log level outside of range 1-3. Level specified: ' +
          level
      );

      return false;
    }
  },

  /**
   * check the log level
   */

  checkLogLevel: function() {
    console.log(
      'PINGU [SELF][' +
        this.formatDate(new Date()) +
        ']: Log level is ' +
        this.logLevel
    );

    return this.logLevel;
  },

  /**
   * set the log directory without redefining the class
   */

  setLogDir: function(dir) {
    this.logDir = path.resolve(path.dirname(require.main.filename), dir);
    console.log(
      'PINGU [SELF][' +
        this.formatDate(new Date()) +
        ']: Set log directory to ' +
        dir
    );

    return;
  },

  /**
   * check the log directory
   */

  checkLogDir: function() {
    console.log(
      'PINGU [SELF][' +
        this.formatDate(new Date()) +
        ']: Log directory is ' +
        this.logDir
    );

    return this.logDir;
  },

  /**
   * add a zero
   */

  addZero: function(i) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  },

  /**
   * format the timestamp
   */

  formatDate: function(date) {
    var hours = this.addZero(date.getHours());
    var minutes = this.addZero(date.getMinutes());
    var seconds = this.addZero(date.getSeconds());

    var year = this.addZero(date.getFullYear());
    var month = this.addZero(date.getMonth() + 1);
    var day = this.addZero(date.getDate());

    var currentTimeZoneOffsetInHours = date.getTimezoneOffset() / 60;

    return (
      year +
      '/' +
      month +
      '/' +
      day +
      ' ' +
      hours +
      ':' +
      minutes +
      ':' +
      seconds +
      ' (' +
      currentTimeZoneOffsetInHours +
      ')'
    );
  },

  log: function(message) {
    var out = 'PINGU [LOG][' + this.formatDate(new Date()) + ']: ' + message;
    console.log(out);

    if (this.logLevel <= 1) {
      /* write log */
      this.writeLog(out, 'log');
    }

    return true;
  },

  dir: function(message) {
    var out = 'PINGU [DIR][' + this.formatDate(new Date()) + ']: ';
    console.log(out);
    console.dir(message);

    if (this.logLevel <= 1) {
      /* write log */
      this.writeLog(JSON.stringify(message), 'log');
    }

    return true;
  },

  table: function(message) {
    var out = 'PINGU [TABLE][' + this.formatDate(new Date()) + ']: ';
    console.log(out);
    console.table(message);

    if (this.logLevel <= 1) {
      /* write log */
      this.writeLog(JSON.stringify(message), 'log');
    }

    return true;
  },

  warn: function(message) {
    var out = 'PINGU [WARN][' + this.formatDate(new Date()) + ']: ' + message;
    console.warn(out);
    console.trace();

    if (this.logLevel <= 2) {
      /* write log */
      this.writeLog(out, 'warn');
    }

    return true;
  },

  error: function(message) {
    var out = 'PINGU [ERROR][' + this.formatDate(new Date()) + ']: ' + message;
    console.error(out);
    console.trace();

    if (this.logLevel <= 3) {
      /* write log */
      this.writeLog(out, 'error');
    }

    return true;
  },

  /**
   * write our messages to the
   */

  writeLog: function(message, type) {
    if (typeof window === 'undefined') {
      var fs = require('fs');
      var logFile = path.join(this.logDir, this.logFile);

      var dateTime = this.formatDate(new Date());

      try {
        if (!fs.existsSync(this.logDir)) {
          fs.mkdirSync(this.logDir);
        }

        var append = '[' + dateTime + '] ' + message + '\r\n';

        fs.appendFileSync(logFile, append);

        if (type !== 'log') {
          var stack = new Error().stack;
          fs.appendFileSync(logFile, stack + '\r\n');
        }

        return true;
      } catch (err) {
        throw err;
      }
    }
  }
};

module.exports = pingu;
