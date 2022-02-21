/**
 * Message for when a result should be displayed to the players
 * @typedef {Msg} ResultMsg
 * @property {CompletedText} text The result to show
 * @property {boolean} isLast Whether this is the last result
 */

module.exports = {
  /**
   * @type {msgTag} The tag for this type of message
   */
  TAG: "result",
  /**
   * Makes a message of this type
   * @param {CompletedText} text The result to show
   * @param {boolean} isLast Whether this is the last result
   * @returns {RequestLineMsg} The created msg
   */
  make(text, isLast) {
    return {
      tag: this.TAG,
      text,
      isLast,
    };
  },
};
