const Player = require("./server/Player");
const PlayerState = require("./server/PlayerState");
const CollectionUtil = require("./server/collectionUtil");

/**
 * @param {EmitToAll} emitToAll
 * @param {EmitToOne} emitToOne
 * @param {EndGame} endGame
 * @param {PlayerInfo[]} playerInfo
 * @param {Settings} settings
 * @return {GameServer}
 */
function initServerLogic(emitToAll, emitToOne, endGame, playerInfo, settings) {
  let totalTextsCount = settings.textsPerPlayer * playerInfo.length;
  let linesPerPlayer = settings.textsPerPlayer * settings.linesPerText;
  /**
   * The completed texts
   * @type {Text[]}
   */
  let doneTexts = [];
  /**
   * The players in this game
   * @type {Map<PlayerId,Player>}
   */
  let players = CollectionUtil.arrayToMap(
    playerInfo.map((info, index) => {
      let nextIndex = index === playerInfo.length - 1 ? 0 : index + 1;
      let nextPlayerId = playerInfo[nextIndex]._id;
      return Player.makeNewFrom(info, settings.textsPerPlayer, nextPlayerId);
    }),
    (player) => player.id
  );

  /**
   * Sends a prompt to a specific player
   * @param {PlayerId} playerId The id of the player
   * @param {Prompt} prompt The prompt to send
   */
  function sendPrompt(playerId, prompt) {
    emitToOne(playerId, "receivePrompt", prompt);
  }

  /**
   * Attempts to send the next prompt to a player
   * @param {PlayerId} playerId The id of the player to send the prompt to
   */
  function trySendPlayerPrompt(playerId) {
    let player = players.get(playerId);
    let prompt = player.tryGetNextPrompt();
    if (prompt) {
      sendPrompt(playerId, prompt);
      player.state = PlayerState.WRITING;
    }
  }

  /**
   * Gets the next player that should write on a text
   * @param {Text} text The text that should be worked on
   * @return {PlayerId} The id of the player that should work on the text next
   */
  function getNextPlayerForText(text) {
    return players.get(text.lastPlayer).nextPlayerId;
  }

  /**
   * Adds a text to a player
   * @param {Text} text The text to add
   * @param {PlayerId} playerId The id of the player to add the text to
   */
  function addTextToPlayer(text, playerId) {
    let player = players.get(playerId);
    player.addText(text);

    if (player.state === PlayerState.WAITING) trySendPlayerPrompt(playerId);
  }

  /**
   * Sends the games results to all players
   */
  function sendResults() {
    /**
     * @type {GameResults}
     */
    let results = { texts: doneTexts.map((it) => it.lines) }
    emitToAll("gameDone", results);
  }

  /**
   * Continues a text
   * @param {PlayerId} playerId The id of the player who currently has the text
   * @param {string} line The line to add to the text
   */
  function continueText(playerId, line) {
    let player = players.get(playerId);
    let text = player.tryPopTopText();
    if (text) {
      text.addLine(line);

      if (text.lineCount === settings.linesPerText) {
        doneTexts.push(text);
      } else {
        let nextPlayerId = getNextPlayerForText(text);
        addTextToPlayer(text, nextPlayerId);
      }
    }

    if (doneTexts.length === totalTextsCount) {
      sendResults();
    }
  }

  /**
   * Continues the game for a player
   * @param {PlayerId} playerId The id of the player to continue
   */
  function continuePlayer(playerId) {
    let player = players.get(playerId);
    if (player.hasText) trySendPlayerPrompt(playerId);
    else player.state = PlayerState.WAITING;
  }

  return {
    startGame() {
      emitToAll("start", {});
    },
    events: {
      /**
       * Called when a player requests a new prompt
       * @param {PlayerId} playerId The id of the player that requested a prompt
       */
      requestPrompt(playerId) {
        trySendPlayerPrompt(playerId);
      },
      /**
       * Called when a player completes a line
       * @param {PlayerId} playerId The id of the player that completed the line
       * @param {LineDoneData} data Data about the completed line
       */
      lineDone(playerId, data) {
        continueText(playerId, data.line);
        continuePlayer(playerId);
      }
    }
  };
}

module.exports = initServerLogic;
