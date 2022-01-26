<template>
  <textarea
    class="line-input"
    maxlength="128"
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
    padding: var(--space-small);
    border-radius: 10px;
    font-size: 15px;
  }

  .line-input::placeholder {
    font-size: 15px;
  }
}
</style>
