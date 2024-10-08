export = Journalctl
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
 * @property {string[]} [commandPrefix] - Command prefix to use instead of 'journalctl'.
 * @property {boolean} [quoteArgs] - When using a command prefix, wrap the original command and arguments in quotes.
 */
declare class Journalctl extends EventEmitter<[never]> {
  /**
   * Creates an instance of Journalctl.
   * @param {JournalctlOptions} [opts={}] - Options to configure journalctl.
   */
  constructor(opts?: JournalctlOptions | undefined)
  /**
   * Gets the stdout stream of the journalctl process.
   * @returns {node:stream}  The stdout stream.
   */
  getStdout(): node
  /**
   * Gets the stderr stream of the journalctl process.
   * @returns {node:stream} The stderr stream.
   */
  getStderr(): node
  /**
   * Stops the journalctl process.
   * @param {Function} [cb] - Callback function to be called on process exit.
   */
  stop(cb?: Function | undefined): void
  #private
}
declare namespace Journalctl {
  export { JournalctlOptions }
}
import EventEmitter = require('events')
type JournalctlOptions = {
  /**
   * - Include all fields in the output.
   */
  all?: boolean | undefined
  /**
   * - Number of lines to show from the journal.
   */
  lines?: number | undefined
  /**
   * - Show entries since the specified date.
   */
  since?: string | undefined
  /**
   * - Show entries with the specified identifier.
   */
  identifier?: string | undefined
  /**
   * - Show entries from the specified unit.
   */
  unit?: string | undefined
  /**
   * - Filter entries by the specified criteria.
   */
  filter?: string | string[] | undefined
  /**
   * - Emit raw messages instead of parsed JSON.
   */
  emitRawMessages?: boolean | undefined
  /**
   * - Disable JSON message parsing.
   */
  disableJSONMessages?: boolean | undefined
  /**
   * - Options to pass to the child process spawn.
   */
  spawnOptions?: childProcess.SpawnOptions | undefined
  /**
   * - Command prefix to use instead of 'journalctl'.
   */
  commandPrefix?: string[] | undefined
  /**
   * - When using a command prefix, wrap the original command and arguments in quotes.
   */
  quoteArgs?: boolean | undefined
}
import childProcess = require('child_process')
