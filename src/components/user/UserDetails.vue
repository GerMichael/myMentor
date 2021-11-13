<template>
  <div @mousedown.stop="increaseCardClicked">
    <section class="user_details_person" :class="{editable: isCurrentUser}">
      <app-text-with-title title="Vorname" v-model="tempUser.first_name" :edit="userEdit">
        <transition name="error-shake" slot="error">
          <div role="alert" v-if="error.firstName">Der Vorname darf nicht leer bleiben!</div>
        </transition>
      </app-text-with-title>
      <app-text-with-title title="Nachname" v-model="tempUser.last_name" :edit="userEdit">
        <transition name="error-shake" slot="error">
          <div role="alert" v-if="error.lastName">Der Nachname darf nicht leer bleiben!</div>
        </transition>
      </app-text-with-title>
      <app-text-with-title title="Email" v-model="tempUser.email" :edit="userEdit">
        <transition name="error-shake" slot="error">
          <div role="alert" v-if="error.email.empty">Die Email-Adresse darf nicht leer bleiben!</div>
        </transition>
        <transition name="error-shake" slot="error">
          <div
            role="alert"
            v-if="error.email.invalid"
          >Die Email-Adresse entspricht keinem gültigen Format!</div>
        </transition>
      </app-text-with-title>
    </section>
    <section class="user_details_skills">
      <div>
        <template v-if="!userEdit">
          <app-list-with-title
            :title="`Das kann ${(isCurrentUser ? 'ich' : user.first_name)} anderen lehren`"
            :list="tempUser.has_skills"
            :edit="userEdit"
          />
        </template>
        <template v-else>
          <div>
            <app-skill-selection
              v-model="tempUser.has_skills"
              :skills="skills"
              :title="`Das kann ${(isCurrentUser ? 'ich' : user.first_name)} anderen lehren`"
              idValue="mySkills"
              placeholderValue="Meine Skills"
              :cardClicked="cardClicked"
            />
          </div>
        </template>
      </div>
      <div>
        <template v-if="!userEdit">
          <app-list-with-title
            :title="`Das möchte ${(isCurrentUser ? 'ich' : user.first_name)} lernen`"
            :list="tempUser.wants_skills"
            :edit="userEdit"
          />
        </template>
        <template v-else>
          <div>
            <app-skill-selection
              v-model="tempUser.wants_skills"
              :skills="skills"
              :title="`Das möchte ${(isCurrentUser ? 'ich' : user.first_name)} lernen`"
              idValue="wantedSkills"
              placeholderValue="Gesuchten Skills"
              :cardClicked="cardClicked"
            />
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import TextWithTitle from "./../shared/parts/TextWithTitle.vue";
import ListWithTitle from "./../shared/parts/ListWithTitle.vue";
import SkillSelection from "./../start/SkillSelection.vue";
import { status } from "./../../main";

