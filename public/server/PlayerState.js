/**
 * The different states a player can be in
 * @readonly
 * @enum {number}
 */
const PlayerState = {
  /**
   * The player is writing a text
   */
  WRITING: 0,
  /**
   * The player is waiting for a text
   */
  WAITING: 1,
  /**
   * The player is done for this game
   */
  DONE: 2,
};

module.exports = PlayerState
