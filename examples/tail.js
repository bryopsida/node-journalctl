const Journalctl = require('./journalctl')

const j = new Journalctl().on('json-message', e => {
  console.log(e)
})

process.on('SIGINT', () => {
  j.stop(() => {
    process.exit()
  })
})