export default {
  components: {
    appTextWithTitle: TextWithTitle,
    appListWithTitle: ListWithTitle,
    appSkillSelection: SkillSelection
  },
  props: {
    /**
     * The user to display
     */
    user: {
      type: Object,
      required: true
    },
    /**
     * Indicates if the user is the current signed in user
     */
    isCurrentUser: {
      type: Boolean,
      default: false
    },
    /**
     * Indicates if User Details get edited
     */
    userEdit: {
      type: Boolean,
      default: false
    },
    /**
     * Indicates if User Details should get applyed (true) or discarded
     */
    handleChangesApplyThem: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      /**
       * User Data temporary stored to save changes
       */
      tempUser: {},
      /**
       * Skills available for Skill selection
       */
      skills: [],
      /**
       * The number of clicks on the card background
       * -> on change the skillSelector know that there was clicked
       */
      cardClicked: 0,
      /**
       * UpdateStatus
       */
      updateStatus: {
        personalData: 0,
        hasSkills: 0,
        wantsSkills: 0
      },
      /**
       * User Errors on personal Data
       */
      error: {
        firstName: false,
        lastName: false,
        email: {
          empty: false,
          invalid: false
        }
      }
    };
  },
  methods: {
    /**
     * Emits event to close Edit status
     */
    closeEditStatus() {
      this.$emit("updateSuccessful");
    },
    /**
     * Apply the changes
     *  -> Compare (find) the changes
     */
    applyChanges() {
      if (this.compareUserData()) this.closeEditStatus();
    },
    /**
     * Discard the changes
     *  -> Override local copy
     */
    discardChanges() {
      this.overrideTempUser();
      this.closeEditStatus();
    },
    /**
     * Override local copy
     * -> ensure to copy no references instead real content -> recursive copy
     * -> normalize skill_array format -> differences in declaration: skill.name and skill.skill_name
     */
    overrideTempUser() {
      this.tempUser = this.copyObject(this.user);
      this.convertSkillArray(this.tempUser.wants_skills);
      this.convertSkillArray(this.tempUser.has_skills);
    },
    /**
     * Calls the update process for
     *  - personal information - sets error, if input value is not valid
     *  - has skills
     *  - wants skills
     * @return if an error occured
     */
    compareUserData() {
      var error = false;
      error = this.updateUsersPersonalInformation();
      this.updateUserHasSkills();
      this.updateUserWantsSkills();
      return error;
    },
    /**
     * Compares the users personal data like name or email
     * and updates the changes if required
     * @return if the user enters invalid data
     */
    updateUsersPersonalInformation() {
      this.updateStatus.personalData = 0;

      if (!this.checkPersonalInformationOnErros()) return false;

      var changes = this.addChangesOfPersonalData();
      if (Object.keys(changes.userData).length === 0) return true;
      changes.userId = this.tempUser.id;

      this.$store
        .dispatch("updateUser", changes)
        .then(() => {
          console.log("[UserDetails]: Successfully updated personal data");
        })
        .catch(err => {
          console.log("[UserDetails]: Error on updating personal data", err);
        });
      return true;
    },
    /**
     * Compares all the users personal data like name and email and returns the update Data
     * @return an object with the changes
     */
    addChangesOfPersonalData() {
      var changes = { userData: {} };
      if (this.tempUser.first_name != this.user.first_name)
        changes.userData.first_name = this.tempUser.first_name;
      if (this.tempUser.last_name != this.user.last_name)
        changes.userData.last_name = this.tempUser.last_name;
      /* if(this.tempUser.email != this.user.email) -> issue, that all emails get deleted */ changes.userData.email = this.tempUser.email;

      return changes;
    },
    /**
     * Checks the users personal data on errors
     * @return if the data is valid
     */
    checkPersonalInformationOnErros() {
      var error = false;

      this.error.firstName = this.tempUser.first_name == "";
      if (this.error.firstName) error = this.error.firstName;

      this.error.lastName = this.tempUser.last_name == "";
      if (this.error.lastName) error = this.error.lastName;

      this.error.email.empty = this.tempUser.email == "";
      if (this.error.email.empty) error = this.error.email.empty;

      var mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.error.email.invalid =
        this.tempUser.email.trim().match(mailformat) == null;
      if (this.error.email.invalid) error = this.error.email.invalid;

      return !error;
    },
    /**
     * Compares the users skills he has
     * Fist set the updateStatus to 0, increase it, if changes are done
     */
    updateUserHasSkills() {
      this.updateStatus.hasSkills = 0;
      var skillChanges = this.compareSkills(true);
      if (
        skillChanges.newSkills.length === 0 &&
        skillChanges.removedSkills == 0
      )
        return;
      this.$store
        .dispatch("addUsersNewHasSkills", skillChanges.newSkills)
        .then(() => {
          this.updateStatus.hasSkills++;
        })
        .catch(err => {
          console.log(
            "[UserDetails]: Error on adding new User Has Skills",
            err
          );
        });
      this.$store
        .dispatch("removeUsersNewHasSkills", skillChanges.removedSkills)
        .then(() => {
          this.updateStatus.hasSkills++;
        })
        .catch(err => {
          console.log(
            "[UserDetails]: Error on removing new User Has Skills",
            err
          );
        });
    },
    /**
     * Compares the users skills he desires
     * Fist set the updateStatus to 0, increase it, if changes are done
     */
    updateUserWantsSkills() {
      this.updateStatus.wantsSkills = 0;
      var skillChanges = this.compareSkills(false);
      if (
        skillChanges.newSkills.length === 0 &&
        skillChanges.removedSkills == 0
      )
        return;
      this.$store
        .dispatch("addUsersNewWantsSkills", skillChanges.newSkills)
        .then(() => {
          this.updateStatus.wantsSkills++;
        })
        .catch(err => {
          console.log(
            "[UserDetails]: Error on adding new User Wants Skills",
            err
          );
        });
      this.$store
        .dispatch("removeUsersNewWantsSkills", skillChanges.removedSkills)
        .then(() => {
          this.updateStatus.wantsSkills++;
        })
        .catch(err => {
          console.log(
            "[UserDetails]: Error on removing new User Wants Skills",
            err
          );
        });
    },
    /**
     * Checks which skills are new and which are old
     * @param isHasSkillsType indicates which lists has to be checked
     * @return an object with the list of new and removed skills
     */
    compareSkills(isHasSkillsType) {
      var arrNew = isHasSkillsType
          ? this.tempUser.has_skills
          : this.tempUser.wants_skills,
        arrOld = isHasSkillsType
          ? this.copyArray(this.user.has_skills)
          : this.copyArray(this.user.wants_skills);
      this.convertSkillArray(arrOld);
      var newSkills = this.compareArrays(arrNew, arrOld);
      var removedSkills = this.compareArrays(arrOld, arrNew);
      return { newSkills, removedSkills };
    },
    /**
     * Compares two skill Lists
     * @param arrWithMoreItems the list with more items that has to be found
     * @param otherArr the list with less itmes
     * @return a new list containing all skills that the first list has in addition
     */
    compareArrays(arrWithMoreItems, otherArr) {
      var arr1 = arrWithMoreItems,
        arr2 = otherArr;
      var arrDiff = [];
      for (let i = 0; i < arr1.length; i++) {
        if (!arr2.includes(arr1[i])) arrDiff.push(arr1[i]);
      }
      return arrDiff;
    },
    /**
     * @param obj: Input object that have to be copied
     * @return: new Object
     * Runs trough all object keys and returns a new object with the same values
     * If it contains other Arrays or Objects -> dive into it recursively
     */
    copyObject(obj) {
      var newObj = {};
      for (var key in obj) {
        if (Array.isArray(obj[key])) newObj[key] = this.copyArray(obj[key]);
        else if (typeof obj[key] == "object")
          newObj[key] = this.copyObject(obj[key]);
        else newObj[key] = obj[key];
      }
      return newObj;
    },
    /**
     * @param arr: Input array that have to be copied
     * @return new Array
     * Runs trough all array spaces and returns a new array with the same values
     * If it contains other Arrays or Objects -> dive into it recursively
     */
    copyArray(arr) {
      var newArr = [];
      for (var i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) newArr.push(this.copyArray(arr[i]));
        else if (typeof arr[i] == "object")
          newArr.push(this.copyObject(arr[i]));
        else newArr.push(arr[i]);
      }
      return newArr;
    },
    /**
     * Card Clicked
     * Tells all Skill Selections to hide skillSuggestions
     */
    increaseCardClicked() {
      this.cardClicked++;
    },
    /**
     * Convert Skill Objects to String
     */
    convertSkillArray(arr) {
      for (var i = 0; i < arr.length; i++) {
        var skill = arr[i];
        if (typeof skill != "string") {
          if (skill.name) skill = skill.name;
          if (skill.skill_name) skill = skill.skill_name;
        }
        arr[i] = skill;
      }
    }
  },
  computed: {
    /**
     * @return a copy of the skills the user has
     */
    getUserHasSkills: function() {
      var hasSkillNames = [];
      this.tempUser.has_skills.forEach(skill => {
        hasSkillNames.push(skill.skill_name);
      });
      return hasSkillNames;
    },
    /**
     * @return a copy of the skills the user desires
     */
    getUserWantsSkills: function() {
      var wantsSkillNames = [];
      this.tempUser.wants_skills.forEach(skill => {
        wantsSkillNames.push(skill.skill_name);
      });
      return wantsSkillNames;
    }
  },
  watch: {
    /**
     * watch the user object - if it changes override the local copy
     */
    user: {
      handler: function() {
        this.overrideTempUser();
      },
      deep: true
    },
    /**
     * handle the new changes
     * if newVal == success the new values has to be applied
     * else the new values has to be discarded
     */
    handleChangesApplyThem: function(newVal) {
      if (newVal == status.success) {
        this.applyChanges();
      } else if (newVal == status.error) {
        this.discardChanges();
      }
    },
    /**
     * Checks the update Status
     * if all where updated the update is finished
     */
    updateStatus: {
      handler: function() {
        if (this.updateStatus.personalData > 0) {
          console.log("[UserDetails]: Updated User Personal Data succesfully!");
        }
        if (this.updateStatus.hasSkills > 1) {
          console.log("[UserDetails]: Updated User Has Skills succesfully!");
        }
        if (this.updateStatus.wantsSkills > 1) {
          console.log("[UserDetails]: Updated User Wants Skills succesfully!");
        }
      },
      deep: true
    }
  },
  created() {
    // Override local user copy
    this.overrideTempUser();

    //Load skills
    this.$store.dispatch("loadSkills").then(response => {
      console.log("[UserDetails]: Loaded Skills successfully!");
      this.skills = response.data.data;
    });
  }
};
</script>

<style scoped>
.user_details_person {
  display: grid;
  grid-template-columns: calc(25% - 10px) calc(25% - 10px) 50%;
  grid-column-gap: 10px;
  margin-top: 10px;
  padding-bottom: 25px;
  border-bottom: 1.5px solid var(--app-color-brand-2);
  min-height: 82px;
}
.error div[role="alert"] {
  color: var(--app-color-error);
  font: var(--app-font-xxxs-regular);
}
.user_details_person.editable {
  grid-template-columns:
    calc(25% - 30px - 10px) calc(25% - 30px - 10px) calc(50% - 30px - 10px)
    90px;
}
.user_details_skills {
  padding-top: 25px;
  display: grid;
  grid-template-columns: repeat(2, calc(50% - 5px));
  grid-column-gap: 10px;
}
.user_details_skills > div > div {
  display: grid;
  grid-template-columns: auto 90px;
}
.user_details_skills > div > div > .skillEditButton,
.persDataEditButtons {
  display: grid !important;
  grid-template-columns: repeat(2, 50%);
}
.edit {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>