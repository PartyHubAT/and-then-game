module.exports = {
  form: {
    textsPerPlayer: {
      type: Number,
      displayName: "Texts per player",
      label: "How many texts will each player write?",
      min: 1,
      max: 10,
      required: true,
    },
    linesPerText: {
      type: Number,
      displayName: "Lines per text",
      label: "How many lines should each text have?",
      min: 2,
      max: 10,
      required: true,
    },
  },
  /**
   * @type {Settings}
   */
  defaultValues: {
    textsPerPlayer: 1,
    linesPerText: 3
  },
};
