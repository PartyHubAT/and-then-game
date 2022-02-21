/**
 * Utility-class for sending messages to players
 */
class Send {
  /**
   * Function for emitting to a specific player
   * @type {EmitToOne}
   */
  #emitToOne;
  /**
   * Function for emitting to all players
   * @type {EmitToAll}
   */
  #emitToAll;

  /**
   *
   * @param {EmitToOne} emitToOne Function for emitting to a specific player
   * @param {EmitToAll} emitToAll Function for emitting to all players
   */
  constructor(emitToOne, emitToAll) {
    this.#emitToOne = emitToOne;
    this.#emitToAll = emitToAll;
  }

  /**
   * Sends a message to a specific player
   * @param {PlayerId} playerId The id of the player
   * @param {Msg} msg The message to send
   */
  to(playerId, msg) {
    this.#emitToOne(playerId, msg.tag, msg);
  }

  /**
   * Sends a message to al players
   * @param {Msg} msg The message to send
   */
  toAll(msg) {
    this.#emitToAll(msg.tag, msg);
  }
}

module.exports = Send;
