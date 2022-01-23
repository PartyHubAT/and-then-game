/**
 * @typedef {string} PlayerId
 */

/**
 * @callback EmitToAll
 * @param {string} eventName
 * @param {Object} data
 */

/**
 * @callback EmitToOne
 * @param {PlayerId} playerId
 * @param {string} eventName
 * @param {Object} data
 */

/**
 * @callback EndGame
 */

/**
 * @typedef {Object} Player
 * @property {PlayerId} _id
 * @property {string} name
 */

/**
 * @typedef {Object} Settings
 * @property {number} textsPerPlayer
 * @property {number} linesPerText
 */

/**
 * @callback StartGame
 */

/**
 * @callback SocketEvent
 * @param {PlayerId} playerId
 * @param {Object} data
 */

/**
 * @typedef {Object} GameServer
 * @property {StartGame} startGame
 * @property {Object.<string, SocketEvent>} events
 */
