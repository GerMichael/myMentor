<template>
  <aside>
    <ul>
      <router-link to="/home" tag="li">
        <a :class="{selected: getActiveStatus('home')}">
          <app-image
            :srcValue="`icons/home_${getActiveStatus('home')?'lila':'white'}.svg`"
            altValue="logout"
          />Home
        </a>
      </router-link>
      <router-link :to="{path: '/user', query: {id: getUserId}, props: true}" tag="li">
        <a :class="{selected: getActiveStatus('user')}">
          <app-image
            :srcValue="`icons/user_${getActiveStatus('user')?'lila':'white'}.svg`"
            altValue="logout"
          />
          {{ $store.getters.getFirstname }}
        </a>
      </router-link>
      <router-link to="/chat" tag="li">
        <a :class="{selected: getActiveStatus('chat')}">
          <app-image
            :srcValue="`icons/messages_${getActiveStatus('chat')?'lila':'white'}.svg`"
            altValue="logout"
          />Nachrichten
        </a>
      </router-link>
      <router-link to="/mentorings" tag="li">
        <a :class="{selected: getActiveStatus('mentorings')}">
          <app-image
            :srcValue="`icons/mentorings_${getActiveStatus('mentorings')?'lila':'white'}.svg`"
            altValue="logout"
          />Mentoring
        </a>
      </router-link>
      <router-link to="/groups" tag="li">
        <a :class="{selected: getActiveStatus('groups')}">
          <app-image
            :srcValue="`icons/class_${getActiveStatus('groups')?'lila':'white'}.svg`"
            altValue="logout"
          />Menteegruppen
        </a>
      </router-link>
      <router-link to="/groupmentor" tag="li">
        <a :class="{selected: getActiveStatus('groupmentor')}">
          <app-image
            :srcValue="`icons/classification_${getActiveStatus('groupmentor')?'lila':'white'}.svg`"
            altValue="logout"
          />Gruppenmentor
        </a>
      </router-link>
      <!--
            <router-link to="/logout" tag="li">
                <a :class="{selected: getActiveStatus('logout')}">
                    <app-image :srcValue="`icons/logout_${getActiveStatus('logout')?'lila':'white'}.svg`" altValue="logout"/>
                    ausloggen
                </a>
            </router-link>
      -->
    </ul>
  </aside>
</template>

<script>
import Image from "./../shared/parts/Image.vue";

export default {
  components: {
    /**
     * Image Component for displaying images with a relative path
     */
    appImage: Image
  },
  methods: {
    /**
     * @param target: the destination link that the link points to
     * @return a boolean if the target equals the current router location
     */
    getActiveStatus(target) {
      if (target == "user") {
        return (
          this.$route.name == target && this.getUserId == this.$route.query.id
        );
      }
      return this.$route.name == target;
    }
  },
  computed: {
    /**
     * Compute User ID:
     * @return User ID that is stored in the store
     */
    getUserId: function() {
      return this.$store.getters.getId;
    }
  }
};
</script>

<style scoped>
* {
  padding: 0;
}

aside {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}

ul {
  min-height: 500px;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 10px;
  background-color: var(--app-color-brand-2);
  margin: 30px 30px 30px 20px;
  padding: 10px;
  border-radius: 20px;
}
ul li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
ul li:hover a {
  text-decoration: underline;
}
ul li a {
  font: var(--app-font-xxs-bold);
  text-align: center;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 9px;
  padding: 17px 9px;
  display: block;
  width: 100%;
}
ul li img {
  max-width: 50px;
  display: block;
  margin: 0 auto;
}
.selected {
  background-color: var(--app-color-white);
  color: var(--app-color-brand-2);
}
</style>