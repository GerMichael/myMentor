<template>
  <header>
    <div id="headerBackground"></div>
    <div>
      <app-logo />
      <span>
        <app-image srcValue="icons/search.svg" altValue="Search Logo" />
        <span class="search">Suche</span>
      </span>
      <span>
        <app-image srcValue="icons/coins.svg" altValue="Credits" />
        <span class="credits">{{ $store.getters.getCredits }}</span>
      </span>
      <router-link to="/logout" tag="span">
        <a :class="{selected: getActiveStatus('logout')}">
          <app-image
            :srcValue="`icons/logout_${getActiveStatus('logout')?'orange':'black'}.svg`"
            altValue="logout"
          />
          <span>ausloggen</span>
        </a>
      </router-link>
    </div>
  </header>
</template>

<script>
import Image from "./parts/Image.vue";
import Logo from "./parts/Logo.vue";

export default {
  components: {
    appImage: Image,
    appLogo: Logo
  },
  methods: {
    /**
     * @param target: the destination link that the link points to
     * @return a boolean if the target equals the current router location
     */
    getActiveStatus(target) {
      if (target == "user") {
        return (
          this.$route.name == target && this.getUserId == this.$route.query.id
        );
      }
      return this.$route.name == target;
    }
  },
  computed: {
    /**
     * Compute User ID:
     * @return User ID that is stored in the store
     */
    getUserId: function() {
      return this.$store.getters.getId;
    }
  }
};
</script>

<style scoped>
#headerBackground {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 380px;
  background-color: var(--app-color-almost-white);
  z-index: -1;
}
div div:not(#headerBackground) {
  display: flex;
  justify-content: flex-end;
  padding: 15px 20px 20px 20px;
}
div div:not(#headerBackground) a {
  margin-right: auto;
}
div div:not(#headerBackground) span {
  margin-right: 30px;
}
div div:not(#headerBackground) span:last-child {
  margin-right: 5px;
}
div div:not(#headerBackground) span img {
  margin-right: 5px;
  width: 25px;
  height: auto;
}
.search {
  border-bottom: 1px solid var(--app-color-black);
  width: 100px;
  display: inline-block;
}
.credits,
a span {
  position: relative;
  top: 2px;
}
a {
  color: var(--app-color-black);
}
</style>