/**
 * Base-class for all messages that are sent between client and server
 */
class Msg {
  /**
   * The messages tag
   * @type {string}
   */
  tag;

  /**
   * @param {string} tag The messages tag
   */
  constructor(tag) {
    this.tag = tag;
  }
}

module.exports = Msg;
