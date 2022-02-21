const Msg = require("./msg");

class NextResultMsg extends Msg {
  /**
   * The tag that identifies messages of this type
   * @type {string}
   */
  static TAG = "nextResult";

  constructor() {
    super(NextResultMsg.TAG);
  }
}

module.exports = NextResultMsg;
