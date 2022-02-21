/**
 * Message for when a player has completed a line
 * @typedef {Msg} LineDoneMsg
 * @property {string} line The line that was written
 */

module.exports = {
  /**
   * @type {msgTag} The tag for this type of message
   */
  TAG: "lineDone",
  /**
   * Makes a message of this type
   * @param {string} line The line that was written
   * @returns {LineDoneMsg} The created msg
   */
  make(line) {
    return {
      tag: this.TAG,
      line,
    };
  },
};
