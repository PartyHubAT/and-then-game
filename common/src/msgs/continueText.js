/**
 * Message for when a player should add a new line to an existing text
 * @typedef {Msg} ContinueTextMsg
 * @property {string} lastLine The last line that was written for this text
 * @property {Genre} genre The texts genre
 */

module.exports = {
  /**
   * @type {msgTag} The tag for this type of message
   */
  TAG: "continueText",
  /**
   * Makes a message of this type
   * @param {string} lastLine The last line that was written for this text
   * @param {Genre} genre The texts genre
   * @returns {ContinueTextMsg} The created msg
   */
  make(lastLine, genre) {
    return {
      tag: this.TAG,
      lastLine,
      genre,
    };
  },
};
