<template>
  <div>
    <div v-if="user">
      <h1>{{ getFullName }}</h1>
      <div class="user_details_container">
        <app-button-card
          :justifyContentFooter="(!isCurrentUser ? 'flex-end' : 'space-between')"
          :headerButtons="(isCurrentUser && !editUser ?
                //If user is current User
            [
                { type: 'pen', enabled: true, name: 'editUser' }
            ]:
                //If user is not Current User
            [
            ])"
          :footerButtons="(!isCurrentUser ? 
                //If user is not currentUser
            [
                {type: 'graduation_hat', enabled: true, id: 'request_mentoring', name: 'requestMentoring', title: 'Als Mentor anfragen', textAlignLeft: true }
            ] :
                //If user is currentUser
                (editUser ? 
                [
                    { type: 'cross', name: 'discardChanges', title: 'Änderungen verwerfen', textAlignLeft: false, isPrimary: false},
                    { type: 'ok', name: 'applyChanges', title: 'Änderungen speichern', textAlignLeft: true}
                ] 
                : [ ])
                //If User is current User and does get edited
            )"
          @editUserHeaderButtonClicked="enableEditUser"
          @requestMentoringFooterButtonClicked="requestMentoring"
          @applyChangesFooterButtonClicked="applyChanges"
          @discardChangesFooterButtonClicked="discardChanges"
          :overflowVisible="true"
        >
          <app-user-details
            :user="user"
            :isCurrentUser="isCurrentUser"
            :userEdit="editUser"
            :handleChangesApplyThem="handleChangesApplyThem"
            @updateUser="updateUser"
            @updateSuccessful="closeEditStatus"
          />
        </app-button-card>
        <div class="further_information">
          <div>
            <app-button-card
              :headerButtons="(isCurrentUser ? 
                        //user is current User
                    [
                        {type:'info', name: 'infoRank'}
                    ] :
                        //user is not current User
                    [
                    ])"
              :footerButtons="(isCurrentUser ? 
                        //If user is not currentUser
                    [
                        {type: 'star', enabled: true, name: 'requestRank', title: 'Rang beantragen', textAlignLeft: true }
                    ] : 
                        //If user is currentUser
                    [ 
                    ])"
              justifyContentFooter="flex-end"
            >
              <app-list-with-title title="Rang" :list="getUserRank" />
            </app-button-card>
            <app-button-card
              v-if="isCurrentUser"
              :headerButtons="(isCurrentUser ? 
                            //user is current User
                        [
                            {type:'info', name: 'infoCredits'}
                        ] :
                            //user is not current User
                        [
                        ])"
            >
              <app-list-with-title title="Credits" :list="getUserCredits" />
            </app-button-card>
          </div>
          <div>
            <app-button-card>
              <h3>{{(isCurrentUser ? 'Aktive Mentorings' : 'Gemeinsame Mentorings')}}</h3>
              <table class="mentoring_table">
                <tr v-for="(mentoring, i) in getMentorings" :key="i">
                  <td>{{mentoring.other_user.first_name}}</td>
                  <td>{{mentoring.other_skill.name}}</td>
                </tr>
              </table>
            </app-button-card>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="error">
      <h1>Sorry, der User ist leider nicht registriert!</h1>
    </div>
  </div>
</template>

<script>
import ButtonCard from "./../shared/parts/ButtonCard.vue";
import UserDetails from "./UserDetails.vue";
import ListWithTitle from "./../shared/parts/ListWithTitle.vue";
import { status } from "./../../main";

