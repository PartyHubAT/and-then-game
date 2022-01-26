<template>
  <button class="send-button" :disabled="!canSend">Send</button>
</template>

<script>
export default {
  name: "SendButton",
  props: {
    canSend: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.send-button {
  background-color: var(--primary);
  border: 0;
  font-family: var(--font-content);
  color: var(--on-primary);
}

.send-button:hover {
  background-color: var(--primary-light);
}

.send-button:disabled {
  background-color: var(--primary-disabled);
}

.send-button:active {
  background-color: var(--primary-dark);
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .send-button {
    margin-top: var(--space-large);
    padding: var(--space-medium);
    border-radius: 10px;
    font-size: 20px;
  }
}
</style>
