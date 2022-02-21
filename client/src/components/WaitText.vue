<template>
  <span class="waitText"> {{ waitText }}</span>
</template>

<script>
import WaitReason from "../types/WaitReason";

export default {
  name: "WaitText",
  props: {
    reason: {
      type: Number,
      validator: (it) => WaitReason[it] !== undefined,
      required: true,
    },
  },
  computed: {
    waitText() {
      switch (this.reason) {
        case WaitReason.NO_TASK:
          return "Waiting for next text. 😴";
        case WaitReason.DONE:
          return "You're done. Waiting for the others. 🥳";
        default:
          throw new Error(`Invalid reason: ${this.reason}`);
      }
    },
  },
};
</script>

<style scoped>
.waitText {
  font-family: var(--font-content);
  color: white;
  text-align: center;
}
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .waitText {
    font-size: 20px;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .waitText {
    font-size: 40px;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .waitText {
    font-size: 40px;
  }
}
</style>
