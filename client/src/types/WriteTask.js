/**
 * @typedef {Object} WriteTask
 * @property {Genre} genre
 * @property {?string} lastLine
 */

module.exports = {
  /**
   * @param {Genre} genre
   * @returns {WriteTask}
   */
  newText(genre) {
    return { genre, lastLine: null };
  },

  /**
   * @param {Genre} genre
   * @param {string} lastLine
   * @returns {WriteTask}
   */
  continueText(genre, lastLine) {
    return { genre, lastLine };
  },
};
