<template>
  <div class="mentorings_container">
    <h1>Menteegruppen</h1>
    <div v-if="loaded">
      <app-filter-list
        :lists="[
                { list: activeMentorings, 
                compareFunction: (el)=>{ return el.other_skill.name },
                title: 'aktiv'
                },
                { list: finishedMentorings, 
                compareFunction: (el)=>{ return el.other_skill.name },
                title: 'abgeschlossen'
                }
            ]"
        :selectedList="selectedSkillPerCategory"
        :multiSelect="false"
      />
      <div class="user_select">
        <h4>{{selectedSkill.skill}}</h4>
        <ul>
          <li
            v-for="(user, i) in getUsersForSelectedSkill"
            :key="i"
            @click="updateSelectedUser(user)"
            :class="{selected: user.id == selectedUser.id}"
          >{{ user.first_name }}</li>
        </ul>
      </div>
      <transition name="fadeH" mode="out-in">
        <app-button-card
          :key="JSON.stringify(selectedMentoring)"
          :withPadding="false"
          :headerButtons="(selectedMentoring.is_active ? [
                        { type:'messages', name: 'chat' },
                        { type:'calendar', name: 'calendar' },
                        { type:'timer', name: 'timer' }
                    ]: [])"
          :footerButtons="(selectedMentoring.is_active ? [
                        { type:'cross', name: 'dissolveMentoring', title:'Mentoring auflösen', isPrimary:false},
                        { type:'ok', name: 'closeMentoring', title:'Mentoring abschließen', textAlignLeft: true}
                    ] : [])"
        >
          <app-group-mentoring :groupMentor="selectedMentoring" />
        </app-button-card>
      </transition>
    </div>
    <app-button-card v-if="!loaded">
      <p>Aktuell stehen keine Mentorings zur Verfügung.</p>
    </app-button-card>
  </div>
</template>

<script>
import FilterList from "./../shared/parts/FilterList.vue";
import ButtonCard from "./../shared/parts/ButtonCard.vue";
import GroupMentoring from "./GroupMentoring.vue";
import { matchBus } from "./../../main";

