/**
 * Message for when the player should wait for results
 * @typedef {Msg} WaitForResultsMsg
 */

module.exports = {
  /**
   * @type {msgTag} The tag for this type of message
   */
  TAG: "waitForResults",
  /**
   * Makes a message of this type
   * @returns {WaitForResultsMsg} The created msg
   */
  make() {
    return {
      tag: this.TAG,
    };
  },
};
