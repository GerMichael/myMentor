<template>
  <div class="match_container">
    <div class="match_details" :class="{request: request}">
      <section class="other_user">
        <p>{{ getOtherUserFullName }} kann mir lernen</p>
        <p>{{ getOtherSkillName }}</p>
      </section>
      <section class="user" v-if="!request">
        <p>Ich kann {{ getOtherUserFullName }} lernen</p>
        <p>{{ getUserSkillName }}</p>
      </section>
      <section class="link">
        <router-link
          :to="{path: '/user', query: {id: getOtherUser.id}}"
          tag="a"
        >Mehr über {{ getOtherUserFullName }} erfahren...</router-link>
      </section>
    </div>
    <div class="control_space">
      <section>
        <p>Möchtest du das Mentoring beginnen?</p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * The Match to display
     */
    match: Object,
    /**
     * If the match is a request -> no user details
     */
    request: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * @return other user as object
     */
    getOtherUser() {
      return this.match.other_user;
    },
    /**
     * @return other user's first and last name
     */
    getOtherUserFullName() {
      return (
        this.match.other_user.first_name + " " + this.match.other_user.last_name
      );
    },
    /**
     * @return the name of the other skill
     */
    getOtherSkillName() {
      return this.match.other_skill.name;
    },
    /**
     * @return the name of the skill the user has
     */
    getUserSkillName() {
      return this.match.own_skill.name;
    }
  }
};
</script>

<style scoped>
.match_container {
  min-width: 380px;
}

.match_details {
  background-color: var(--app-color-brand-1);
  color: var(--app-color-almost-white);
  padding: 20px 30px;
}
.match_details.request {
  background-color: var(--app-color-brand-2);
}

.match_details section:not(:nth-child(3)):not(.link) {
  min-height: 90px;
}

.match_details section:nth-child(3) {
  min-height: 30px;
}

.match_details section.link {
  height: 48px;
}

.match_details section:nth-child(3) a {
  color: var(--app-color-almost-white);
  font: var(--app-font-xxs-regular-underline);
  text-decoration: var(--app-text_decoration-xxs-regular-underline);
}

.match_details p:first-child {
  font: var(--app-font-xxs-bold);
}

.match_details p:nth-child(2) {
  font: var(--app-font-xxs-regular);
}

.match_details a {
  color: var(--app-color-almost-white);
  font: var(--app-font-xxs-regular-underline);
  text-decoration: var(--app-text_decoration-xxs-regular-underline);
}

.control_space {
  padding: 20px 30px;
  height: 90px;
}

.control_space section p {
  font-weight: bold;
  font-size: 16px;
  margin-top: 0;
}

.accept {
  position: relative;
}

.accept p {
  margin: 10px 0 40px 0;
}

.accept div {
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: space-between;
}
</style>