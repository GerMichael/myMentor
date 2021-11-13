<template>
  <span class="list_with_title">
    <span class="title">{{ title }}</span>
    <span class="list">
      <ul>
        <li v-for="(listItem, index) in list" :key="index">{{ listItem }}</li>
      </ul>
    </span>
  </span>
</template>

<script>
export default {
  props: {
    title: String,
    list: Array
  }
};
</script>

<style scoped>
.list_with_title {
  display: flex;
  flex-direction: column;
}
.list_with_title .title {
  font: var(--app-font-xxs-bold);
}
.list_with_title .list ul {
  list-style: none;
  margin-top: 5px;
  padding-left: 0;
  font: var(--app-font-xxs-regular);
}
</style>