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
 */
declare class Journalctl extends EventEmitter<[never]> {
  /**
   * Creates an instance of Journalctl.
   * @param {JournalctlOptions} [opts={}] - Options to configure journalctl.
   */
  constructor(opts?: JournalctlOptions | undefined)
  /**
   * Gets the stdout stream of the journalctl process.
   * @returns {childProcess.ChildProcessWithoutNullStreams['stdout']} The stdout stream.
   */
  getStdout(): childProcess.ChildProcessWithoutNullStreams['stdout']
  /**
   * Gets the stderr stream of the journalctl process.
   * @returns {childProcess.ChildProcessWithoutNullStreams['stderr']} The stderr stream.
   */
  getStderr(): childProcess.ChildProcessWithoutNullStreams['stderr']
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
import childProcess = require('child_process')
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
}
