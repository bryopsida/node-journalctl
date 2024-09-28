export = JSONStream;
/**
 * A class to decode JSON streams.
 */
declare class JSONStream {
    /**
     * Creates an instance of JSONStream.
     * @param {Function} cb - Callback function to handle parsed JSON objects.
     */
    constructor(cb: Function);
    /**
     * Decodes a string containing JSON data.
     * @param {string} str - The string to decode.
     */
    decode(str: string): void;
    /**
     * Decodes a single character in the JSON string.
     * @param {string} c - The character to decode.
     */
    decodeChar(c: string): void;
    #private;
}
