<template>
  <button
    :id="id"
    v-on="inputListeners"
    :disabled="!enabled"
    :style="{backgroundImage: getImageUrl,
        backgroundPosition: getImagePosition,
        padding: getPadding
    }"
    :class="{isPrimary, isHovering, textAlignLeft}"
  >
    <slot />
    <!-- load image dynamically with require(); -->
    <!--<img :src="require('@/assets/icons/'+imgName)" :alt="altValue">-->
  </button>
</template>

<script>
export default {
  props: {
    /**
     * Id of Button -> For labels etc.
     */
    id: {
      type: String
    },
    /**
     * The button-type (for icon), e.g. 'calendar', ...
     * has to be the same name like the icon-name in '/assets/icons/'. Without ending and without color [type]_[...].svg
     */
    type: {
      type: String,
      default: ""
    },
    /**
     * If Button is enabled
     */
    enabled: {
      default: true
    },
    /**
     * Indicates if Button is a primary button
     * indicates style information
     */
    isPrimary: {
      type: Boolean,
      default: true
    },
    /**
     * Indicates if the button has background-color
     */
    isPlain: {
      type: Boolean,
      default: false
    },
    /**
     * Indicates if text of button is aligned left
     */
    textAlignLeft: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isHovering: false
    };
  },
  computed: {
    getImagePosition: function() {
      if (this.$slots.default && this.$slots.default[0].text != "") {
        if (this.textAlignLeft) return "calc(100% - 10px)";
        return "10px";
      }
      return "center";
    },
    getImageUrl: function() {
      if (this.type !== "") {
        var name = this.type;
        var color = "white";
        if (!this.isPrimary) {
          color = this.isHovering ? "lila" : "orange";
        }
        return "url(" + require(`@/assets/icons/${name}_${color}.svg`) + ")";
      }
      return "";
    },
    getPadding() {
      if (this.type !== "") {
        if (this.$slots.default && this.$slots.default[0].text != "") {
          if (this.textAlignLeft) {
            return "0px 50px 0px 20px";
          } else {
            return "0px 20px 0px 50px";
          }
        } else {
          return "0px 30px 0px 10px";
        }
      } else {
        return "0px 20px";
      }
    },
    inputListeners: function() {
      if (this.enabled !== false) {
        var vm = this;
        // `Object.assign` merges objects together to form a new object
        return Object.assign(
          {},
          // We add all the listeners from the parent
          this.$listeners,
          // Then we can add custom listeners or override the
          // behavior of some listeners.
          {
            mouseenter: function() {
              vm.isHovering = true;
            },
            mouseleave: function() {
              vm.isHovering = false;
            }
          }
        );
      }
      return undefined;
    }
  }
};
</script>

<style scoped>
button {
  display: flex;
  flex-direction: row;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: var(--app-color-white);
  border: none;
  border-radius: 20px;
  outline: none;

  font: var(--app-font-xxs-bold);
  color: var(--app-color-brand-1);

  -webkit-appearance: none;
  -moz-appearance: none;

  transition: all 0.2s;

  background-repeat: no-repeat;
  background-size: 30px 30px;
  box-shadow: 0px 0px 8px #0002;
}
button.isHovering {
  color: var(--app-color-brand-2);
}

button.isPrimary {
  background-color: var(--app-color-brand-1);
  color: var(--app-color-almost-white);
}
button.isPrimary.isHovering {
  background-color: var(--app-color-brand-2);
}

button:disabled {
  opacity: 0.5;
}

button.textAlignLeft {
  flex-direction: row-reverse;
  padding: 0px 50px 0px 20px;
}
</style>