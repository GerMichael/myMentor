<template>
  <div>
    <div class="cover" v-if="isFocused" @click="blurSkillSelection"></div>
    <span class="headline">{{ title }}</span>
    <div
      :id="idValue"
      class="skill_selection_container"
      :class="{empty:!value.length, focused: isFocused}"
    >
      <div class="choosen_skills" v-if="value.length" @click="blurSkillSelection">
        <!-- Skill List -->
        <transition-group name="zoomInRight" mode="out-in" tag="span">
          <span v-for="(skill, i) in value" :key="skill" @click.stop>
            {{ skill }}
            <span @click="removeSkill(i)" class="remove_skill"></span>
          </span>
        </transition-group>
      </div>
      <!-- Skill Input -->
      <div>
        <app-input
          type="text"
          :title="placeholderValue"
          v-model="newSkill"
          @input="updateSuggestions"
          @focus="inputFocused"
          @keydown.esc="blurInput"
          autocomplete="off"
          autocorrect="off"
          spellcheck="false"
        />
        <!-- Skill Input -->
        <span class="available" v-if="isFocused">({{ skillSuggestions.length }})</span>
      </div>
      <ul :class="{displaySuggestions: isFocused}" class="suggestionsContainer" @mousedown.stop>
        <!-- Suggestions -->
        <transition-group name="slideInDown" mode="out-in">
          <li
            v-for="(skill) in skillSuggestions"
            :key="skill.name"
            @click="addSkill(skill)"
          >{{ skill.name }}</li>
        </transition-group>
      </ul>
    </div>
  </div>
</template>

<script>
import Input from "./../shared/parts/Input.vue";

export default {
  components: {
    /**
     * Input field
     */
    appInput: Input
  },
  props: {
    /**
     * All available Skills
     */
    skills: {
      type: Array,
      required: true
    },
    /**
     * List of choosen Skills as a v-model input
     */
    value: {
      type: Array,
      required: false
    },
    /**
     * ID for input -> accessable for labels
     */
    idValue: {
      type: String,
      required: false
    },
    /**
     * Placeholder for Input Field
     */
    placeholderValue: {
      type: String,
      required: false,
      default: "Skill eingeben"
    },
    /**
     * close Skill Suggestions
     */
    cardClicked: Number,
    /**
     * Title of the Skill Selection
     */
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      /**
       * The last input value for a new skill
       *  -> Optimizing the filter process for suggestions
       */
      lastNewSkill: "",
      /**
       * The current input value of the input field for a skill
       */
      newSkill: "",
      /**
       * The suggestions shown as a ul-List
       */
      skillSuggestions: [],
      /**
       * Id of Timeout for hiding Suggestions
       */
      timeOutId: -1,
      /**
       * indicates if skill_selection is focused
       */
      isFocused: false
    };
  },
  methods: {
    blurSkillSelection() {
      this.isFocused = false;
    },
    /**
     * Fires if Input field gets focused
     * Updates and shows suggestions
     */
    inputFocused() {
      this.updateSuggestions();
      this.isFocused = true;
    },
    /**
     * Add Skill Function
     * @param skill: skill which was clicked item in suggestion list
     * Adds a Skill to choosen Skill List and
     * emits an event for v-model ("input")  (emitting not necessary because array is an object)
     * and updates the suggestion list
     */
    addSkill(skill) {
      this.value.push(skill.name);
      this.$emit("input", this.value);
      this.newSkill = "";
      this.updateSuggestions();
    },
    /**
     * Remove Skill Function
     * @param index: index of skill that has to be removed
     * Removes the item of the list with choosen skills and emitts an event (emitting not necessary because array is an object)
     */
    removeSkill(index) {
      this.value.splice(index, 1);
      this.$emit("input", this.value);
      this.updateSuggestions();
    },
    /**
     * Update Suggestions Function
     * Updates the Suggestion List.
     * Two modes:
     *   - if the old input value is part of the new input value -> it is more specific -> only remove items
     *       Iterate trough current suggestions and check if it matches with the input value
     *         if not delete the suggestion
     *   - if the old input value is not part of the new input value -> it is less specific or sth different -> check all skills
     *       reset suggestions to empty arrays
     *       Iterate trough all available skills and check if they match with the input value and are not already choosen
     *         If yes add it to suggestion list
     */
    updateSuggestions() {
      const skillTrimmed = this.newSkill.trim();
      /**
       * Regular Expressions:
       * (subexpr) um ein Wort der Whitelist anzuhängen: (?=.*wort)  -> ?=alles was danach bis zur klammer kommt, .* = jedes Zeichen *-Mal
       * (subexpr) um ein Wort der Blacklist anzuhängen: (?!.*wort)  -> ?!alles was danach bis zur klammer kommt, .* = jedes Zeichen *-Mal
       */

      //First trial (check if skill is relevant for suggestions with regex): /(?!.*Java)(?!.*Vue)(?=.*v).*/ig

      //Second trial (check if skill is relevant for suggestions with loop):
      /**
       * Create Regex that contains every single word of input as a whitelist item
       */
      const whitelist =
        "(?=.*" +
        skillTrimmed.replace(/[^\w\s]/gi, "").replace(" ", ")(?=.*?") +
        ")";
      const regex = new RegExp(whitelist + ".*", "i");

      //If the User entered a new char -> more specific -> only have to remove suggestions
      if (
        this.lastNewSkill != "" &&
        this.newSkill.startsWith(this.lastNewSkill)
      ) {
        for (let i = this.skillSuggestions.length - 1; i > 0; i--) {
          let skill = this.skillSuggestions[i];
          if (!regex.test(skill)) {
            this.skillSuggestions.splice(i, 1);
          }
        }
      } else {
        //Removed one/several chars -> less specific -> check all skills for suggestion
        this.skillSuggestions = [];
        this.skills.forEach(skill => {
          //Check if skill is already choosen -> in this.value Array
          let contains = false;
          for (let s in this.value) {
            if (this.value[s] == skill.name) return (contains = true);
          }
          //If its not inside the this.value array -> check with regex if it is searched
          if (!contains) {
            if (regex.test(skill.name)) {
              this.skillSuggestions.push(skill);
            }
          }
        });
      }
    }
  }
};
</script>

