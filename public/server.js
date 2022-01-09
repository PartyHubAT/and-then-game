﻿module.exports = (emitToAll, emitToOne, endGame, players, settings) => {
  const playerGameData = new Map();

  /**
   * Gets the index of a player
   * @param {string} playerId The id of the player
   * @returns {number} The players index
   */
  function getPlayerIndex(playerId) {
    return players.findIndex((player) => player._id === playerId);
  }

  /**
   * Makes a text that will be worked on in this game
   * @param {number} startPlayerIndex The index of the player that will start this text
   * @returns {any} The text
   */
  function makeText(startPlayerIndex) {
    return [];
  }

  /**
   * Adds a new line to the text
   * @param {any} text The text
   * @param {string} line The new line
   */
  function addLine(text, line) {
    text.push(line);
  }

  /**
   * Adds a text to a players writing-queue
   * @param {string} playerId The id of the player
   * @param {any} text The text to add
   */
  function addTextToPlayer(playerId, text) {
    const data = playerGameData.get(playerId);
    data.texts.push(text);
  }

  /**
   * Removes and returns the current text of a player
   * @param {string} playerId The id of the player
   * @return {any} The text
   */
  function removeCurrentTextFromPlayer(playerId) {
    const gameData = playerGameData.get(playerId);
    return gameData.texts.shift();
  }

  /**
   * Gets the last in a text
   * @param {any} text The text
   * @returns {string} The last line
   */
  function getLastLine(text) {
    return text.lastItem || "";
  }

  /**
   * Sends the next text to the specified player
   * @param {string} playerId The players id
   */
  function sendNextTextToPlayer(playerId) {
    const gameData = playerGameData.get(playerId);
    const nextText = gameData.texts[0];
    const lastLine = getLastLine(nextText);

    emitToOne(playerId, "nextText", { lastLine });
  }

  /**
   * Passes on the current text of the player to another player
   * @param {string} playerId The id of the player
   */
  function passOnCurrentText(playerId) {
    const index = getPlayerIndex(playerId);
    const nextIndex = index < players.length - 1 ? index + 1 : 0;
    const text = removeCurrentTextFromPlayer(playerId);
    addTextToPlayer(players[nextIndex]._id, text);
  }

  /**
   * Progresses the current text of the player
   * @param {string} playerId The id of the player
   * @param {string} newLine The new line to be added to the text
   */
  function progressTextByPlayer(playerId, newLine) {
    const gameData = playerGameData.get(playerId);
    addLine(gameData.texts[0], newLine);
  }

  /**
   * Initializes the game-data
   */
  (function init() {
    players.forEach((player, index) => {
      playerGameData.set(player._id, { texts: [] });

      for (let i = 0; i < settings.textsPerPlayer; i++)
        addTextToPlayer(player._id, makeText(index));
    });
  })();

  return {
    startGame() {
      players.forEach((player) => sendNextTextToPlayer(player._id));
    },
    events: {
      lineDone(playerId, data) {
        const { line } = data;
        progressTextByPlayer(playerId, line);
        passOnCurrentText(playerId);
      },
    },
  };
};
