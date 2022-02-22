const PlayerState = require("./playerState");
const Text = require("./text");
const Send = require("./send");
const Group = require("./group");
const Genre = require("game-and-then-common/src/genre");
const ContinueTextMsg = require("game-and-then-common/src/msgs/continueText");
const NewTextMsg = require("game-and-then-common/src/msgs/newText");
const ResultMsg = require("game-and-then-common/src/msgs/result");
const WaitForResultsMsg = require("game-and-then-common/src/msgs/waitForResults");
const StartMsg = require("game-and-then-common/src/msgs/start");
const RequestLineMsg = require("game-and-then-common/src/msgs/requestLine");
const LineDoneMsg = require("game-and-then-common/src/msgs/lineDone");
const NextResultMsg = require("game-and-then-common/src/msgs/nextResult");
const EndMsg = require("game-and-then-common/src/msgs/end");

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
  let linesPerPlayer = settings.textsPerPlayer * settings.linesPerText;
  let resultIndex = 0;

  /**
   * The completed texts
   * @type {CompletedText[]}
   */
  const completedTexts = [];
  /**
   * The group playing this game
   * @type {Group}
   */
  const group = new Group(playerInfo);

  /**
   * Initializes the games texts
   */
  (function createTexts() {
    /**
     * @type {?Genre}
     */
    const genre = settings.genre === "Random" ? null : settings.genre;
    /**
     * All existing  genres
     * @type {Genre[]}
     */
    const allGenres = Object.keys(Genre).map((it) => Genre[it]);

    /**
     * Gets a random genre
     * @return {Genre} A random genre
     */
    function getRandomGenre() {
      return allGenres[Math.floor(Math.random() * allGenres.length)];
    }

    group.players.forEach((player) => {
      for (let i = 0; i < settings.textsPerPlayer; i++) {
        let text = new Text(player.id, genre ?? getRandomGenre());
        player.addText(text);
      }
    });
  })();

  /**
   * Sends a message to the player to either start a new text or continue the last one
   * @param {PlayerId} playerId The id of the player to send the message to
   */
  function sendNextLineMsgToPlayer(playerId) {
    let player = group.tryGetPlayer(playerId);
    if (player !== null) {
      let text = player.tryGetCurrentText();
      if (text !== null) {
        let lastLine = text.lastLine;
        let msg = lastLine
          ? ContinueTextMsg.make(lastLine, text.genre)
          : NewTextMsg.make(text.genre);
        send.to(playerId, msg);
        player.state = PlayerState.WRITING;
      } else
        throw new Error(
          `Cannot send line-msg because player "${playerId}" had no text on them!`
        );
    } else
      throw new Error(`Cannot send line-msg to missing player "${playerId}"!`);
  }

  /**
   * Gets the next player that should write on a text
   * @param {Text} text The text that should be worked on
   * @return {?PlayerId} The id of the player that should work on the text next or null if not found
   */
  function tryGetNextPlayerForText(text) {
    return group.tryGetNextPlayer(text.lastPlayer)?.id ?? null;
  }

  /**
   * Adds a text to a player
   * @param {Text} text The text to add
   * @param {PlayerId} playerId The id of the player to add the text to
   */
  function addTextToPlayer(text, playerId) {
    let player = group.tryGetPlayer(playerId);

    if (player !== null) {
      player.addText(text);
      if (player.state === PlayerState.WAITING)
        sendNextLineMsgToPlayer(playerId);
    } else throw new Error(`Cannot add text to missing player "${playerId}"!`);
  }

  /**
   * Sends the games results to all players
   */
  function sendLatestResult() {
    let msg = ResultMsg.make(
      completedTexts[resultIndex],
      resultIndex === completedTexts.length - 1
    );
    send.toAll(msg);
  }

  /**
   * Continues a text
   * @param {PlayerId} playerId The id of the player who currently has the text
   * @param {string} line The line to add to the text
   */
  function continueText(playerId, line) {
    let player = group.tryGetPlayer(playerId);

    if (player !== null) {
      let text = player.tryPopTopText();
      if (text) {
        text.addLine(line);

        if (text.lineCount === settings.linesPerText) {
          completedTexts.push({
            genre: text.genre,
            lines: text.lines,
          });
        } else {
          let nextPlayerId = tryGetNextPlayerForText(text);
          addTextToPlayer(text, nextPlayerId);
        }
      } else
        throw new Error(
          `Could not add line to missing text on player "${playerId}"!`
        );
    } else
      throw new Error(
        `Could not continue text on missing player "${playerId}"!`
      );
  }

  /**
   * Continues the game for a player
   * @param {PlayerId} playerId The id of the player to continue
   */
  function continuePlayer(playerId) {
    let player = group.tryGetPlayer(playerId);
    if (player !== null) {
      if (player.hasText) sendNextLineMsgToPlayer(playerId);
      else if (player.writtenLineCount === linesPerPlayer) {
        player.state = PlayerState.DONE;
        send.to(playerId, WaitForResultsMsg.make());
      } else player.state = PlayerState.WAITING;
    } else throw new Error(`Could not continue missing player "${playerId}"!`);
  }

  return {
    startGame() {
      group.players.forEach((player) => {
        let isHost = group.playerIsHost(player.id);
        send.to(player.id, StartMsg.make(isHost));
      });
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
        if (completedTexts.length === totalTextsCount) {
          sendLatestResult();
        }
      },

      /**
       * Handles the message for when a requests the next result
       * @param {PlayerId} playerId The id of the player that requested the result
       */
      [NextResultMsg.TAG]: function (playerId) {
        if (group.playerIsHost(playerId)) {
          resultIndex++;
          sendLatestResult();
        }
      },

      /**
       * Handles the message for when a player requests to end the game
       * @param {PlayerId} playerId The id of the player that sent the request
       */
      [EndMsg.TAG]: function (playerId) {
        if (group.playerIsHost(playerId)) endGame();
      },
    },
  };
}

module.exports = initServerLogic;