<style scoped>
span.headline {
  font: var(--app-font-xxs-bold);
  color: var(--app-color-black);
  margin: 0 0 15px 0;
  display: block;
}
.choosen_skills > span > span {
  padding: 0 5px 0 10px;
  background-color: var(--app-color-brand-1);
  font: var(--app-font-xxs-regular);
  color: var(--app-color-almost-white);
  margin-right: 10px;
  margin-bottom: 5px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
}

.remove_skill {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-image: url("../../assets/icons/cross_white.svg");
  background-size: 80%;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  margin-left: 5px;
  border-radius: 10px;
}
.remove_skill:hover {
  background-color: var(--app-color-brand-2);
}

input {
  width: 100%;
  -webkit-appearance: none;
  outline: none;
  border: none;
  border-bottom: 1px solid var(--app-color-dark-grey);
  background-color: transparent;
  font-size: 15px;
  margin: 5px 0;
}

.error input {
  border-bottom-color: #f00;
}

.skill_selection_container {
  position: relative;
}
.skill_selection_container.focused {
  z-index: 2;
}

.skill_selection_container.empty {
  display: flex;
  align-items: flex-end;
}
.skill_selection_container > div {
  position: relative;
  width: 100%;
}

input {
  width: 100%;
}

.available {
  position: absolute;
  right: 2px;
  top: 5px;
  background-color: #fff;
  padding-left: 2px;
}

ul {
  position: absolute;
  list-style: none;
  top: calc(100% - 5px);
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 0;
  max-height: 0;
  opacity: 0;
  transition: all 150ms ease-out;
  overflow-y: scroll;
  border-radius: 0 0 10px 10px;
}

ul.displaySuggestions {
  max-height: 180px;
  opacity: 1;
}

ul li {
  padding: 5px 10px;
  background-color: #fff;
}

ul li:hover {
  cursor: pointer;
  background-color: #ddd;
}
.cover {
  position: fixed !important;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: #fff0;
}
</style>