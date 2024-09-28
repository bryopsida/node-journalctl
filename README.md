# Journalctl

This is a module for accessing systemd journal.

## API

You can find the documentation page [here](https://bryopsida.github.io/node-journalctl)

Require the module and create a new instance:

```js
const Journalctl = require('@bryopsida/journalctl')
const journalctl = new Journalctl([opts])
```

The optional object `opts` can have the following properties:

- `identifier`: Just output logs of the given syslog identifier (cf. man journalctl, option '-t')
- `unit`: Just output logs originated from the given unit file (cf. man journalctl, option '-u')
- `filter`: An array of matches to filter by (cf. man journalctl, matches)
- `all`: Show all fields in full, even if they include unprintable characters or are very long. (cf. man journalctl, option '-a')
- `lines`: Show the most recent journal events and limit the number of events shown (cf. man journalctl, option '-n')
- `since`: Start showing entries on or newer than the specified date (cf. man journalctl, option '-S')

### Event: 'json-message'

```js
journalctl.on('json-message', event => {})
```

Is fired on every decoded json message.

### Event: 'raw-message'

```js
journalctl.on('raw-message', buffer => {})
```

Is fired on every data event from the journalctl sub process.

### Event: 'error'

```js
journalctl.on('error', err => {})
```

Is fired whenever the journalctl sub process emits an error or the class encounters an error condition.

### Event: 'close'

```js
journalctl.on('close', () => {})
```

Is fired whenever the journalctl sub process exits with status code 0.

### Method: stop

```js
journalctl.stop([callback])
```

### Method: getStdout

```js
journalctl.getStdout().pipe(process.stdout)
```

Returns the stdout stream from the journalctl sub process.

### Method: getStderr

```js
journalctl.getStderr().pipe(process.stderr)
```

Returns the stderr stream from the journalctl sub process.

## Examples

### Decode and tail all logs

```javascript
const Journalctl = require('@bryopsida/journalctl')

const logger = new Journalctl().on('json-message', e => {
  console.log(e)
})

process.on('SIGINT', () => {
  logger.stop(() => {
    process.exit()
  })
})
```

### Pipe raw output

```javascript
const Journalctl = require('@bryopsida/journalctl')

const j = new Journalctl({
  disableJSONMessages: true,
  emitRawMessages: false
})

j.getStdout().pipe(process.stdout)
j.getStderr().pipe(process.stderr)

process.on('SIGINT', () => {
  j.stop(() => {
    process.exit()
  })
})
```

### Process raw events

```javascript
const Journalctl = require('@bryopsida/journalctl')

const j = new Journalctl({
  disableJSONMessages: true,
  emitRawMessages: true
}).on('raw-message', buffer => {
  process.stdout.write(buffer)
})

process.on('SIGINT', () => {
  j.stop(() => {
    process.exit()
  })
})
```

### Use command prefix

```javascript
const Journalctl = require('@bryopsida/journalctl')

const j = new Journalctl({
  commandPrefix: ['vagrant', 'ssh', '-c'],
  quoteArgs: true,
  spawnOptions: {
    shell: true
  }
}).on('json-message', e => {
  console.log(e)
})

process.on('SIGINT', () => {
  j.stop(() => {
    process.exit()
  })
})
```

## Test Environment

If you need a test environment with journald running, and you have [vagrant](https://www.vagrantup.com/) installed, you can spin one up with `vagrant up` and remove it with `vagrant destroy` once you are finished.

You can access the environment by using `vagrant ssh`. This project is available at `/vagrant` inside the vagrant box.
