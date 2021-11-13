<template>
    <div class="mentoring_container">
        <section>
            <app-text-with-title title="Mein Mentor" :value="getOtherUserName" :addition="mentoring.other_skill.name"/>
        </section>
        <section>
            <app-text-with-title title="Nächste Aufgabe" :value="'For-Loops'"/>
        </section>
        <section>
            <app-text-with-title title="Unser nächster Termin" :value="'15.05.2020'" :addition="'19:30 Uhr'"/>
        </section>
        <section>
            <app-text-with-title title="Gemeinsame Zeit" :value="'05:30'"/>
        </section>
    </div>
</template>

<script>
import TextWithTitle from "./../../shared/parts/TextWithTitle.vue";

export default {
    components: {
        appTextWithTitle: TextWithTitle
    },
    props: {
        /**
         * A Certain Mentorings
         */
        mentoring: {
            type: Object,
            required: true
        }
    },
    computed: {
        /**
         * @return both first and last name of other user
         */
        getOtherUserName: function(){
            return this.mentoring.other_user.first_name;
        }
    }
}
</script>

<style scoped>
    .mentoring_container{
        display: grid;
        grid-template-columns: 40% repeat(3, 20%);
        width: 100%;
    }
</style>