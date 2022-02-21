const Msg = require("./msg");

/**
 * Message for when a player has completed a line
 */
class LineDoneMsg extends Msg {
  /**
   * The tag that identifies messages of this type
   * @type {string}
   */
  static TAG = "lineDone";

  /**
   * The line that was written
   * @type {string}
   */
  line;

  /**
   * @param {string} line The line that was written
   */
  constructor(line) {
    super(LineDoneMsg.TAG);
    this.line = line;
  }
}

module.exports = LineDoneMsg;
