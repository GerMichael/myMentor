<template>
  <div>
    <app-splitted>
      <div slot="first">
        <header>
          <h3>
            {{mentoring.other_skill.name}}
            <span
              class="mentor"
            >mit Mentor {{mentoring.other_user.first_name}}</span>
          </h3>
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
      <div slot="second">
        <header>
          <h3>{{mentoring.other_skill.name}}</h3>
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
    /**
     * Mentoring with all its details
     */
    mentoring: {
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
  padding-bottom: 20px;
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

.plan {
  display: grid;
  grid-template-columns: repeat(3, calc(100% / 3));
}

.controls_space {
  height: 60px;
  border-top: 2px solid var(--app-color-brand-1);
}
</style>