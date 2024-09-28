const Journalctl = require('../journalctl')

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
