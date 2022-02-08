module.exports = {
  /**
   * @template TValue, TKey
   * @callback KeyMapper
   * @param {TValue} value
   * @return {TKey}
   */

  /**
   * Creates a map from an array
   * @template TValue, TKey
   * @param {TValue[]} arr The array to convert to a map
   * @param {KeyMapper<TValue, TKey>} keyMap A function that creates a key for an element
   * @return {Map<TKey, TValue>} The created map
   */
  arrayToMap(arr, keyMap) {
    let map = new Map();

    arr.forEach((item) => map.set(keyMap(item), item));

    return map;
  },
};