export default {
  components: {
    /**
     * Filter Categories (Fields)
     */
    appFilterList: FilterList,
    /**
     * Card with Buttons displaying the current selected mentoring
     */
    appButtonCard: ButtonCard,
    /**
     * Displays the mentoring details
     */
    appGroupMentoring: GroupMentoring
  },
  data() {
    return {
      /**
       * Indicates if data is loaded
       */
      loaded: false,
      /**
       * Current Selected Skill to filter the matches
       * Category = active/inactive
       */
      selectedSkillPerCategory: ["", ""],
      /**
       * Selected Skill
       */
      selectedSkill: null,
      /**
       * Selected User
       */
      selectedUser: null,
      /**
       * Selected Mentoring
       */
      selectedMentoring: null,
      /**
       * All Matches that get displayed
       * TODO: Load from server
       */
      activeMentorings: [
        {
          is_active: true,
          mentoring_id: 1,

          other_user: {
            first_name: "1",
            last_name: "Bauer",
            id: 123423
          },
          own_skill: {
            id: 12,
            name: "3D-Programm Maya",
            fields: []
          },
          other_skill: {
            id: 10,
            name: "Klötze schieben (objektorientiert)",
            fields: []
          },
          mentees: [
            {
              first_name: "Jonas",
              last_name: "Bauer",
              id: 123423
            },
            {
              first_name: "Josef",
              last_name: "Bauer",
              id: 123423
            },
            {
              first_name: "Karl",
              last_name: "Bauer",
              id: 123423
            },
            {
              first_name: "Peter",
              last_name: "Bauer",
              id: 123423
            }
          ]
        },
        {
          other_user: {
            first_name: "1",
            last_name: "Bauer",
            id: 123423
          },
          own_skill: {
            id: 12,
            name: "Python"
          },
          other_skill: {
            id: 10,
            name: "JavaScript"
          },
          mentees: [
            {
              first_name: "Jonas",
              last_name: "Bauer",
              id: 123423
            },
            {
              first_name: "Josef",
              last_name: "Bauer",
              id: 123423
            },
            {
              first_name: "Karl",
              last_name: "Bauer",
              id: 123423
            },
            {
              first_name: "Peter",
              last_name: "Bauer",
              id: 123423
            }
          ]
        },
        {
          other_user: {
            first_name: "1",
            last_name: "Bauer",
            id: 156
          },
          own_skill: {
            id: 12,
            name: "JavaScript"
          },
          other_skill: {
            id: 10,
            name: "Maya"
          },
          mentees: [
            {
              first_name: "Jonas",
              last_name: "Bauer",
              id: 123423
            },
            {
              first_name: "Josef",
              last_name: "Bauer",
              id: 123423
            },
            {
              first_name: "Karl",
              last_name: "Bauer",
              id: 123423
            },
            {
              first_name: "Peter",
              last_name: "Bauer",
              id: 123423
            }
          ]
        },
        {
          other_user: {
            first_name: "2",
            last_name: "Bauer",
            id: 123423
          },
          own_skill: {
            id: 12,
            name: "JavaScript"
          },
          other_skill: {
            id: 10,
            name: "Maya"
          },
          mentees: [
            {
              first_name: "Jonas",
              last_name: "Bauer",
              id: 123423
            },
            {
              first_name: "Josef",
              last_name: "Bauer",
              id: 123423
            },
            {
              first_name: "Karl",
              last_name: "Bauer",
              id: 123423
            },
            {
              first_name: "Peter",
              last_name: "Bauer",
              id: 123423
            }
          ]
        }
      ],
      finishedMentorings: [
        {
          other_user: {
            first_name: "1",
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
          },
          mentees: [
            {
              first_name: "Jonas",
              last_name: "Bauer",
              id: 123423
            },
            {
              first_name: "Josef",
              last_name: "Bauer",
              id: 123423
            },
            {
              first_name: "Karl",
              last_name: "Bauer",
              id: 123423
            },
            {
              first_name: "Peter",
              last_name: "Bauer",
              id: 123423
            }
          ]
        },
        {
          other_user: {
            first_name: "1",
            last_name: "Bauer",
            id: 123423
          },
          own_skill: {
            id: 12,
            name: "Python"
          },
          other_skill: {
            id: 10,
            name: "JavaScript"
          },
          mentees: [
            {
              first_name: "Jonas",
              last_name: "Bauer",
              id: 123423
            },
            {
              first_name: "Josef",
              last_name: "Bauer",
              id: 123423
            },
            {
              first_name: "Karl",
              last_name: "Bauer",
              id: 123423
            },
            {
              first_name: "Peter",
              last_name: "Bauer",
              id: 123423
            }
          ]
        },
        {
          other_user: {
            first_name: "1",
            last_name: "Bauer",
            id: 123423
          },
          own_skill: {
            id: 12,
            name: "JavaScript"
          },
          other_skill: {
            id: 10,
            name: "Maya"
          },
          mentees: [
            {
              first_name: "Jonas",
              last_name: "Bauer",
              id: 123423
            },
            {
              first_name: "Josef",
              last_name: "Bauer",
              id: 123423
            },
            {
              first_name: "Karl",
              last_name: "Bauer",
              id: 123423
            },
            {
              first_name: "Peter",
              last_name: "Bauer",
              id: 123423
            }
          ]
        },
        {
          other_user: {
            first_name: "2",
            last_name: "Bauer",
            id: 123423
          },
          own_skill: {
            id: 12,
            name: "JavaScript"
          },
          other_skill: {
            id: 10,
            name: "Maya"
          },
          mentees: [
            {
              first_name: "Jonas",
              last_name: "Bauer",
              id: 123423
            },
            {
              first_name: "Josef",
              last_name: "Bauer",
              id: 123423
            },
            {
              first_name: "Karl",
              last_name: "Bauer",
              id: 123423
            },
            {
              first_name: "Peter",
              last_name: "Bauer",
              id: 123423
            }
          ]
        }
      ]
    };
  },
  computed: {
    /**
     * Get all available users for selected mentoring
     * @return list of users
     */
    getUsersForSelectedSkill: function() {
      var users = [];
      var arr = this.getMatchesArray();

      var skillName = this.selectedSkill.skill;
      arr.forEach(mentoring => {
        if (mentoring.other_skill.name == skillName) {
          users.push(mentoring.other_user);
        }
      });

      users = this.getUniqueElementsFromList(users);
      return users;
    }
  },
  methods: {
    /**
     * Returns all unique elments of list (value specific)
     * @param arr the array containing all objects
     * @return all unique objects of the list
     * iterates through all elements of list and compare it with all unique elements found so far
     */
    getUniqueElementsFromList(arr) {
      var uniqueElements = [];
      for (let el of arr) {
        var contains = false;
        for (let uniq of uniqueElements) {
          if (typeof el == typeof uniq) {
            if (Array.isArray(el)) {
              if (this.compareArrays(el, uniq)) {
                contains = true;
              }
            } else if (typeof el == "object") {
              if (this.compareObjects(el, uniq)) {
                contains = true;
              }
            } else {
              if (el == uniq) {
                contains = true;
              }
            }
          }
        }
        if (!contains) {
          uniqueElements.push(el);
        }
      }
      return uniqueElements;
    },
    /**
     * @param obj1: first object
     * @param obj2: other object
     * @return: if all values in both objects are the same
     * if they contain objects/arrays -> iteration recursively
     */
    compareObjects(obj1, obj2) {
      var objSame = true;
      for (var key in obj1) {
        // Check if the key exists in the other object if not -> not the same
        if (obj2[key]) {
          //Checks if the keys in both objects have the same type if not -> not the same
          if (typeof obj1[key] != typeof obj2[key]) {
            objSame = false;
          } else {
            //Checks if the key is an array -> compare arrays
            if (Array.isArray(obj1[key])) {
              if (!this.compareArrays(obj1[key], obj2[key])) {
                objSame = false;
              }
              // else Checks if the key is an object -> compare objects
            } else if (typeof obj1[key] == "object") {
              if (!this.compareObjects(obj1[key], obj2[key])) {
                objSame = false;
              }
              //Else compare the values (primitive type)
            } else {
              if (obj1[key] != obj2[key]) {
                objSame = false;
              }
            }
          }
        }
      }
      return objSame;
    },
    /**
     * @param arr1: first object
     * @param arr2: other object
     * @return: if all values in both arrays are the same
     * if they contain objects/arrays -> iteration recursively
     */
    compareArrays(arr1, arr2) {
      var arrSame = true;
      for (var i in arr1) {
        if (typeof arr1[i] != typeof arr2[i]) {
          arrSame = false;
        } else {
          if (Array.isArray(arr1[i])) {
            if (!this.compareArrays(arr1[i], arr2[i])) {
              arrSame = false;
            }
          } else if (typeof arr1[i] == "object") {
            if (!this.compareObjects(arr1[i], arr2[i])) {
              arrSame = false;
            }
          } else {
            if (arr1[i] != arr2[i]) {
              arrSame = false;
            }
          }
        }
      }
      return arrSame;
    },
    /**
     * Update the skill
     */
    updateSkill() {
      for (var i in this.selectedSkillPerCategory) {
        var skill = this.selectedSkillPerCategory[i];
        if (skill) {
          this.selectedSkill = { category: i, skill };
          break;
        }
      }
      this.updateSelectedUser(this.getUsersForSelectedSkill[0]);
    },
    /**
     * Update the selected User
     * @param user: The new User
     */
    updateSelectedUser(user) {
      this.selectedUser = user;
      this.updateSelectedMentoring();
    },
    /**
     * Update Selected Mentoring
     */
    updateSelectedMentoring() {
      var userId = this.selectedUser.id;
      var skillName = this.selectedSkill.skill;
      var arr = this.getMatchesArray();

      for (var mentoring of arr) {
        if (
          mentoring.other_user.id == userId &&
          mentoring.other_skill.name == skillName
        ) {
          this.selectedMentoring = mentoring;
          break;
        }
      }
    },
    /**
     * Returns the Array of the active matches or the finished matches corresponding to the selected skill
     */
    getMatchesArray() {
      var arr =
        this.selectedSkillPerCategory[0] != ""
          ? this.activeMentorings
          : this.inactiveMentorings;
      if (this.selectedSkill.category == 1) arr = this.finishedMentorings;
      return arr;
    },
    /**
     * Close a mentoring
     * @param mentoring: the mentoring to close
     */
    closeMentoring(mentoring) {
      console.log("[Mentoring]: close ", mentoring);
      this.$store
        .dispatch("deactivateMentoring", mentoring.mentoring_id)
        .then(() => {
          console.log("[Mentoring]: Successfully closed mentoring");
          this.updateMentorings();
        })
        .catch(error => {
          console.log("[Mentoring]: Error on closing Mentoring: ", error);
        });
    },
    /**
     * Split the mentorings into active and inactive
     * @param mentorings
     * @return Object containing splitted mentorings as arrays/list
     */
    splitMentorings(mentorings) {
      var activeMentorings = [],
        inactiveMentorings = [];

      mentorings.forEach(mentoring => {
        if (mentoring.is_active) activeMentorings.push(mentoring);
        else inactiveMentorings.push(mentoring);
      });

      return { activeMentorings, inactiveMentorings };
    },
    /**
     * Update Mentorings
     */
    updateMentorings() {
      this.$store
        .dispatch("getMentorings")
        .then(response => {
          console.log(
            "[Mentoring]: Successfully received mentorings",
            response.data
          );
          var splittedMentorings = this.splitMentorings(response.data.data);
          this.activeMentorings = splittedMentorings.activeMentorings;
          this.inactiveMentorings = splittedMentorings.inactiveMentorings;
          console.log(
            "[Mentoring]: active: ",
            this.activeMentorings,
            " inactive: ",
            this.inactiveMentorings
          );

          //Select first match
          if (this.activeMentorings[0]) {
            this.selectedSkillPerCategory[0] = this.activeMentorings[0].other_skill.name;
            this.updateSkill();
            this.updateSelectedUser(this.activeMentorings[0].other_user);
          } else if (this.inactiveMentorings[0]) {
            this.selectedSkillPerCategory[1] = this.inactiveMentorings[0].other_skill.name;
            this.updateSkill();
            this.updateSelectedUser(this.inactiveMentorings[0].other_user);
          }

          this.loaded = true;
        })
        .catch(err => {
          console.log("[Mentoring]: Error on receiving mentorings", err);
        });
    }
  },

  created() {
    this.loaded = true;
    this.selectedSkillPerCategory[0] = this.activeMentorings[0].other_skill.name;
    this.updateSkill();
    this.updateSelectedUser(this.activeMentorings[0].other_user);
  },
  /**
   * Destroy Listener
   */
  beforeDestroy() {
    matchBus.$off("acceptMatch");
    matchBus.$off("rejectMatch");
  },
  watch: {
    /**
     * Watch the selected Skill Per Category, on change update selected Skill
     */
    selectedSkillPerCategory: {
      handler: function() {
        this.updateSkill();
      },
      deep: true
    }
  }
};
</script>

<style scoped>
h1 {
  margin-bottom: 15px;
}
.mentorings_container {
  margin-bottom: 50px;
}
.mentorings_container > h1,
.mentorings_container > h2 {
  padding-left: 35px;
}
.filter_list_container {
  margin-left: 35px;
}
.button_card_container {
  width: calc(100% - 35px);
  margin-left: 35px;
}
.user_select {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  padding: 30px 0 50px 35px;
}
.user_select * {
  padding: 0;
  margin: 0;
}
.user_select ul {
  list-style: none;
  display: flex;
  align-items: center;
  min-height: 100%;
  margin-left: 20px;
}
.user_select li {
  margin-right: 20px;
  font-size: 20px;
  text-transform: lowercase;
  color: var(--app-color-dark-grey);
  cursor: pointer;
  font: var(--app-font-xxs-regular);
}
.user_select li.selected {
  color: var(--app-color-brand-2);
}
</style>