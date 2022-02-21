const Msg = require("./msg");

/**
 * Message for when a result should be displayed to the players
 */
class ResultMsg extends Msg {
  /**
   * The tag that identifies messages of this type
   * @type {string}
   */
  static TAG = "result";

  /**
   * The result to show
   * @type {CompletedText}
   */
  text;

  /**
   * @param {CompletedText} text The result to show
   */
  constructor(text) {
    super(ResultMsg.TAG);
    this.text = text;
  }
}

module.exports = ResultMsg;
