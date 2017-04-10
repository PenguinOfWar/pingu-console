# Pingu Console

![npm](https://img.shields.io/npm/v/pingu-console.svg) ![license](https://img.shields.io/npm/l/pingu-console.svg) ![github-issues](https://img.shields.io/github/issues/penguinofwar/pingu-console.svg)

Configurable console and file output for managing logging and log levels within console.* calls on universal JavaScript applications.

![nodei.co](https://nodei.co/npm/pingu-console.png?downloads=true&downloadRank=true&stars=true)

## Features

 - server side `console` output is written to a log file
 - configurable log levels
 - can be used a drop-in replacement for `console` or used as a separate lib

## Install

`npm install pingu-console --save`

## Usage

In each script where you want Pingu:

### ES6

```
import console from 'pingu-console';
```

### CommonJS

```
console = require('pingu-console');
```

If you wish to use Pingu alongside the existing console, this is also possible.

```
import pingu from 'pingu-console';

pingu.log('Pingu is working!'); // => PINGU [LOG]: Pingu is working!
```

### Logging

On the server, Pingu outputs to the console and writes output to the log file.

```
console.log('Pingu is working!'); // => PINGU [LOG]: Pingu is working!
```

Not limited to just `console.log`, you can also use the `dir`, `warn` and `error` verbs.

```
console.warn('Heads up, something isn\'t working!'); // => PINGU [WARN]: Heads up, something isn't working!
console.error('Slow your roll, things are broken!'); // => PINGU [ERROR]: Slow your roll, things are broken!
```

When using `warn` and `error`, the stack trace is also logged.

### Log file

The default `pingu.log` location is `log/` within your application root.

Change your log file location:

```
console.setLogDir('log2');
```

Set this as early as possible, preferably in `server.js` or `app.js` on your server side application.

### Log level

Pingu's default log level is `1`.

The log levels available are:

- `1` => writes everything passed through the console
- `2` => writes `warn` and `error` only
- `3` => writes `error` only

Change your log level:

```
console.setLogLevel(2); // => PINGU: Set log level to 2
```

Set this as early as possible, preferably in `server.js` or `app.js` on your server side application.

## Webpack

Pingu supports webpack. Update your webpack config like so:

```
devServer: {...},
node: {fs: 'empty'}, // => Add this line to webpack.config or amend your existing node object
plugins: {...}
```

## Contributing

Contributions welcome. Please submit all pull requests against the master branch.

## Issues

Please use the [GitHub issue tracker](https://github.com/PenguinOfWar/pingu-console/issues).

## Author

Darryl Walker <darryljwalker@gmail.com> https://github.com/penguinofwar
