/**
 * Message for when a player requests the next text to write on
 * @typedef {Msg} RequestLineMsg
 */

module.exports = {
  /**
   * @type {msgTag} The tag for this type of message
   */
  TAG: "requestLine",
  /**
   * Makes a message of this type
   * @returns {RequestLineMsg} The created msg
   */
  make() {
    return {
      tag: this.TAG,
    };
  },
};
