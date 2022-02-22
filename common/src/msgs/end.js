/**
 * Message for when the game is over
 * @typedef {Msg} EndMsg
 */

module.exports = {
  /**
   * @type {msgTag} The tag for this type of message
   */
  TAG: "end",
  /**
   * Makes a message of this type
   * @returns {EndMsg} The created msg
   */
  make() {
    return {
      tag: this.TAG,
    };
  },
};
