<template>
  <div>
    <h1>Anfragen</h1>
    <app-requests-list :requests="requests" />
  </div>
</template>

<script>
import RequestsList from "./RequestsLists.vue";

export default {
  components: {
    /**
     * Requests List display all Requests
     */
    appRequestsList: RequestsList
  },
  data() {
    return {
      /**
       * The Lists of Requests that are displayed
       * TODO: Load from server
       */
      requests: [
        {
          other_user: {
            first_name: "Jonas",
            last_name: "Bauer",
            id: 123423
          },
          own_skill: {
            id: 12,
            name: "3D-Programm Maya"
          },
          other_skill: {
            id: 10,
            name: "Programmier-Logik (objektorientiert)"
          }
        },
        {
          other_user: {
            first_name: "Jonas",
            last_name: "Bauer",
            id: 123423
          },
          own_skill: {
            id: 12,
            name: "3D-Programm Maya"
          },
          other_skill: {
            id: 10,
            name: "Programmier-Logik (objektorientiert)"
          }
        },
        {
          other_user: {
            first_name: "Jonas",
            last_name: "Bauer",
            id: 123423
          },
          own_skill: {
            id: 12,
            name: "3D-Programm Maya"
          },
          other_skill: {
            id: 10,
            name: "Programmier-Logik (objektorientiert)"
          }
        },
        {
          other_user: {
            first_name: "Jonas",
            last_name: "Bauer",
            id: 123423
          },
          own_skill: {
            id: 12,
            name: "3D-Programm Maya"
          },
          other_skill: {
            id: 10,
            name: "Programmier-Logik (objektorientiert)"
          }
        }
      ]
    };
  }
};
</script>

<style scoped>
h1 {
  margin-bottom: 25px;
  padding-left: 35px;
  font: var(--app-font-m-bold);
  color: var(--app-color-black);
  display: inline-block;
}
</style>