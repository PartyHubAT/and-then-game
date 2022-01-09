module.exports = (emitToAll, emitToOne, endGame, players, settings) => {
  const playerGameData = new Map();

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
   * Adds a text to a players writing-queue
   * @param {string} playerId The id of the player
   * @param {any} text The text to add
   */
  function addTextToPlayer(playerId, text) {
    const data = playerGameData.get(playerId);
    data.texts.push(text);
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
    events: {},
  };
};
