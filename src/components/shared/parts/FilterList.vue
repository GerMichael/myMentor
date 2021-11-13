<template>
  <div class="filter_list_container">
    <app-filter
      :list="list.list"
      v-model="selectedList[index]"
      :allObject="list.allObject"
      :compareFunction="list.compareFunction"
      :title="list.title"
      @filterChange="filterChanged(index)"
      v-for="(list, index) in lists"
      :key="index"
    />
  </div>
</template>

<script>
import Filter from "./Filter.vue";

export default {
  props: {
    /**
     * All Lists to display
     * required list-attributes:
     *   - list: array of elements
     *   - compareFunction
     *   - selected: contains the selected List item
     * optional list-attributes:
     *   - allObject: for list allObject
     */
    lists: {
      type: Array
    },
    /**
     * If only one selected item is allowed
     */
    multiSelect: {
      type: Boolean,
      default: false
    },
    /**
     * the selected list
     */
    selectedList: {
      type: Array,
      default: new Array()
    }
  },
  components: {
    appFilter: Filter
  },
  methods: {
    /**
     * if the filter is not a multiselect filter
     *  -> change selected list to current
     */
    filterChanged(index) {
      if (!this.multiSelect) {
        this.selectedList.forEach((item, i) => {
          if (i != index) {
            this.selectedList[i] = "";
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.filter_list_container .filter_container {
  display: block !important;
}
</style>