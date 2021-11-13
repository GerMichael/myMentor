<template>
    <div class="menotrings_container">
        <app-button-card 
        v-for="(mentoring, index) in getMentorings" :key="index"
        :headerButtons="[
            {type: 'class',name: 'group'},
            {type: 'messages', name: 'chat'}
        ]"
        @groupHeaderButtonClicked="goToGroup(mentoring)"
        @chatHeaderButtonClicked="goToChat(mentoring)"
            >
            <app-mentoring :mentoring="mentoring"/>
        </app-button-card>
    </div>
</template>

<script>
import ButtonCard from "./../../shared/parts/ButtonCard.vue";
import Mentoring from "./Mentoring.vue";

export default {
    components: {
        /**
         * Button Card for displaying a card with buttons
         */
        appButtonCard: ButtonCard,
        /**
         * Mentorings displays the details into the button card
         */
        appMentoring: Mentoring
    },
    props: {
        /**
         * All Mentorings that get displayed
         */
        mentorings: {
            type: Array
        }
    },
    computed: {
        /**
         * Returns all mentorings which contain valid data
         */
        getMentorings(){
            var arr = [];
            this.mentorings.forEach(ment=>{
                if(ment.mentoring_id)arr.push(ment);
            });
            return arr;
        }
    },
    methods: {
        /**
         * TODO: navigate to group
         */
        goToGroup(mentoring){
            console.log("[MentoringsList][TODO]: Go to Group", mentoring);
        },
        /**
         * TODO: navigate to chat
         */
        goToChat(mentoring){
            console.log("[MentoringsList][TODO]: Go to chat", mentoring);
        }
    }
}
</script>

<style scoped>    
    .menotrings_container{
        margin: 0 25px 0 55px;
    }
    .menotrings_container .button_card_container{
        width: 100%;
        margin: 20px 0;
    }
    
    .button_card_container:hover{
        transform: scale(1.01);
    }
    .button_card_container:hover .card_container{
        box-shadow: 0px 0px 8px #0003;
        border: 1px solid #0002;
    }
</style>