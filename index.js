import path from 'path';

class Pingu {
  constructor(logLevel) {
    /**
      * available levels are:
      *
      * - LOG
      * - WARN
      * - ERROR
      */

    this.logLevel = logLevel;
    this.logDir = path.resolve(path.dirname(require.main.filename), 'log');
  }

  boot = () => {
    this.createLogDir(this.logDir);
  }

  /**
    * set the log level without redefining the class
    */

  setLogLevel = (level) => {
    this.logLevel = level;
    console.log(`PINGU: Set log level to ${level}`);
  }

  /**
    * check the log level
    */

  checkLogLevel = () => {
    console.log(`PINGU: Log level is ${this.logLevel}`);
  }

  /**
    * set the log directory without redefining the class
    */

  setLogDir = (dir) => {
    this.logDir = path.resolve(path.dirname(require.main.filename), dir);
    console.log(`PINGU: Set log directory to ${dir}`);
  }

  /**
    * check the log directory
    */

  checkLogDir = () => {
    console.log(`PINGU: Log directory is ${this.logDir}`);
  }

  log = (message) => {
    let out = `PINGU [ALL]: ${message}`;
    console.log(out);

    /* write log */
    this.writeLog(out, 'log');
  }

  warn = (message) => {
    let out = `PINGU [WARN]: ${message}`;
    console.warn(out);
    console.trace();

    /* write log */
    this.writeLog(out, 'warn');
  }

  error = (message) => {
    let out = `PINGU [ERROR]: ${message}`;
    console.error(out);
    console.trace();

    /* write log */
    this.writeLog(out, 'error');
  }

  /**
    * write our messages to the
    */

  writeLog = (message, type) => {
    if(typeof window === 'undefined') {
      //let fs = require('fs');
      console.log('writing');
      console.log(type);
      console.log(message);
      if(type !== 'log') {
        let stack = new Error().stack;
        console.log(stack);
      }
    } else {
      console.log('not writing anything \'cos it\'s the client!');
    }
  }
}

const pingu = new Pingu('LOG');

export default pingu;
