<template>
  <app-modal>
    <app-button-card
      @mousedown.stop
      :headerButtons="[
            {type:'cross', name: 'close', isPrimary: false}
        ]"
      :footerButtons="(round > 1 ? [
            {type: 'chevron-left', name: 'back', title: 'zurück'},
            {type: (round < 3 ? 'chevron-right' : 'ok'), name: 'next', title: (round < 3 ? 'weiter' : 'registrieren'), textAlignLeft: true}
        ] : [
            {type: (round < 3 ? 'chevron-right' : 'ok'), name: 'next', title: (round < 3 ? 'weiter' : 'registrieren'), textAlignLeft: true}
        ])"
      :justifyContentFooter="(round > 1 ?  'space-between' : 'flex-end')"
      :overflowVisible="true"
      @closeHeaderButtonClicked="close"
      @backFooterButtonClicked="back"
      @nextFooterButtonClicked="next"
    >
      <h2>User Registration</h2>
      <div id="progress">
        <svg height="2">
          <line x1="0" y1="0" x2="100%" y2="0" />
        </svg>
        <div>
          <span v-for="i in 3" :key="i" :class="{active: round == i, check: round > i}">{{i}}</span>
        </div>
      </div>

      <form autocomplete="off">
        <div v-show="round == 1" class="round1">
          <!-- Round 1 -->
          <div>
            <div :class="{error: error.firstName}">
              <app-input
                type="text"
                v-model="inputValue.firstName"
                title="Vorname"
                :error="error.firstName"
              >
                <transition name="error-shake" slot="error">
                  <div role="alert" v-if="error.firstName">Das Feld darf nicht leer bleiben!</div>
                </transition>
              </app-input>
            </div>
            <div :class="{error: error.lastName}">
              <app-input
                type="text"
                v-model="inputValue.lastName"
                title="Nachname"
                :error="error.lastName"
              >
                <transition name="error-shake" slot="error">
                  <div role="alert" v-if="error.lastName">Das Feld darf nicht leer bleiben!</div>
                </transition>
              </app-input>
            </div>
          </div>
          <div>
            <div
              :class="{error: error.email.noEmail || error.email.empty || error.email.emailNotAvailable }"
            >
              <app-input
                type="email"
                v-model="inputValue.email"
                title="Email"
                :error="error.email.noEmail || error.email.empty || error.email.emailNotAvailable"
              >
                <transition name="error-shake" slot="error">
                  <div
                    role="alert"
                    v-if="error.email.empty"
                  >Die Email-Adresse darf nicht leer bleiben!</div>
                </transition>
                <transition name="error-shake" slot="error">
                  <div
                    role="alert"
                    v-if="error.email.noEmail"
                  >Die Eingabe ist keine valide E-Mail Adresse!</div>
                </transition>
                <transition name="error-shake" slot="error">
                  <div
                    role="alert"
                    v-if="error.email.emailNotAvailable"
                  >Die E-Mail Adresse wurde schon vergeben und ist damit nicht mehr verfügbar!</div>
                </transition>
              </app-input>
            </div>
          </div>
          <div>
            <div :class="{error: error.password}">
              <app-input
                type="password"
                v-model="inputValue.password"
                title="Password"
                :error="error.password"
              >
                <transition name="error-shake" slot="error">
                  <div role="alert" v-if="error.password">Das Feld darf nicht leer bleiben!</div>
                </transition>
              </app-input>
            </div>
            <div :class="{error: error.confirmPassword.notTheSame || error.confirmPassword.empty }">
              <app-input
                type="password"
                v-model="inputValue.confirmPassword"
                title="Password bestätigen"
                :error="error.confirmPassword.notTheSame || error.confirmPassword.empty"
                @keydown.enter="next"
              >
                <transition name="error-shake" slot="error">
                  <div
                    role="alert"
                    v-if="error.confirmPassword.empty"
                  >Das Feld darf nicht leer bleiben!</div>
                </transition>
                <transition name="error-shake" slot="error">
                  <div
                    role="alert"
                    v-if="error.confirmPassword.notTheSame"
                  >Das Passwort stimmt nicht überein!</div>
                </transition>
              </app-input>
            </div>
          </div>
        </div>
        <div v-show="round == 2" class="round2">
          <!-- Round 2 -->
          <div :class="{error: error.mySkills}">
            <label for="mySkills">Meine Skills</label>
            <app-skill-selection
              v-model="inputValue.mySkills"
              :skills="skills"
              idValue="mySkills"
              placeholderValue="Meine Skills"
              :cardClicked="cardClicked"
            />
            <transition name="error-shake">
              <div role="alert" v-if="error.mySkills">Es müssen eigene Skills angegeben werden!</div>
            </transition>
          </div>
        </div>
        <div v-show="round == 3" class="round3">
          <!-- Round 3 -->
          <div :class="{error: error.desiredSkills}">
            <label for="desiredSkills">Gesuchte Skills</label>
            <app-skill-selection
              v-model="inputValue.desiredSkills"
              :skills="skills"
              idValue="desiredSkills"
              placeholderValue="Gesuchte Skills"
              :cardClicked="cardClicked"
            />
            <transition name="error-shake">
              <div
                role="alert"
                v-if="error.desiredSkills"
              >Es müssen gesuchte Skills angegeben werden!</div>
            </transition>
          </div>
        </div>
      </form>
      <div class="has_account">
        <p>
          Du hast bereits einen Account?
          <router-link to="/login" tag="a">Dann logge dich hier ein.</router-link>
        </p>
      </div>
    </app-button-card>
  </app-modal>
