const Player = require("./player");

/**
 * All players that are currently playing
 */
class Group {
  /**
   * The groups players, indexed by their id
   * @type {Map<PlayerId, Player>}
   */
  #playersById = new Map();
  /**
   * The order of the players in this group
   * @type {PlayerId[]}
   */
  #playerOrder = [];

  /**
   * Creates a new group from player-info
   * @param {PlayerInfo[]} playerInfo Info about each player
   * @param {number} textCount The number of texts for the player
   * @param {?Genre} genre The texts genre or null for random genres
   */
  constructor(playerInfo, textCount, genre) {
    playerInfo.forEach((it) => {
      this.#playersById.set(it._id, Player.makeNewFrom(it, textCount, genre));
      this.#playerOrder.push(it._id);
    });
  }

  /**
   * @return {number} The number of players in this group
   */
  get playerCount() {
    return this.#playerOrder.length;
  }

  /**
   * Tries to get the index of a player
   * @param {PlayerId} playerId The players id
   * @return {?number} The players index or null if the player was not found
   */
  #tryGetPlayerIndex(playerId) {
    let index = this.#playerOrder.indexOf(playerId);
    return index !== -1 ? index : null;
  }

  /**
   * Tries to get a player by their index
   * @param {number} index The players index
   * @return {?Player} The player or null if not found
   */
  #tryGetPlayerByIndex(index) {
    let indexIsValid = index >= 0 && index < this.playerCount;
    let id = indexIsValid ? this.#playerOrder[index] : null;
    return id ? this.tryGetPlayer(id) : null;
  }

  /**
   * Tries to get a player in this group by their id
   * @param {PlayerId} playerId The players id
   * @return {?Player} The player or null if not found
   */
  tryGetPlayer(playerId) {
    return this.#playersById.get(playerId) || null;
  }

  /**
   * Tries to get the player after another one
   * @param {PlayerId} playerId The id of the first player
   * @return {?Player} The player after the given one or null if not found
   */
  tryGetNextPlayer(playerId) {
    let index = this.#tryGetPlayerIndex(playerId);
    let nextIndex = index
      ? index === this.playerCount - 1
        ? 0
        : index + 1
      : null;
    return nextIndex ? this.#tryGetPlayerByIndex(nextIndex) : null;
  }
}

module.exports = Group;
