const Msg = require("./msg");

/**
 * Message for when a player should add a new line to an existing text
 */
class ContinueTextMsg extends Msg {
  /**
   * The tag that identifies messages of this type
   * @type {string}
   */
  static TAG = "continueText";

  /**
   * The last line that was written for this text
   * @type {string}
   */
  lastLine;

  constructor(lastLine) {
  /**
   * @param {string} lastLine The last line that was written for this text
   */
    super(ContinueTextMsg.TAG);
    this.lastLine = lastLine;
  }
}

module.exports = ContinueTextMsg;
