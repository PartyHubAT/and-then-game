/**
 * Message for when the next result should be sent to players
 * @typedef {Msg} NextResultMsg
 */

module.exports = {
  /**
   * @type {msgTag} The tag for this type of message
   */
  TAG: "nextResult",
  /**
   * Makes a message of this type
   * @returns {NextResultMsg} The created msg
   */
  make() {
    return {
      tag: this.TAG,
    };
  },
};
