<template>
  <div>
    <h1>Aktive Mentorings</h1>
    <app-mentorings-list :mentorings="mentorings" />
  </div>
</template>

<script>
import MentoringsList from "./MentoringsList.vue";
import { matchBus } from "./../../../main";

export default {
  components: {
    /**
     * Mentorings List display all Mentorings
     */
    appMentoringsList: MentoringsList
  },
  data() {
    return {
      /**
       * The Lists of Mentorings that are displayed
       */
      mentorings: []
    };
  },
  methods: {
    /**
     * Load Mentorings from server
     */
    loadMentorings() {
      this.$store
        .dispatch("getMentorings")
        .then(response => {
          console.log(
            "[Mentorings]: Loaded mentorings successfully!",
            response.data.data
          );
          this.mentorings = response.data.data;
        })
        .catch(error => {
          console.log("[Mentorings]: Error on loading mentorings", error);
        });
    }
  },
  created() {
    /**
     * On Create load all mentorings
     */
    this.loadMentorings();
    matchBus.$on("updateMentorings", () => {
      this.loadMentorings();
    });
  },
  beforeDestroy() {
    matchBus.$off("updateMentorings");
  }
};
</script>

<style scoped>
h1 {
  margin-bottom: 35px;
  padding-left: 35px;
  font: var(--app-font-m-bold);
  color: var(--app-color-black);
  display: inline-block;
}
</style>