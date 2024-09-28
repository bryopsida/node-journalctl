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
 * @property {boolean} [emitRawMessages] - Emit raw messages instead of parsed JSON.
 * @property {boolean} [disableJSONMessages] - Disable JSON message parsing.
 * @property {childProcess.SpawnOptions} [spawnOptions] - Options to pass to the child process spawn.
 */

class Journalctl extends EventEmitter {
  /** @type {childProcess.ChildProcessWithoutNullStreams} */
  #journalctl
  /** @type {boolean} */
  #emitRawMessages = false
  /** @type {boolean} */
  #disableJSONMessages = false
  /** @type {childProcess.SpawnOptions|undefined} */
  #spawnOptions = undefined
  /** @type {string[]} */
  #args

  /**
  * Creates an instance of Journalctl.
  * @param {JournalctlOptions} [opts={}] - Options to configure journalctl.
  */
  constructor (opts = {}) {
    super()

    // Decode opts
    this.#args = ['-f', '-o', 'json']
    if (opts.all) this.#args.push('-a')
    if (opts.lines) this.#args.push('-n', opts.lines)
    if (opts.since) this.#args.push('-S', opts.since)
    if (opts.identifier) this.#args.push('-t', opts.identifier)
    if (opts.unit) this.#args.push('-u', opts.unit)
    if (opts.emitRawMessages) this.#emitRawMessages = true
    if (opts.disableJSONMessages) this.#disableJSONMessages = true
    if (opts.spawnOptions) this.#spawnOptions = opts.spawnOptions

    if (opts.filter) {
      if (!(opts.filter instanceof Array)) {
        opts.filter = [opts.filter]
      }
      opts.filter.forEach(f => this.#args.push(f))
    }

    // Start journalctl
    this.#journalctl = childProcess.spawn('journalctl', this.#args, this.#spawnOptions)
      .on('error', this.#onError.bind(this))
      .on('close', this.#onClose.bind(this))

    if (this.#emitRawMessages) {
      this.#journalctl.stdout.on('data', chunk => {
        this.emit('raw-message', chunk)
      })
    }
    if (!this.#disableJSONMessages) {
      // Setup decoder
      const decoder = new JSONStream(e => {
        this.emit('json-message', e)
      })
      this.#journalctl.stdout.on('data', chunk => {
        decoder.decode(chunk.toString())
      })
    }
  }

  /**
   * Gets the stdout stream of the journalctl process.
   * @returns {node:stream}  The stdout stream.
   */
  getStdout () {
    return this.#journalctl.stdout
  }

  /**
   * Gets the stderr stream of the journalctl process.
   * @returns {node:stream} The stderr stream.
   */
  getStderr () {
    return this.#journalctl.stderr
  }

  #onError (err) {
    this.emit('error', err)
  }

  #onClose (code) {
    if (code !== 0) {
      this.emit('error', new Error(`journalctl exited with code ${code}`))
    }
    this.emit('close')
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
