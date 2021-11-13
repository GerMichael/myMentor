<template>
  <app-modal>
    <app-button-card
      @mousedown.stop
      :headerButtons="[
            {type:'cross', name: 'close'}
        ]"
      justifyContentFooter="flex-end"
      @closeHeaderButtonClicked="close"
    >
      <h2>Du wurdest ausgeloggt.</h2>
      <p>
        <router-link tag="a" to="/login">Zurück zum Login?</router-link>
      </p>
    </app-button-card>
  </app-modal>
</template>

<script>
import ButtonCard from "./../shared/parts/ButtonCard.vue";
import Modal from "./../shared/parts/Modal.vue";

export default {
  components: {
    /**
     * appModal for displaying the userregistration modal
     */
    appModal: Modal,
    /**
     * Button Card Container for displaying content + buttons
     */
    appButtonCard: ButtonCard
  },
  methods: {
    /**
     * Close Logout by redirecting to start
     */
    close() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
a {
  font: var(--app-font-xxs-bold);
  color: var(--app-color-black);
}

a:hover {
  color: var(--app-color-brand-1);
  text-decoration: none;
}

.button_card_container {
  min-width: 600px;
}
</style>