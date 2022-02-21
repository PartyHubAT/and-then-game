<template>
  <textarea
    class="line-input"
    maxlength="128"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    @keydown.enter.prevent="$emit('submitText')"
    placeholder="Enter the first line..."
  />
</template>

<script>
export default {
  name: "TextInput",
  props: {
    modelValue: String,
  },
  emits: ["update:modelValue", "submitText"],
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
    white-space: nowrap;
    overflow-wrap: normal;
    overflow-y: hidden;
    overflow-x: scroll;
  }

  .line-input::placeholder {
    font-size: 20px;
  }

  .line-input::-webkit-scrollbar {
    height: 5px;
  }

  .line-input::-webkit-scrollbar-track {
    background: #00000000;
    border-radius: 2px;
  }

  .line-input::-webkit-scrollbar-thumb {
    background-color: var(--primary);
    border-radius: 2px;
    height: 100%;
  }

  .line-input {
    scrollbar-height: thin;
    scrollbar-color: var(--primary) #00000000;
  }
}
</style>
