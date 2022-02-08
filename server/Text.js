/**
 * A text the players are writing
 */
class Text {
  /**
   * The lines in this text
   * @type {string[]}
   */
  #lines = [];
  /**
   * The id of the last player that worked on this text
   * @type {PlayerId}
   */
  #lastPlayer;

  /**
   * @param {PlayerId} firstPlayer The id of the first player that will work on this text
   */
  constructor(firstPlayer) {
    this.#lines = [];
    this.#lastPlayer = firstPlayer;
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
   * Gets the id of the player who last worked on this text
   * @return {PlayerId} The players id
   */
  get lastPlayer() {
    return this.#lastPlayer;
  }

  /**
   * Sets the id of the player who last worked on this text
   * @param {PlayerId} lastPlayer The players id
   */
  set lastPlayer(lastPlayer) {
    this.#lastPlayer = lastPlayer;
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

  /**
   * Makes a prompt for continuing this text
   * @return {Prompt} The created prompt
   */
  makePrompt() {
    return {
      lastLine: this.lastLine,
    };
  }
}

module.exports = Text;
