<template>
  <app-slideshow empty="Keine passenden Matches für Dich gefunden.">
    <transition-group name="zoomIn" mode="out-in" class="slidehow_transition">
      <app-button-card
        v-for="(match, index) in matches"
        :key="index"
        :withPadding="false"
        :footerButtons="[
                    {type: 'cross', title: 'Ablehnen', textAlignLeft: false, name: 'reject', isPrimary: false},
                    {type: 'ok', title: 'Beginnen', textAlignLeft: true, name: 'accept'}
                ]"
        @rejectFooterButtonClicked="reject(match)"
        @acceptFooterButtonClicked="accept(match)"
      >
        <app-match :match="match" />
      </app-button-card>
    </transition-group>
  </app-slideshow>
</template>

<script>
import Slideshow from "./../../shared/parts/Slideshow.vue";
import Match from "./Match.vue";
import ButtonCard from "./../../shared/parts/ButtonCard.vue";
import { matchBus } from "./../../../main";

export default {
  components: {
    /**
     * Match that contains all information about the match
     */
    appMatch: Match,
    /**
     * Card with Buttons showing the content
     */
    appButtonCard: ButtonCard,
    /**
     * Slideshow to iterate trough matches
     */
    appSlideshow: Slideshow
  },
  props: {
    matches: Array
  },
  methods: {
    /**
     * @param match
     * emit a Event that this match was accepted -> send also this match
     */
    accept(match) {
      matchBus.$emit("acceptMatch", match);
    },
    /**
     * @param match
     * emit a Event that this match was rejected -> send also this match
     */
    reject(match) {
      matchBus.$emit("rejectMatch", match);
    }
  }
};
</script>

<style scoped>
.slider_content .button_card_container {
  margin-right: 50px;
  min-width: 380px;
}

.notAvailable {
  cursor: not-allowed;
}

.button_card_container:hover {
  transform: scale(1.01);
}
.button_card_container:hover .card_container {
  box-shadow: 0px 0px 8px #0003;
  border: 1px solid #0002;
}
</style>