<template>
  <app-modal>
    <app-button-card
      @mousedown.stop
      :headerButtons="[
            {type:'cross', name: 'close', isPrimary: false}
        ]"
      :footerButtons="(!loggingIn ? [
            {type: 'ok', name: 'login', title: 'Einloggen', textAlignLeft: true}
        ] : [])"
      justifyContentFooter="flex-end"
      @closeHeaderButtonClicked="close"
      @loginFooterButtonClicked="login"
    >
      <h2>User Login</h2>
      <div id="login_input" v-show="!loggingIn">
        <form>
          <div>
            <app-input
              type="email"
              v-model="inputValue.email"
              title="Email"
              :error="invalidUserLogin"
              @keyup.enter="login"
            />
            <app-input
              type="password"
              v-model="inputValue.password"
              title="Password"
              :error="invalidUserLogin"
              @keyup.enter="login"
            />
          </div>
        </form>

        <transition name="error-shake">
          <div
            role="alert"
            v-if="invalidUserLogin"
          >The combination of username and password is invalid.</div>
        </transition>
        <transition name="error-shake">
          <div role="alert" v-if="emptyFields">Both fields are required!</div>
        </transition>

        <div class="no_account">
          <p>
            Du hast noch keinen Account?
            <router-link to="/registration" tag="a">Dann registriere dich hier.</router-link>
          </p>
        </div>
      </div>
      <div v-show="loggingIn">
        <app-image srcValue="icons/waiting_blume.gif" altValue="Loading" />
      </div>
    </app-button-card>
  </app-modal>
</template>

<script>
import Modal from "./../shared/parts/Modal.vue";
import ButtonCard from "./../shared/parts/ButtonCard.vue";
import Image from "./../shared/parts/Image.vue";
import Input from "./../shared/parts/Input.vue";

export default {
  /**
   * Components:
   *  - appButton as a Button for closing the login, and start login
   *  - appModal for displaying the userregistration modal
   */
  components: {
    /**
     * Modal for displaying the component as modal
     */
    appModal: Modal,
    /**
     * Button Card Container for displaying content + buttons
     */
    appButtonCard: ButtonCard,
    /**
     * Displaying waiting_gif
     */
    appImage: Image,
    /**
     * Input field
     */
    appInput: Input
  },
  data() {
    return {
      /**
       * Input Value for User-Login, both required
       */
      inputValue: {
        email: "",
        password: ""
      },
      /**
       * State if User Login fails or not -> Error Message will be displayed in login form
       * -> Gets set to true if login-Request failed
       * -> Gets set to false if User change any value of inputValue
       */
      invalidUserLogin: false,
      /**
       * State if Username or password is empty on submit
       */
      emptyFields: false,
      /**
       * Redirect Destination, if Users has to be redirected -> prevents an error, that this login componente gets created 2x
       */
      destination: "",
      /**
       * Indicates, if login-process is going on
       */
      loggingIn: false
    };
  },
  methods: {
    /**
     * Check input function
     * @return boolean if input values are ok
     * check if neither email nor password is empty then return true else false
     */
    checkInput() {
      if (this.inputValue.email == "" || this.inputValue.password == "") {
        this.emptyFields = true;
        return false;
      } else this.emptyFields = false;
      return true;
    },
    /**
     * Login Function
     * Sends a login-request with the current inputValues to store -> store sends to server
     * If login fails the invalidUserLogin-Status changes to true -> shows error message
     * If login succeedes the current router-side will be pushed to destination
     *    If origin is given as query param then redirect to origin else to home (signedIn)
     */
    login() {
      this.loggingIn = true;
      if (this.checkInput()) {
        this.$store
          .dispatch("signinUser", {
            email: this.inputValue.email,
            password: this.inputValue.password
          })
          .then(() => {
            console.log("[UserLogin]: Successfully signed in!");
            this.updateCurrentUserAndRedirect();
          })
          .catch(error => {
            console.log("[UserLogin]: Error on signing in!", error);
            this.invalidUserLogin = true;
            this.loggingIn = false;
          });
      } else {
        this.invalidUserLogin = false;
        this.loggingIn = false;
      }
    },
    /**
     * Closes the current UserLogin by navigation to the Start Page
     */
    close() {
      this.$router.push("/");
    },
    /**
     * updates the user after login and redirects to destination
     * if destination is specified:
     *  -> set path for new destination
     *  -> else set path to /signedIn
     * update User in store
     *  -> if status is ok -> redirect
     * 
     */
    updateCurrentUserAndRedirect() {
      this.destination = "/signedIn";
      if (this.$route.query.origin != undefined) {
        this.destination = this.$route.query.origin;
      }
      this.$store
        .dispatch("getCurrentUser")
        .then(response => {
          console.log("[UserLogin]: User is signed in");
          this.$store
            .dispatch("updateCurrentUser", response.data.data)
            .then(() => {
              console.log("[UserLogin]: Updated data successfully");
            });
          // let destination = "/signedIn"
          // if(this.$route.query.origin != undefined){
          //     destination = this.$route.query.origin;
          // }
          this.$router.push(this.destination);
        })
        .catch(error => {
          console.log(
            "[UserLogin]: User has to sign in, no Cookies available",
            error
          );
        });
    }
  },
  created() {
    /**
     * On Create a request to the server gets send to receive the current user
     * If there is a valid response -> User is already signed in -> updateCurrentUser -> redirecting automatically
     *    If origin is given as query param then redirect to origin else to home
     * If ther is no valide response -> no cookies were available -> login is required
     */
    console.log(
      "[UserLogin]: check if user is logged in",
      this.$route.fullPath
    );
    this.updateCurrentUserAndRedirect();
  }
};
</script>

<style scoped>
a {
  font: var(--app-font-xxs-bold);
  color: var(--app-color-black);
}

a:hover {
  color: var(--app-color-brand-1);
  text-decoration: none;
}

div[role="alert"] {
  color: var(--app-color-error);
  font: var(--app-font-xxxs-regular);
}

.button_card_container {
  min-width: 600px;
  max-width: 600px;
}

.no_account {
  margin-top: 15px;
}

img {
  width: 100%;
  object-fit: contain;
  max-height: 100px;
}
</style>