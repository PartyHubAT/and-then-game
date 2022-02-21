const PlayerPhaseType = require("./PlayerPhaseType");

/**
 * @typedef {Object} PlayerPhase
 * @property {PlayerPhaseType} type
 */

/**
 * @typedef {PlayerPhase} WaitPhase
 * @property {WaitReason} reason
 */

/**
 * @typedef {PlayerPhase} WritePhase
 * @property {WriteTask} task
 */

module.exports = {
  /**
   * @param {WaitReason} reason
   * @returns {PlayerPhase}
   */
  wait(reason) {
    return { type: PlayerPhaseType.Wait, reason };
  },

  /**
   * @param {WriteTask} task
   * @returns {PlayerPhase}
   */
  write(task) {
    return { type: PlayerPhaseType.Write, task };
  },
};
