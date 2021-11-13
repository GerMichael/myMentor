<template>
  <router-link to="/" tag="a">
    <app-image srcValue="logo/myMentor_logo_big.svg" altValue="myMentor - Gemeinsam Lernen" />
  </router-link>
</template>

<script>
import Image from "./Image.vue";

export default {
  components: {
    appImage: Image
  }
};
</script>

<style scoped>
img {
  max-width: 220px;
}
</style>