<template>
  <textarea
    class="line-input"
    maxlength="256"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    placeholder="Enter the first line..."
  />
</template>

<script>
export default {
  name: "TextInput",
  props: {
    modelValue: String,
  },
  emits: ["update:modelValue"],
};
</script>

<style scoped>
.line-input {
  border: 0;
  color: var(--primary);
  font-family: var(--font-content);
  padding: var(--space-small);
  outline: none;
  resize: none;
}

.line-input::placeholder {
  color: var(--primary-light);
  font-family: var(--font-content);
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .line-input {
    border-radius: 10px;
    font-size: 15px;
    height: 150px;
  }

  .line-input::placeholder {
    font-size: 15px;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .line-input {
    border-radius: 15px;
    font-size: 20px;
    height: 175px;
  }

  .line-input::placeholder {
    font-size: 20px;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .line-input {
    border-radius: 15px;
    font-size: 20px;
    height: 40px;
    white-space: pre;
    overflow-wrap: normal;
    overflow-x: scroll;
  }

  .line-input::placeholder {
    font-size: 20px;
  }
}
</style>
