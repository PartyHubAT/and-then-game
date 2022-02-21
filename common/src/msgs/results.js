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
   * The completed texts
   * @type {CompletedText[]}
   */
  texts;

  /**
   * @param {CompletedText[]} texts The completed texts
   */
  constructor(texts) {
    super(ResultsMsg.TAG);
    this.texts = texts;
  }
}

module.exports = ResultsMsg;
