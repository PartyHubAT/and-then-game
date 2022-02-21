/**
 * Message for when a player should start a new text
 * @typedef {Msg} NewTextMsg
 * @property {Genre} genre The texts genre
 */

module.exports = {
  /**
   * @type {msgTag} The tag for this type of message
   */
  TAG: "newText",
  /**
   * Makes a message of this type
   * @param {Genre} genre The texts genre
   * @returns {NewTextMsg} The created msg
   */
  make(genre) {
    return {
      tag: this.TAG,
      genre,
    };
  },
};