export default {
  components: {
    appButtonCard: ButtonCard,
    appUserDetails: UserDetails,
    appListWithTitle: ListWithTitle
  },
  props: {
    id: undefined
  },
  data() {
    return {
      /**
       * The user to display
       */
      user: undefined,
      /**
       * Holding User Changes
       */
      userId: -1,
      /**
       * Boolean if User is Current User
       */
      isCurrentUser: true,
      /**
       * Boolean if User Details get edited
       */
      editUser: false,
      /**
       * Indicates if User Details should get applyed (true) or discarded
       */
      handleChangesApplyThem: status.unset,
      /**
       * Contains the own mentorings
       */
      userMentorings: undefined,
      /**
       * If an error has occured
       * e.g. the user is not available
       */
      error: false
    };
  },
  methods: {
    /**
     * Enables the edit mode of the user data
     */
    enableEditUser() {
      this.editUser = true;
    },
    /**
     * Applies the changes -> changes status to success for the moment and reset it after some time to update data -> watch need a change to update
     */
    applyChanges() {
      setTimeout(() => {
        this.handleChangesApplyThem = status.undefined;
      }, 200);
      this.handleChangesApplyThem = status.success;
    },
    /**
     * Set the status to error
     */
    discardChanges() {
      this.handleChangesApplyThem = status.error;
    },
    /**
     * Closes the editing mode
     */
    closeEditStatus() {
      this.editUser = false;
    },
    /**
     * Updates the User Data
     * if initial and it is the current user, just get the user from the store -> no changes can be there
     * if not get the user data from the server and update some attributes like if it is the current user
     */
    updateUser(initial) {
      this.error = false;
      if (initial && this.userId == this.$store.getters.getId) {
        this.user = this.$store.getters.getCurrentUser;
      } else {
        this.$store
          .dispatch("getUserById", this.userId)
          .then(response => {
            console.log("[User]: Loaded User Data successfully!");
            this.user = response.data.data;
            this.isCurrentUser = this.user.email != undefined;
            if (this.isCurrentUser) {
              this.$store
                .dispatch("updateCurrentUser", response.data.data)
                .then(() => {
                  console.log("[User]: Updated data successfully");
                })
                .catch(err => {
                  console.log(
                    "[User]: Error on updating current User in User.vue",
                    err
                  );
                  this.error = true;
                });
            }
          })
          .catch(error => {
            console.log("[User]: Error on receiving User by Id", error);
            this.error = true;
          });
      }
    },
    /**
     * Initialized the data if a user id is given
     */
    initializeData() {
      /**
       * Get UserId from query parameter of url
       * If userId Is given load user data
       * if userid is not given redirect to home
       */
      this.userId = this.$route.query.id;
      if (this.userId) {
        this.updateUser(true);
      } else {
        this.$router.push("/home");
      }

      /**
       * Get Mentorings from User
       */
      this.$store
        .dispatch("getMentorings")
        .then(response => {
          console.log("[User]: Mentorings: ", response.data.data);
          if (this.isCurrentUser) {
            this.userMentorings = response.data.data;
          } else {
            var arr = [];
            response.data.data.forEach(mentoring => {
              if (mentoring.other_user.id == this.user.id) {
                arr.push(mentoring);
              }
            });
            this.userMentorings = arr;
          }
        })
        .catch(err => {
          console.log("[User]: Error on loading mentorings! ", err);
        });
    },
    /**
     * TODO: Method to request other user for mentoring
     */
    requestMentoring() {
      console.log("[User][TODO]: Request other User for mentoring");
    }
  },
  computed: {
    /**
     * @return both first and last name as one string
     */
    getFullName: function() {
      if (this.user) {
        return this.user.first_name + " " + this.user.last_name;
      }
      return "";
    },
    getUserRank: function() {
      var arr = new Array();
      arr.push(this.user.rank);
      return arr;
    },
    getUserCredits: function() {
      var arr = new Array();
      arr.push(this.user.rank);
      return arr;
    },
    getMentorings: function() {
      var arr = new Array();
      if (this.userMentorings)
        this.userMentorings.forEach(mentoring => {
          if (mentoring.other_user) arr.push(mentoring);
        });
      return arr;
    }
  },
  created() {
    this.initializeData();
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
h1 {
  margin-top: 25px;
  padding-left: 35px;
}
.user_details_container {
  margin: 20px 30px;
}
.button_card_container {
  width: 100%;
  margin-bottom: 70px;
}
.user_details_container > .further_information {
  display: grid;
  grid-template-columns: repeat(2, calc(50% - 20px));
  grid-column-gap: 40px;
}
.mentoring_table {
  width: 100%;
}
.mentoring_table tr:not(:first-child) {
  border-top: 2px solid var(--app-color-light-grey);
}
.mentoring_table td {
  padding: 10px 0;
}
.mentoring_table td:first-child {
  font: var(--app-font-xxs-bold);
}
.mentoring_table td:nth-child(2) {
  font: var(--app-font-xxs-regular);
}
</style>