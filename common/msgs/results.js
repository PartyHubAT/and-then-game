const Msg = require("./msg");

/**
 * Message for when the games results should be displayed to the player
 */
class ResultsMsg extends Msg {
  /**
   * The tag that identifies messages of this type
   * @type {string}
   */
  static TAG = "results";

  /**
   * The lines of the written texts
   * @type {string[][]}
   */
  textLines;

  constructor(textLines) {
    super(ResultsMsg.TAG);
    this.textLines = textLines;
  }
}

module.exports = ResultsMsg;
