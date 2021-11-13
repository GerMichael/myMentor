<template>
  <div
    class="card_container"
    :class="{with_header_buttons: withHeaderButtons,
             with_footer_buttons: withFooterButtons,
             with_padding:withPadding,
             no_overflow: !overflowVisible,
             flat_design: flatDesign
            }"
    :style="{ backgroundColor }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    /**
     * Relevant for padding: If padding is activated and header buttons shown increase padding
     */
    withHeaderButtons: {
      type: Boolean,
      default: false
    },
    /**
     * Relevant for padding: If padding is activated and footer buttons shown increase padding
     */
    withFooterButtons: {
      type: Boolean,
      default: false
    },
    /**
     * Indicates if padding should be added
     */
    withPadding: {
      type: Boolean,
      default: true
    },
    /**
     * if overflow should be hidden
     */
    overflowVisible: {
      type: Boolean,
      default: false
    },
    /**
     * Flat Design means now drop shaddow and hover effect for Card
     */
    flatDesign: {
      type: Boolean,
      default: false
    },
    /**
     * Background color for Card
     */
    backgroundColor: {
      type: String,
      default: "var(--app-color-almost-white)"
    }
  }
};
</script>

<style scoped>
.card_container {
  box-shadow: 0px 0px 8px #0002;
  box-sizing: border-box;
  border-radius: 20px;
  padding: 0;
  transition: all 0.5s ease;
  cursor: default;
}

.card_container.no_overflow {
  overflow: hidden;
}

.card_container:hover {
  box-shadow: 0px 0px 8px #0003;
}

.card_container.with_padding.with_header_buttons {
  padding-top: 40px;
}

.card_container.with_padding.with_header_buttons h2:first-child {
  margin-top: 0px;
  padding-top: 0px;
}

.card_container.with_padding.with_footer_buttons {
  padding-bottom: 50px;
}

.card_container.with_padding {
  padding: 30px;
}
.card_container.flat_design:hover,
.card_container.flat_design {
  box-shadow: 0px 0px 0px #000 !important;
}
</style>