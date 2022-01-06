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
  },
  defaultValues: {
    textsPerPlayer: 1,
  },
};
