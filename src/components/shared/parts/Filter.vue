<template>
  <div class="filter_container">
    <h2 v-if="title">{{ title }}:</h2>
    <ul>
      <li
        v-for="(el, index) in getElements"
        :key="index"
        @click="selectSkill(index)"
        :title="el"
        :class="{selected: el == value}"
      >{{ el }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * Contains all elements that are relevant for list -> display them
     */
    list: {
      type: Array,
      required: true
    },
    /**
     * v-model compatible: value contains the selected index
     */
    value: {
      type: String
    },
    /**
     * The All-Object
     */
    allObject: {
      type: Object,
      default: null
    },
    /**
     * Compare Function
     * @param el: The current Element
     * @return: The name that is responsible for indexing
     */
    compareFunction: {
      type: Function,
      default: function(el) {
        return el;
      }
    },
    title: {
      type: String
    }
  },
  methods: {
    /**
     * selectField Function
     * @param index: index points to selected item in fields list
     * emits input event -> v-model compatible -> emits index of selected item
     */
    selectSkill(index) {
      var element = this.getElements[index];
      this.$emit("input", element);
      this.$emit("filterChange", element);
    },
    /**
     * @return all categories (filters) including "all" for displaying all matches
     */
    getElementsPlusAll: function() {
      return [this.allObject].concat(this.list);
    },
    /**
     * @return a array containing a set of all unique categories (filters)
     */
    getUniqueElementsFromArray: function(arr) {
      var set = new Set();
      arr.forEach(el => {
        set.add(this.compareFunction(el));
      });
      return Array.from(set);
    }
  },
  computed: {
    /**
     * Returns all Elements to display in filter
     * if an allObject (Object representing all elements) was defined: 
     *  - add this to list and return all plus rest
     * else 
     *  - return rest
     */
    getElements: function() {
      var setList;
      if (this.allObject) {
        setList = this.getUniqueElementsFromArray(this.getElementsPlusAll());
      } else {
        setList = this.getUniqueElementsFromArray(this.list);
      }
      return setList;
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.filter_container {
  display: inline-block;
}
h2 {
  display: inline-block;
  font-size: 15px;
  margin-right: 15px;
}
.selected,
.selected:hover {
  color: var(--app-color-brand-2);
  cursor: default;
}

li:not(.selected) {
  color: var(--app-color-dark-grey);
}

li:hover {
  color: var(--app-color-black);
}

ul {
  display: inline-flex;
  flex-direction: row;
  list-style: none;
  padding-left: 0;
}

li {
  margin-right: 15px;
  cursor: pointer;
  box-sizing: border-box;
  font: var(--app-font-xxs-regular);
  border-bottom: 1px solid #0000;
  text-transform: lowercase;
  transition: border-bottom 0.2s ease, color 0.2s ease;
}

li::before {
  display: block;
  content: attr(title);
  font-weight: bolder;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}
</style>