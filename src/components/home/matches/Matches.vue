<template>
  <div class="matches_container">
    <h1>Matches</h1>
    <app-filter
      :list="getAvailableMatches"
      v-model="selectedSkill"
      :allObject="{ other_skill: { name: 'all' } }"
      :compareFunction="(el) => {
                    return el.other_skill.name;
                }"
    />
    <app-matches-list :matches="filteredMatches" />
  </div>
</template>

<script>
import MatchesList from "./MatchesList.vue";
import Filter from "./../../shared/parts/Filter.vue";
import { matchBus } from "./../../../main";

export default {
  components: {
    /**
     * Filter Categories (Fields)
     */
    appFilter: Filter,
    /**
     * Display all Matches
     */
    appMatchesList: MatchesList
  },
  data() {
    return {
      /**
       * Current Selected Skill to filter the matches
       */
      selectedSkill: "all",
      /**
       * All Matches that get displayed
       */
      matches: []
    };
  },
  computed: {
    /**
     * Filter the matches to fit the filter
     * @return filtered matches
     */
    filteredMatches: function() {
      var result = [];
      var matchesAvailable = this.getAvailableMatches;
      matchesAvailable.forEach(match => {
        if (
          (this.selectedSkill == "all" ||
            match.other_skill.name == this.selectedSkill) &&
          !match.self_accepted
        ) {
          result.push(match);
        }
      });
      return result;
    },
    /**
     * Returns the all cleaned matches
     * @return cleaned Matches
     */
    getAvailableMatches: function() {
      var cleanedMatches = this.cleanMatches(this.matches);
      var availableMatches = [];
      for (var match of cleanedMatches) {
        if (!match.self_accepted) {
          availableMatches.push(match);
        }
      }
      return availableMatches;
    }
  },
  methods: {
    /**
     * Load Matches from Server
     */
    loadMatches() {
      this.$store
        .dispatch("getMatches")
        .then(result => {
          console.log("[Matches]: Loaded Matches successfully!");
          this.matches = result.data.data;
        })
        .catch(error => {
          console.log("[Matches]: Error on loading Matches", error);
        });
    },
    /**
     * Update the matches
     */
    updateMatches() {
      //Update Matches
    },
    /**
     * Clean Matches
     */
    cleanMatches(arr) {
      var newArr = [];
      if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].match_id != undefined) {
            newArr.push(arr[i]);
          }
        }
      }
      return newArr;
    }
  },
  created() {
    //Load Matches
    this.loadMatches();
    /**
     * Listener for Accepting or Rejecting a Match
     */
    matchBus.$on("acceptMatch", match => {
      this.$store
        .dispatch("acceptMatch", match.match_id)
        .then(() => {
          console.log(`[Matches]: Accepted match successfully!`);
          matchBus.$emit("updateMentorings");
          this.loadMatches();
        })
        .catch(error => {
          console.log("[Matches]: Error on accepting the match", error);
        });
    });
    matchBus.$on("rejectMatch", match => {
      console.log("[Matches][TODO]: reject Match function", match);
      // this.$store.dispatch("rejectMatch", match.match_id)
      // .then(response=>{
      //     console.log(`Accepted match with id ${response.match_id} successfully!`);
      //     this.loadMatches();
      // })
      // .catch(error=>{
      //     console.log("Error on accepting the match",error);
      // });
    });
  },
  /**
   * Destroy Listener
   */
  beforeDestroy() {
    matchBus.$off("acceptMatch");
    matchBus.$off("rejectMatch");
  }
};
</script>

<style scoped>
h1 {
  margin-bottom: 25px;
  margin-left: 35px;
  font: var(--app-font-m-bold);
  color: var(--app-color-black);
  display: inline-block;
}
.filter_container {
  margin-left: 35px;
}
</style>