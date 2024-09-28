const Journalctl = require('../journalctl')

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
