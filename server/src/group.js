﻿const Player = require("./player");

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
   */
  constructor(playerInfo) {
    playerInfo.forEach((it) => {
      this.#playersById.set(it._id, new Player(it));
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
   * @return {Player[]} The groups players
   */
  get players() {
    return Array.from(this.#playersById.values());
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
   * Gets the next index
   * @param {number} index The current index
   * @return {number} The next index
   */
  #getNextIndex(index) {
    return index === this.playerCount - 1 ? 0 : index + 1;
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
    let nextIndex = index !== null ? this.#getNextIndex(index) : null;
    return nextIndex !== null ? this.#tryGetPlayerByIndex(nextIndex) : null;
  }

  /**
   * Checks whether a player is host or not
   * @param {PlayerId} playerId The players id
   * @returns {boolean} Whether the player is host
   */
  playerIsHost(playerId) {
    return this.#tryGetPlayerIndex(playerId) === 0;
  }
}

module.exports = Group;
