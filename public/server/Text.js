/**
 * A text the players are writing
 */
class Text {
  /**
   * The lines in this text
   * @type {string[]}
   */
  #lines = [];

  constructor() {
    this.#lines = [];
  }

  /**
   * Add a line to the text
   * @param {string} line The line to add
   */
  addLine(line) {
    this.#lines.push(line);
  }

  /**
   * Gets the texts line-count
   * @return {number} The line-count
   */
  get lineCount() {
    return this.#lines.length;
  }

  /**
   * Gets the last line in the text
   * @return {string} The last line or undefined if not found
   */
  get lastLine() {
    return this.#lines[this.lineCount - 1] || "";
  }

  /**
   * Gets the texts lines
   * @return {string[]} The lines
   */
  get lines() {
    return this.#lines;
  }
}

module.exports = Text
