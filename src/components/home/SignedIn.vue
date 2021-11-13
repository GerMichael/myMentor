<template>
  <div>
    <main>
      <cookie-law position="bottom">
        <div slot-scope="props" class="cookie_container">
          <p>Das ist eine Testseite zu Veranschaulichkeitszwecken in der Lehre. Sie verwendet 🍪 zur Identifikation der User.</p>
          <app-button class="skew" @click="props.accept">Got it!</app-button>
        </div>
      </cookie-law>
      <app-nav-bar />
      <article>
        <router-view :key="JSON.stringify(getCurrentState)" />
      </article>
    </main>
    <app-footer />
  </div>
</template>

<script>
import Footer from "../shared/Footer.vue";
import NavigatioBar from "./NavigationBar.vue";
import Button from "./../shared/parts/Button.vue";
import CookieLaw from "vue-cookie-law";

export default {
  components: {
    /**
     * Main Footer
     */
    appFooter: Footer,
    /**
     * Navigation Bar
     */
    appNavBar: NavigatioBar,
    /**
     * Displaying the cookie message
     */
    CookieLaw,
    /**
     * Button
     */
    appButton: Button
  },
  computed: {
    /**
     * @return the current state of myMentor session according to
     *  - the path
     *  - the query of the URL
     *  - the user that is currently signed in
     * -> Prevent that cached components of other user were used
     */
    getCurrentState: function() {
      return {
        path: this.$route.path,
        query: this.$route.query,
        user: this.$store.getters.getCurrentUser
      };
    }
  },
  beforeCreate() {
    /**
     * User Data gets check in routes.js before entering this signedIn Component.
     * If data is not available go to login and update data else continue
     */
  }
};
</script>

<style scoped>
main {
  display: grid;
  grid-template-columns: auto 200px;
}
article {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}
.cookie_container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cookie_container p {
  text-align: center;
  margin-bottom: 10px;
}
</style>