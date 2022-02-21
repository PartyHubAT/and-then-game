const Msg = require("./msg");

/**
 * Message for when a player should start a new text
 */
class NewTextMsg extends Msg {
  /**
   * The tag that identifies messages of this type
   * @type {string}
   */
  static TAG = "newText";

  /**
   * The texts genre
   * @type {Genre}
   */
  genre;

  /**
   * @param {Genre} genre The texts genre
   */
  constructor(genre) {
    super(NewTextMsg.TAG);
    this.genre = genre;
  }
}

module.exports = NewTextMsg;
