﻿/**
 * A queue of texts a player needs to work on
 */
class TextQueue {
  /**
   * The texts in the queue
   * @type {Text[]}
   */
  #texts;

  constructor() {
    this.#texts = [];
  }

  /**
   * Checks if this queue is empty
   * @return {boolean} Whether the queue is empty or not
   */
  get isEmpty() {
    return this.#texts.length === 0;
  }

  /**
   * Tries to get the first element in the queue without removing it
   * @return {?Text} The first element or null if the queue is empty
   */
  tryPeek() {
    if (this.isEmpty) return null;
    return this.#texts[0];
  }

  /**
   * Tries to get the first element in the queue and removes it
   * @return {?Text} The first element or null if the queue is empty
   */
  tryPop() {
    if (this.isEmpty) return null;
    return this.#texts.shift();
  }

  /**
   * Appends a text to the queue
   * @param {Text} text The text to append
   */
  append(text) {
    this.#texts.push(text);
  }
}

module.exports = TextQueue;
