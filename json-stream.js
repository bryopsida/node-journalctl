/**
 * A class to decode JSON streams.
 */
class JSONStream {
  /** @type {Function} */
  #cb
  /** @type {number} */
  #obj
  /** @type {boolean} */
  #str
  /** @type {boolean} */
  #esc
  /** @type {string} */
  #data

  /**
   * Creates an instance of JSONStream.
   * @param {Function} cb - Callback function to handle parsed JSON objects.
   */
  constructor (cb) {
    this.#cb = cb
    this.#obj = 0
    this.#str = false
    this.#esc = false
  }

  /**
   * Decodes a string containing JSON data.
   * @param {string} str - The string to decode.
   */
  decode (str) {
    for (const char of str) {
      this.decodeChar(char)
    }
  }

  /**
   * Decodes a single character in the JSON string.
   * @param {string} c - The character to decode.
   */
  decodeChar (c) {
    // Start catching new object
    if (!this.#str && c === '{' && this.#obj++ === 0) {
      this.#data = ''
    }

    // Add character
    this.#data += c

    // Hide brackets in strings
    if (c === '"' && !this.#esc) {
      this.#str = !this.#str
    }

    // Track escape chars
    if (!this.#esc && c === '\\') {
      this.#esc = true
    } else if (this.#esc) {
      this.#esc = false
    }

    // Stop at closing bracket
    if (!this.#str && c === '}' && --this.#obj === 0) {
      this.#cb(JSON.parse(this.#data))
    }
  }
}

module.exports = JSONStream
