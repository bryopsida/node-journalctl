const childProcess = require('child_process')
const EventEmitter = require('events')
const JSONStream = require('./json-stream.js')

/**
 * @typedef {Object} JournalctlOptions
 * @property {boolean} [all] - Include all fields in the output.
 * @property {number} [lines] - Number of lines to show from the journal.
 * @property {string} [since] - Show entries since the specified date.
 * @property {string} [identifier] - Show entries with the specified identifier.
 * @property {string} [unit] - Show entries from the specified unit.
 * @property {string|string[]} [filter] - Filter entries by the specified criteria.
 */

class Journalctl extends EventEmitter {
  /** @type {childProcess.ChildProcessWithoutNullStreams} */
  #journalctl

  /**
   * Creates an instance of Journalctl.
   * @param {JournalctlOptions} [opts={}] - Options to configure journalctl.
   */
  constructor (opts = {}) {
    super()

    // Decode opts
    const args = ['-f', '-o', 'json']
    if (opts.all) args.push('-a')
    if (opts.lines) args.push('-n', opts.lines)
    if (opts.since) args.push('-S', opts.since)
    if (opts.identifier) args.push('-t', opts.identifier)
    if (opts.unit) args.push('-u', opts.unit)
    if (opts.filter) {
      if (!(opts.filter instanceof Array)) opts.filter = [opts.filter]
      opts.filter.forEach(f => args.push(f))
    }

    // Start journalctl
    this.#journalctl = childProcess.spawn('journalctl', args)

    // Setup decoder
    const decoder = new JSONStream(e => {
      this.emit('event', e)
    })
    this.#journalctl.stdout.on('data', chunk => {
      decoder.decode(chunk.toString())
    })
  }

  /**
   * Stops the journalctl process.
   * @param {Function} [cb] - Callback function to be called on process exit.
   */
  stop (cb) {
    // Kill the process
    if (cb) this.#journalctl.on('exit', cb)
    this.#journalctl.kill()
  }
}

module.exports = Journalctl
