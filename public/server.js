module.exports = (emitToAll, emitToOne, endGame, players, settings) => {
  const playerGameData = new Map();
  const doneTexts = [];

  function gameIsDone() {
    return doneTexts.length === settings.textsPerPlayer * players.length;
  }

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
   * Checks if a text is done
   * @param {any} text The text
   * @return {boolean} Whether it is one or not
   */
  function isDone(text) {
    return text.length === settings.linesPerText;
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
    const gameData = playerGameData.get(playerId);
    gameData.texts.push(text);

    if (gameData.waiting) sendNextTextToPlayer(playerId);
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
   * Checks if the players current text is done
   * @param {string} playerId The players id
   * @return {boolean} Whether the players current text is done
   */
  function currentTextIsDone(playerId) {
    const gameData = playerGameData.get(playerId);
    return isDone(gameData.texts[0]);
  }

  /**
   * Gets the last in a text
   * @param {any} text The text
   * @returns {string} The last line
   */
  function getLastLine(text) {
    return text[text.length - 1] || "";
  }

  /**
   * Checks if a player has a text to write
   * @param {string} playerId The id of the player
   * @return {boolean} Whether the player has a text
   */
  function hasText(playerId) {
    const gameData = playerGameData.get(playerId);
    return gameData.texts.length > 0;
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
    gameData.waiting = false;
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
    gameData.waiting = true;
    addLine(gameData.texts[0], newLine);
  }

  /**
   * Removes the current text from the player and adds it to the completed texts
   * @param {string} playerId The id of the player
   */
  function completeCurrentText(playerId) {
    const text = removeCurrentTextFromPlayer(playerId);
    doneTexts.push(text);
  }

  /**
   * Completes the game
   */
  function completeGame() {
    emitToAll("gameDone", { texts: doneTexts });
  }

  /**
   * Initializes the game-data
   */
  (function init() {
    players.forEach((player) => {
      playerGameData.set(player._id, { texts: [], waiting: true });
    });
  })();

  return {
    startGame() {
      players.forEach((player, index) => {
        for (let i = 0; i < settings.textsPerPlayer; i++)
          addTextToPlayer(player._id, makeText(index));
      });
    },
    events: {
      lineDone(playerId, data) {
        const { line } = data;
        progressTextByPlayer(playerId, line);
        if (currentTextIsDone(playerId)) completeCurrentText(playerId);
        else passOnCurrentText(playerId);
        if (hasText(playerId)) sendNextTextToPlayer(playerId);
        else if (gameIsDone()) {
          completeGame();
        }
      },
    },
  };
};
