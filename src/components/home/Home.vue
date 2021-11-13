<template>
  <div>
    <section>
      <app-matches />
    </section>
    <section>
      <app-requests />
    </section>
    <section>
      <app-mentorings />
    </section>
  </div>
</template>

<script>
import Matches from "./matches/Matches.vue";
import Requests from "./requests/Requests.vue";
import Mentorings from "./activeMentorings/Mentorings.vue";

export default {
  components: {
    /**
     * Display all matches incl. filter options
     */
    appMatches: Matches,
    /**
     * Display all active Requests from other users
     */
    appRequests: Requests,
    /**
     * Display all active Mentorings from user
     */
    appMentorings: Mentorings
  }
};
</script>

<style scoped>
section {
  margin-bottom: 75px;
}

section:last-child {
  margin-bottom: 25px;
}
</style>