</template>

<script>
import ButtonCard from "./../shared/parts/ButtonCard.vue";
import SkillSelection from "./SkillSelection.vue";
import Modal from "./../shared/parts/Modal.vue";
import Input from "./../shared/parts/Input.vue";

export default {
  components: {
    /**
     * Button Card Container for displaying content + buttons
     */
    appButtonCard: ButtonCard,
    /**
     * appSkillSelection is a form to selekt multiple skills from list (here for mySkills and desiredSkills)
     */
    appSkillSelection: SkillSelection,
    /**
     * appModal for displaying the userregistration modal
     */
    appModal: Modal,
    /**
     * Input field
     */
    appInput: Input
  },
  data() {
    return {
      /**
       * Input Values for Registration
       *  -> firstName + lastName of User
       *  -> email address as username
       *  -> password + confirmPassword -> have to be the same
       *  -> mySkills = Skills the user has
       *  -> desiredSkills = Skills the user wants to learn
       */
      inputValue: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        mySkills: [],
        desiredSkills: []
      },
      /**
       * Errors on Registration for detailed user feedback
       * firstName:        if field is empty
       * lastName:         if field is empty
       * email:            if field is empty | if email is not available | if the input value is no email -> regex
       * password:         if field is empty
       * confirmPassword:  if field is empty | if the passwords are not the same
       * mySkills:         if list is empty
       * desiredSkills:    if list is empty
       */
      error: {
        firstname: false,
        lastName: false,
        email: {
          noEmail: false,
          empty: false,
          emailNotAvailable: false
        },
        password: false,
        confirmPassword: {
          notTheSame: false,
          empty: false
        },
        mySkills: false,
        desiredSkills: false
      },
      /**
       * Registration step
       * Round 1 = Personal Data
       * Round 2 = Skills the user has
       * Round 3 = Skills the user wants to learn
       */
      round: 1,
      /**
       * The Skills that are available -> receive from server
       */
      skills: [],
      /**
       * The number of clicks on the card background
       * -> on change the skillSelector know that there was clicked
       */
      cardClicked: 0
    };
  },
  methods: {
    /**
     * Next Function
     * Switches between the rounds of the registration process and checks the requirements for proceeding
     *  -> From Round 1 to 2:       -> Checks:
     *                                   - Check if the personal Informations are correct (local offline check)
     *                                   - Check if email/username is available           (server online check)
     *                              -> All Checks ok:
     *                                   - increase round by 1 to 2
     *                              -> At least one check failed:
     *                                   - set error flags to true -> display error messages
     *  -> From Round 2 to 3:       -> Checks
     *                                   - Check if mySkills List contains at least one item
     *                              -> If Check is ok (# > 0 Items)
     *                                   - increase round by 1 to 3
     *                              -> If check fails (# < 1 Item)
     *                                   - set error flag to true -> display error message
     * -> From Round 3 to Register: -> Checks:
     *                                   - Check if desiredSkills list contains at least one item
     *                              -> If Check is ok (# > 0 Items)
     *                                   - call Register method
     *                              -> If Check fails (# < 1 Item)
     *                                   - set error flag to true -> display error message
     */

    next() {
      switch (this.round) {
        case 1:
          if (this.validatePersonalData()) {
            this.validateEmail()
              .then(response => {
                if (!response.data.data.exists) this.round++;
                else this.error.email.emailNotAvailable = true;
              })
              .catch(() => {
                this.error.email.emailNotAvailable = true;
              });
          }
          break;
        case 2:
          if (this.validateMySkills()) {
            this.round++;
          }
          break;
        case 3:
          if (this.validateDesiredSkills()) {
            this.register();
          }
      }
    },
    /**
     * Back Function
     * Decrease Registration step
     * if Round > 1 decrease registration round by one
     */
    back() {
      if (this.round > 1) this.round--;
    },
    /**
     * Validate Peronal Data Function
     * @return: boolean ok (status if personal Data is ok)
     * Checks if each personal information is ok (local offline check)
     *  - first- & lastName is not empty
     *  - email is not empty
     *  - email is a vailde email
     *  - password is not empty
     *  - confirmPassword is not empty
     *  - confirmPassowrd is
     */
    validatePersonalData() {
      var ok = true;
      if (this.inputValue.firstName.trim() == "") {
        this.error.firstName = true;
        ok = false;
      } else {
        this.error.firstName = false;
      }
      if (this.inputValue.lastName.trim() == "") {
        this.error.lastName = true;
        ok = false;
      } else {
        this.error.lastName = false;
      }
      if (this.inputValue.email.trim() == "") {
        this.error.email.empty = true;
        ok = false;
      } else {
        this.error.email.empty = false;
      }
      var mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (this.inputValue.email.trim().match(mailformat) == null) {
        this.error.email.noEmail = true;
        ok = false;
      } else {
        this.error.email.noEmail = false;
      }
      if (this.inputValue.password.trim() == "") {
        this.error.password = true;
        ok = false;
      } else {
        this.error.password = false;
      }
      if (this.inputValue.confirmPassword.trim() == "") {
        this.error.confirmPassword.empty = true;
        ok = false;
      } else {
        this.error.confirmPassword.empty = false;
      }
      if (
        this.inputValue.confirmPassword.trim() !=
        this.inputValue.password.trim()
      ) {
        this.error.confirmPassword.notTheSame = true;
        ok = false;
      } else {
        this.error.confirmPassword.notTheSame = false;
      }
      return ok;
    },
    /**
     * Validate Email Function
     * @return: Promise containg the existence of a username (true/false) or a error message if a fatal error has occoured
     * Validates the available of the email/username
     */
    validateEmail() {
      return this.$store.dispatch("userExists", {
        email: this.inputValue.email
      });
    },
    /**
     * Validate my Skills Function
     * @return: boolean that says if my skills are not empty or not
     * checks if mySkills list has more than 0 items
     */
    validateMySkills() {
      if (this.inputValue.mySkills.length <= 0) {
        this.error.mySkills = true;
        return false;
      } else {
        this.error.mySkills = false;
      }
      return true;
    },
    /**
     * Validate desired Skills Function
     * @return: boolean that says if desired skills are not empty or not
     * checks if desiredSkills list has more than 0 items
     */
    validateDesiredSkills() {
      if (this.inputValue.desiredSkills.length <= 0) {
        this.error.desiredSkills = true;
        return false;
      } else {
        this.error.desiredSkills = false;
      }
      return true;
    },
    /**
     * Register Function
     * register takes the inputValues and sends them as an object to the store -> store sends it to server
     * If the response is positive it redirect the user to home
     * Otherwise it checks if the error status is 422 (Unprocessable Entity) -> email (Email) is already chosen -> Activate Alert with emailNotAvailable = true
     *      If the Error status is something else its a critical error -> just displaying it in the console, Maybe further User Notification required
     */
    register() {
      var data = {
        user: {
          first_name: this.inputValue.firstName,
          last_name: this.inputValue.lastName,
          email: this.inputValue.email,
          password: this.inputValue.password
        },
        skills: {
          wants: this.inputValue.desiredSkills,
          has: this.inputValue.mySkills
        }
      };
      this.$store
        .dispatch("registerUser", data)
        .then(() => {
          this.$store
            .dispatch("signinUser", {
              email: this.inputValue.email,
              password: this.inputValue.password
            })
            .then(() => {
              console.log(
                "[UserRegistration]: Successfully Signed In (Registration)!"
              );
              this.$store
              .dispatch("getCurrentUser")
              .then(response => {
                console.log("[UserRegistration]: User is signed in");
                this.$store
                  .dispatch("updateCurrentUser", response.data.data)
                  .then(() => {
                    console.log("[UserRegistration]: Updated data successfully");
                });
                this.$router.push("/home");
              })
            })
            .catch(error => {
              console.log(
                "[UserRegistration]: Error on Sign In (Registration)!",
                error
              );
            });
        })
        .catch(error => {
          if (error.response.status == 422) {
            console.log(
              "[UserRegistration]: Error! This user is already registrated!"
            );
          } else {
            console.log("[UserRegistration]: Error on registration! ", error);
          }
        });
    },
    /**
     * Card Clicked
     * Tells all Skill Selections to hide skillSuggestions
     */
    increaseCardClicked() {
      this.cardClicked++;
    },
    /**
     * Closes Registration Function
     * Closes window by redirecting to start
     */
    close() {
      this.$router.push("/");
    }
  },
  created() {
    /**
     * On create get skills from store -> this loads from server or buffer it locally
     */
    this.$store.dispatch("loadSkills").then(response => {
      console.log("[UserRegistration]: Loaded Skills successfully!");
      this.skills = response.data.data;
    });
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

.error div[role="alert"] {
  color: var(--app-color-error);
  font: var(--app-font-xxxs-regular);
}

.button_card_container {
  min-width: 600px;
  max-width: 600px;
}

#progress {
  position: relative;
  display: flex;
  align-items: center;
  height: 60px;
  margin-top: 25px;
}

#progress svg {
  width: 100%;
  stroke-width: 4px;
  stroke: var(--app-color-light-grey);
}

#progress div {
  position: absolute;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  width: 100%;
  top: calc(50% - 25px);
}

#progress div span {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: var(--app-color-light-grey);
  color: var(--app-color-almost-white);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s ease;
  font: var(--app-font-xs-medium);
}

#progress div span.active {
  background-color: var(--app-color-brand-2);
  color: var(--app-color-almost-white);
}

#progress div span.check {
  position: relative;
}

#progress div span.check:after {
  content: "";
  width: 20px;
  height: 20px;
  position: absolute;
  right: -5px;
  top: -5px;
  background-image: url("../../assets/icons/ok_success.svg");
}

label {
  display: none;
}

.round1 > div:first-child,
.round1 > div:last-child {
  display: grid;
  grid-template-columns: repeat(2, calc(50% - 25px));
  grid-column-gap: 50px;
}

.has_account {
  margin-top: 15px;
}

input {
  width: 100%;
  -webkit-appearance: none;
  outline: none;
  border: none;
  background-color: transparent;
  border-bottom: 2px solid var(--app-color-dark-grey);
  font: var(--app-font-xxxs-regular);
  margin: 5px 0;
}
</style>