const Player = require("./Player");
const PlayerState = require("./PlayerState");
const CollectionUtil = require("./collectionUtil");
const ContinueTextMsg = require("../common/msgs/continueText");
const NewTextMsg = require("../common/msgs/newText");
const StartMsg = require("../common/msgs/start");
const RequestLineMsg = require("../common/msgs/requestLine");
const LineDoneMsg = require("../common/msgs/lineDone");
const ResultsMsg = require("../common/msgs/results");
const Send = require("./send");

/**
 * @param {EmitToAll} emitToAll
 * @param {EmitToOne} emitToOne
 * @param {EndGame} endGame
 * @param {PlayerInfo[]} playerInfo
 * @param {Settings} settings
 * @return {GameServer}
 */
function initServerLogic(emitToAll, emitToOne, endGame, playerInfo, settings) {
  let send = new Send(emitToOne, emitToAll);

  let totalTextsCount = settings.textsPerPlayer * playerInfo.length;
  /**
   * @type {?Genre}
   */
  let genre = settings.genre === "Random" ? null : settings.genre;
  /**
   * The completed texts
   * @type {CompletedText[]}
   */
  let completedTexts = [];
  /**
   * The players in this game
   * @type {Map<PlayerId,Player>}
   */
  let players = CollectionUtil.arrayToMap(
    playerInfo.map((info, index) => {
      let nextIndex = index === playerInfo.length - 1 ? 0 : index + 1;
      let nextPlayerId = playerInfo[nextIndex]._id;
      return Player.makeNewFrom(
        info,
        settings.textsPerPlayer,
        nextPlayerId,
        genre
      );
    }),
    (player) => player.id
  );

  /**
   * Sends a message to the player to either start a new text or continue the last one
   * @param {PlayerId} playerId The id of the player to send the message to
   */
  function sendNextLineMsgToPlayer(playerId) {
    let player = players.get(playerId);
    let text = player.tryGetCurrentText();
    if (text) {
      let lastLine = text.lastLine;
      let msg = lastLine
        ? new ContinueTextMsg(lastLine, text.genre)
        : new NewTextMsg(text.genre);
      send.to(playerId, msg);
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

    if (player.state === PlayerState.WAITING) sendNextLineMsgToPlayer(playerId);
  }

  /**
   * Sends the games results to all players
   */
  function sendResults() {
    let msg = new ResultsMsg(completedTexts);
    send.toAll(msg);
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
        completedTexts.push({
          genre: text.genre,
          lines: text.lines,
        });
      } else {
        let nextPlayerId = getNextPlayerForText(text);
        addTextToPlayer(text, nextPlayerId);
      }
    }

    if (completedTexts.length === totalTextsCount) {
      sendResults();
    }
  }

  /**
   * Continues the game for a player
   * @param {PlayerId} playerId The id of the player to continue
   */
  function continuePlayer(playerId) {
    let player = players.get(playerId);
    if (player.hasText) sendNextLineMsgToPlayer(playerId);
    else player.state = PlayerState.WAITING;
  }

  return {
    startGame() {
      send.toAll(new StartMsg());
    },
    events: {
      /**
       * Handles the message for when a player requests the next line
       * @param {PlayerId} playerId The id of the player that send the message
       */
      [RequestLineMsg.TAG]: function (playerId) {
        sendNextLineMsgToPlayer(playerId);
      },

      /**
       * Handles the message for when a player completes a line
       * @param {PlayerId} playerId The id of the player that completed the line
       * @param {LineDoneMsg} msg The message
       */
      [LineDoneMsg.TAG]: function (playerId, msg) {
        continueText(playerId, msg.line);
        continuePlayer(playerId);
      },
    },
  };
}

module.exports = initServerLogic;
