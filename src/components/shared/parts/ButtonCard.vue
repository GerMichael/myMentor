<template>
  <div class="button_card_container">
    <header :style="{'justify-content': justifyContentHeader}">
      <app-button
        v-for="(button, index) in headerButtons"
        :key="index"
        :type="button.type"
        :isPrimary="button.isPrimary"
        :textAlignLeft="button.textAlignLeft"
        :enabled="button.enabled"
        :id="button.id"
        @click="headerButtonClicked(button,index)"
      />
    </header>
    <app-card
      :withHeaderButtons="headerButtons.length > 0"
      :withFooterButtons="footerButtons.length > 0"
      :withPadding="withPadding"
      :overflowVisible="overflowVisible"
      :backgroundColor="backgroundColor"
      :flatDesign="flatDesign"
    >
      <slot />
    </app-card>
    <footer :style="{'justify-content': justifyContentFooter}">
      <app-button
        v-for="(button, index) in footerButtons"
        :key="index"
        :type="button.type"
        :isPrimary="button.isPrimary"
        :textAlignLeft="button.textAlignLeft"
        :enabled="button.enabled"
        :id="button.id"
        @click="footerButtonClicked(button,index)"
      >{{ button.title }}</app-button>
    </footer>
  </div>
</template>

<script>
import Card from "./Card.vue";
import Button from "./Button.vue";

export default {
  components: {
    appCard: Card,
    appButton: Button
  },
  props: {
    /**
     * Array with Buttons for Header
     * Buttons: {type: '', enabled: true, id: '', name: '',
     *           isPrimary: true, isPlain: false, textAlignLeft: true}
     * IMPORTANT: name is part of Emit Name, if not given then the index
     *            -> e.g. @<name>HeaderButtonClicked='' bzw. 0HeaderButtonClicked
     */
    headerButtons: {
      type: Array,
      default: () => {
        return new Array();
      }
    },
    /**
     * Array with Buttons for Header
     * Buttons: {type: '', enabled: true, id: '', name: '',
     *           isPrimary: true, isPlain: false, textAlignLeft: true,
     *           title: 'Titel'
     *          }
     * title = Title of Button shown beside it
     * IMPORTANT: name is part of Emit Name, if not given then the index
     *            -> e.g. @<name>FooterButtonClicked='' bzw. 0FooterButtonClicked
     * DEFAULTS:
     *  - isPrimary: true
     *  - isPlain: false
     *  - textAlignLeft: false
     */
    footerButtons: {
      type: Array,
      default: () => {
        return new Array();
      }
    },
    /**
     * justifyContentHeader for Header
     */
    justifyContentHeader: {
      type: String,
      default: "row-reverse"
    },
    /**
     * justifyContentFooter for Footer
     * e.g.: - space-between for left and right
     *       - flex-end for only right
     *       - flex-start for only left
     *       - space around for center
     */
    justifyContentFooter: {
      type: String,
      default: "space-between"
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
  },
  methods: {
    /**
     * Emit event, if a header button was clicked
     *  - if a name was specified for button -> emit event with name of button
     *  - else emit event with index of button
     */
    headerButtonClicked(button, index) {
      var name = index;
      if (button.name) name = button.name;
      this.$emit(name + "HeaderButtonClicked");
    },
    /**
     * Emit event, if a footer button was clicked
     *  - if a name was specified for button -> emit event with name of button
     *  - else emit event with index of button
     */
    footerButtonClicked(button, index) {
      var name = index;
      if (button.name) name = button.name;
      this.$emit(name + "FooterButtonClicked");
    }
  }
};
</script>

<style scoped>
.button_card_container {
  position: relative;
  display: inline-block;
  transition: all 0.2s ease;
}

.button_card_container header {
  position: absolute;
  top: -20px;
  right: 25px;
  display: flex;
  flex-direction: row-reverse;
}

.button_card_container .card_container {
  width: 100%;
  height: 100%;
}

.button_card_container header button {
  margin: 0 5px;
}

.button_card_container footer {
  position: absolute;
  bottom: -20px;
  width: 100%;
  padding: 0 25px;
  position: absolute;
  display: flex;
  justify-content: space-between;
}

.button_card_container footer button {
  margin: 0 5px;
}
</style>