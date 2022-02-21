const Msg = require("./msg");

/**
 * Message for when a player requests the next text to write on
 */
class RequestLineMsg extends Msg {
  /**
   * The tag that identifies messages of this type
   * @type {string}
   */
  static TAG = "requestLine";

  constructor() {
    super(RequestLineMsg.TAG);
  }
}

module.exports = RequestLineMsg;
