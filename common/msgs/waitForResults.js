const Msg = require("./msg");

/**
 * Message for when the player should wait for results
 */
class WaitForResultsMsg extends Msg {
  /**
   * The tag that identifies messages of this type
   * @type {string}
   */
  static TAG = "waitForResults";

  constructor() {
    super(WaitForResultsMsg.TAG);
  }
}

module.exports = WaitForResultsMsg;
