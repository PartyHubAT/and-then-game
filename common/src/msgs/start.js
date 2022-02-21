/**
 * Message for when the game starts
 * @typedef {Msg} StartMsg
 * @property {boolean} playerIsHost Whether the player that received this message is host
 */

module.exports = {
  /**
   * @type {msgTag} The tag for this type of message
   */
  TAG: "start",
  /**
   * Makes a message of this type
   * @param {boolean} playerIsHost Whether the player that received this message is host
   * @returns {StartMsg} The created msg
   */
  make(playerIsHost) {
    return {
      tag: this.TAG,
      playerIsHost,
    };
  },
};
