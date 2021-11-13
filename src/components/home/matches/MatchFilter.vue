<template>
  <ul>
    <li
      v-for="(match, index) in getUniqueMatchesPlusAll"
      :key="index"
      @click="selectSkill(index)"
      :title="match"
      :class="{selected: match == value}"
    >{{ match }}</li>
  </ul>
</template>

<script>
export default {
  props: {
    /**
     * Contains all fields that are relevant for matches -> display them
     */
    matches: {
      type: Array,
      required: true
    },
    /**
     * v-model compatible: value contains the selected index
     */
    value: {
      type: String,
      default: "all"
    }
  },
  methods: {
    /**
     * selectField Function
     * @param index: index points to selected item in fields list
     * emits input event -> v-model compatible -> emits index of selected item
     */
    selectSkill(index) {
      this.$emit("input", this.getUniqueMatchesPlusAll[index]);
    }
  },
  computed: {
    /**
     * @return all categories (filters) including "all" for displaying all matches
     */
    getMatchesPlusAll: function() {
      return [
        {
          otherSkill: {
            id: -1,
            name: "all"
          }
        }
      ].concat(this.matches);
    },
    /**
     * @return a array containing a set of all unique categories (filters)
     */
    getUniqueMatchesPlusAll: function() {
      var set = new Set();
      this.getMatchesPlusAll.forEach(match => {
        set.add(match.otherSkill.name);
      });
      return Array.from(set);
    }
  }
};
</script>

<style scoped>
.selected {
  font: var(--app-font-xxs-regular);
  color: var(--app-color-brand-2);
}

li:not(.selected) {
  font: var(--app-font-xxs-regular);
  color: var(--app-color-dark-grey);
}

ul {
  display: flex;
  flex-direction: row;
  list-style: none;
  margin-bottom: 30px;
}

li {
  margin-right: 15px;
  cursor: pointer;
  box-sizing: border-box;
}

li::before {
  display: block;
  content: attr(title);
  height: 0;
  font-weight: bolder;
  overflow: hidden;
  visibility: hidden;
}
</style>