<template>
  <div>
    <ul>
      <!-- <router-link to="/contact" tag="li"></router-link>
      <router-link to="/support" tag="li"><a>Support</a></router-link>-->
      <li>
        <a>Kontakt</a>
      </li>
      <li>
        <a>Support</a>
      </li>
      <router-link to="/imprint" tag="li">
        <a>Impressum</a>
      </router-link>
      <router-link to="/privacy" tag="li">
        <a>Datenschutz</a>
      </router-link>
    </ul>
  </div>
</template>

<style scoped>
* {
  margin: 0;
}
div {
  background-color: var(--app-color-brand-2);
  color: #000;
  height: 50px;
  margin-top: 75px;
}
ul {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
}
li {
  margin-right: 20px;
  list-style: none;
}
a {
  color: var(--app-color-almost-white);
  text-decoration: none;
}
</style>