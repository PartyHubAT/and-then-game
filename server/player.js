const TextQueue = require("./textQueue");

/**
 * A user playing the game
 */
class Player {
  /**
   * The players id
   * @type {PlayerId}
   */
  #id = "";
  /**
   * The players name
   * @type {string}
   */
  #name = "";
  /**
   * The id of the player after this one
   * @type {PlayerId}
   */
  #nextPlayerId;
  /**
   * The texts the player needs to write
   * @type {TextQueue}
   */
  #todoTexts = null;
  /**
   * The state the player is currently in
   * @type {PlayerState}
   */
  #state;

  /**
   * @param {PlayerId} id The players id
   * @param {string} name The players name
   * @param {PlayerId} nextPlayerId The id of the player after this one
   * @param {TextQueue} todoTexts The texts the player needs to write
   */
  constructor(id, name, nextPlayerId, todoTexts) {
    this.#id = id;
    this.#name = name;
    this.#nextPlayerId = nextPlayerId;
    this.#todoTexts = todoTexts;
  }

  /**
   * Makes a new player from the given info
   * @param {PlayerInfo} info The info to create the player from
   * @param {number} textCount The number of texts for the player
   * @param {PlayerId} nextPlayerId The id of the player after this one
   * @param {?Genre} genre The texts genre or null for random genres
   * @return {Player} The created player
   */
  static makeNewFrom(info, textCount, nextPlayerId, genre) {
    return new Player(
      info._id,
      info.name,
      nextPlayerId,
      TextQueue.ofCount(textCount, info._id, genre)
    );
  }

  /**
   * Gets the players id
   * @return {PlayerId} The players id
   */
  get id() {
    return this.#id;
  }

  /**
   * Gets the id of the player after this one
   * @return {PlayerId} The id
   */
  get nextPlayerId() {
    return this.#nextPlayerId;
  }

  /**
   * Checks if this player has a text to work on
   * @return {boolean} Whether the player has a text to work on
   */
  get hasText() {
    return !this.#todoTexts.isEmpty;
  }

  /**
   * Gets the players current state
   * @return {PlayerState} The state
   */
  get state() {
    return this.#state;
  }

  /**
   * Sets the players current state
   * @param{PlayerState} state The state
   */
  set state(state) {
    this.#state = state;
  }

  /**
   * Tries to get the players current text
   * @return {?Text} The text or null if the player has none
   */
  tryGetCurrentText() {
    return this.#todoTexts.tryPeek();
  }

  /**
   * Tries to get the top text this player is working on and removes it
   * @return {?Text} The text or null if the player has none
   */
  tryPopTopText() {
    return this.#todoTexts.tryPop();
  }

  /**
   * Adds a text for this player to work on
   * @param {Text} text The text to add
   */
  addText(text) {
    this.#todoTexts.append(text);
    text.lastPlayer = this.id;
  }
}

module.exports = Player;
