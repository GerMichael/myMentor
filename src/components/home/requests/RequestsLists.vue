<template>
  <app-slideshow empty="Keine Anfragen für Dich gefunden.">
    <transition-group name="zoomIn" mode="out-in" tag="div" class="slidehow_transition">
      <app-button-card
        :withPadding="false"
        v-for="(request, index) in requests"
        :key="index"
        :footerButtons="[
                {type: 'cross', title: 'Ablehnen', textAlignLeft: false, name: 'reject', isPrimary: false},
                {type: 'ok', title: 'Annehmen', textAlignLeft: true, name: 'accept'}
            ]"
        @acceptFooterButtonClicked="acceptRequest(request)"
        @rejectFooterButtonClicked="rejectRequest(request)"
      >
        <!-- <app-request :request="request"/> -->
        <app-match :match="request" :request="true" />
      </app-button-card>
    </transition-group>
  </app-slideshow>
</template>

<script>
import ButtonCard from "./../../shared/parts/ButtonCard.vue";
//import Request from "./Request.vue";
import Slideshow from "./../../shared/parts/Slideshow.vue";
import Match from "./../matches/Match.vue";

export default {
  components: {
    /**
     * Button Card for displaying a card with buttons
     */
    appButtonCard: ButtonCard,
    /**
     * Request displays the details into the button card
     */
    //appRequest: Request,
    /**
     * Slideshow for requests
     */
    appSlideshow: Slideshow,
    /**
     * Match of two users -> use type: request
     */
    appMatch: Match
  },
  props: {
    /**
     * All Requests that get displayed
     */
    requests: {
      type: Array
    }
  },
  methods: {
    /**
     * TODO: accept request
     */
    acceptRequest(request) {
      console.log("[RequestsList][TODO]: Accept Request", request);
    },
    /**
     * TODO: Reject request
     */
    rejectRequest(request) {
      console.log("[RequestsList][TODO]: Reject Request", request);
    }
  }
};
</script>

<style scoped>
.slider_content .button_card_container {
  margin-right: 50px;
}

.button_card_container:hover {
  transform: scale(1.01);
}
.button_card_container:hover .card_container {
  box-shadow: 0px 0px 8px #0003;
  border: 1px solid #0002;
}
</style>