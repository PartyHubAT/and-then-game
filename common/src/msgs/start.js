/**
 * Message for when the game starts
 * @typedef {Msg} StartMsg
 */

module.exports = {
  /**
   * @type {msgTag} The tag for this type of message
   */
  TAG: "start",
  /**
   * Makes a message of this type
   * @returns {StartMsg} The created msg
   */
  make() {
    return {
      tag: this.TAG,
    };
  },
};
