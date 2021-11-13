<template>
  <div>
    <app-splitted percentageFirst="30" firstColor="var(--app-color-brand-2)">
      <div slot="first">
        <header>
          <h3>Weitere Mentees</h3>
        </header>
        <section class="mentees">
          <ul>
            <li v-for="(mentee, i) in groupMentor.mentees" :key="i">{{mentee.first_name}}</li>
          </ul>
        </section>
      </div>
      <div slot="second">
        <header>
          <h3>Adobe Illustrator</h3>
        </header>
        <section class="plan">
          <app-text-with-title title="Nächste Aufgabe" value="For-Loops" />
          <app-text-with-title
            title="Unser nächster Termin"
            value="15.05.2020"
            addition="19:30 Uhr"
          />
          <app-text-with-title title="Gemeinsame Zeiten" value="20:05" />
        </section>
        <section class="tasks">
          <app-list-with-title
            :list="['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign']"
            title="Erledigte Aufgaben"
          />
        </section>
      </div>
    </app-splitted>
    <div class="controls_space"></div>
  </div>
</template>

<script>
import HSplitted from "./../shared/parts/HSplitted.vue";
import ListWithTitle from "./../shared/parts/ListWithTitle.vue";
import TextWithTitle from "./../shared/parts/TextWithTitle.vue";

export default {
  components: {
    /**
     * Display Content in Horizontal Splitted view
     */
    appSplitted: HSplitted,
    /**
     * Displaying the tasks done
     */
    appListWithTitle: ListWithTitle,
    /**
     * Display Plan info
     */
    appTextWithTitle: TextWithTitle
  },
  props: {
    groupMentor: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.first * {
  color: var(--app-color-almost-white);
}

.first header,
.first .plan {
  border-bottom: 2px solid var(--app-color-almost-white);
}

.second header,
.second .plan {
  border-bottom: 2px solid var(--app-color-light-grey);
}

header,
.plan {
  padding-bottom: 10px;
}
.plan {
  display: grid;
  grid-template-columns: repeat(3, calc(100% / 3));
}
.plan,
.tasks {
  padding-top: 40px;
}

h2 {
  margin: 0;
  font-size: 30px;
}

.mentor {
  font-size: 20px;
}
.mentees {
  padding-top: 20px;
}
.mentees ul li {
  list-style: none;
  padding-top: 5px;
}
.controls_space {
  height: 60px;
  border-top: 2px solid var(--app-color-brand-2);
}
</style>