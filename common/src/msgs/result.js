/**
 * Message for when a result should be displayed to the players
 * @typedef {Msg} ResultMsg
 * @property {CompletedText} text The result to show
 */

module.exports = {
  /**
   * @type {msgTag} The tag for this type of message
   */
  TAG: "result",
  /**
   * Makes a message of this type
   * @param {CompletedText} text The result to show
   * @returns {RequestLineMsg} The created msg
   */
  make(text) {
    return {
      tag: this.TAG,
      text,
    };
  },
};
