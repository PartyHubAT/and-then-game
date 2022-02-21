<template>
  <span class="waitText">Wait for next text. 😴</span>
</template>

<script>
export default {
  name: "WaitText",
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
