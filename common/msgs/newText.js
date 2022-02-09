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

  constructor() {
    super(NewTextMsg.TAG);
  }
}

module.exports = NewTextMsg;
