/**
 * @readonly
 * @enum {number} The different reasons for why a player could be waiting
 */
const WaitReason = {
  /**
   * The player has not received their next writing-task
   */
  NO_TASK: 1,
  /**
   * The player is done for this game
   */
  DONE: 2,
};

module.exports = WaitReason;
