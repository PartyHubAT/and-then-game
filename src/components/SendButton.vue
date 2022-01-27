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
  padding: var(--space-small);
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
    border-radius: 10px;
    font-size: 20px;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .send-button {
    margin-top: var(--space-large);
    border-radius: 10px;
    font-size: 20px;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .send-button {
    margin-left: var(--space-medium);
    margin-top: 0;
    border-radius: 10px;
    padding: var(--space-small) var(--space-medium);
  }
}
</style>
