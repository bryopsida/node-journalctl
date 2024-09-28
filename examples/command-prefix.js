const Journalctl = require('../journalctl')

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
