import Msg from "./msg";

/**
 * Message for when the game starts
 */
class StartMsg extends Msg {
  /**
   * The tag that identifies messages of this type
   * @type {string}
   */
  static TAG = "start";

  constructor() {
    super(StartMsg.TAG);
  }
}

module.exports = StartMsg;
