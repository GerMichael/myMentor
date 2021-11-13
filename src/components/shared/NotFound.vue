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
      </nav>
    </header>
    <main>
      <h1>Irgendetwas ist wohl schief gelaufen...</h1>
      <div class="box_40-60">
        <figure>
          <img
            src="../../assets/start/illustration_notfound.svg"
            alt="Frau zuckt ratlos mit den Schultern"
          />
        </figure>
        <div class="textbox">
          <p>Vielleicht hast du nach folgenden Seiten gesucht:</p>
          <ul>
            <li>
              <router-link to="/" tag="a">Startseite</router-link>
            </li>
            <li>
              <router-link to="/home" tag="a">Home-Seite</router-link>
            </li>
          </ul>
          <!-- Link zu Kontakt-Seite würde hier eingefügt werden -->
          <p>Du hast auch nicht danach gesucht? Vielleicht können wir dir persönlich helfen!</p>
        </div>
      </div>
    </main>
    <app-footer />
  </div>
</template>

<script>
import Logo from "./parts/Logo.vue";
import Footer from "./Footer.vue";

export default {
  components: {
    appLogo: Logo,
    appFooter: Footer
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
header ul {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}
header li {
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

/* Main Content */

main {
  padding: 75px 5% 0px;
}

main a {
  color: var(--app-color-brand-1);
  font-weight: 700;
}

main ul {
  margin: 15px 0 35px;
}

main li {
  padding: 5px 0;
}

.box_40-60 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

figure {
  width: 45%;
}

.box_40-60 div {
  width: 50%;
}
</style>