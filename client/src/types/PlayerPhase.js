const PlayerPhaseType = require("./PlayerPhaseType");

/**
 * @typedef {Object} PlayerPhase
 * @property {PlayerPhaseType} type
 */

/**
 * @typedef {PlayerPhase} WaitPhase
 */

/**
 * @typedef {PlayerPhase} WritePhase
 * @property {WriteTask} task
 */

module.exports = {
  /**
   * @returns {PlayerPhase}
   */
  wait() {
    return { type: PlayerPhaseType.Wait };
  },

  /**
   * @param {WriteTask} task
   * @returns {PlayerPhase}
   */
  write(task) {
    return { type: PlayerPhaseType.Write, task };
  },
};
