<template>
  <div>
    <header>
      <nav id="top-menu">
        <ul>
          <router-link to="/registration" tag="li">
            <a>Registrierung</a>
          </router-link>
          <router-link :to="{path:'/login'}" tag="li">
            <a>Login</a>
          </router-link>
        </ul>
      </nav>
      <nav id="main-menu">
        <app-logo />
        <ul>
          <router-link :to="{path: '/', hash:'#concept'}" tag="li">
            <a>myMentor Konzept</a>
          </router-link>
          <router-link :to="{path: '/', hash:'#advantages'}" tag="li">
            <a>Vorteile</a>
          </router-link>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
import Logo from "../shared/parts/Logo.vue";

export default {
  components: {
    /**
     * Logo of myMentor
     */
    appLogo: Logo
  }
};
</script>

<style scoped>
header nav:first-child {
  background-color: var(--app-color-brand-1);
  color: var(--app-color-almost-white);
  height: 40px;
  display: flex;
  align-items: center;
}
ul {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}
li {
  margin-right: 20px;
  list-style: none;
}
header nav:first-child a {
  color: var(--app-color-almost-white);
  text-decoration: none;
}
header nav:last-child {
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  height: 80px;
  display: flex;
}
header nav:last-child ul {
  align-self: flex-end;
  margin-bottom: 15px;
  font-size: 18px;
}
header nav:last-child ul a {
  color: var(--app-color-black);
}
header nav:last-child > a {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
}
</style>