<template>
    <app-modal>
        <app-button-card
        :headerButtons="[
            { type: 'cross', name: 'close' }
        ]"
        :footerButtons="[
            { type: 'ok', name: 'send', title: `Zeit an ${chat.other_user.first_name} schicken` }
        ]"
        @closeHeaderButtonClicked="close" @sendFooterButtonClicked="send"
        justifyContentFooter="flex-end">
            <h1>Gemeinsame Zeit notieren</h1>
            <app-time-selector v-model="time"/>
        </app-button-card>
    </app-modal>
</template>

<script>
import Modal from "./../shared/parts/Modal.vue";
import ButtonCard from "./../shared/parts/ButtonCard.vue";
import TimeSelector from "./../shared/parts/TimeSelector.vue";

export default {
    components: {
        /**
         * Displaying the Time manager as modal
         */
        appModal: Modal,
        /**
         * Display the time manager inside a buttoncard
         */
        appButtonCard: ButtonCard,
        /**
         * Display the time Selector for choosing a time
         */
        appTimeSelector: TimeSelector
    },
    props: {
        /**
         * The current selected chat 
         */
        chat: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            /**
             * the time attribute
             * it contains :
             *  - hour & minute -> v-model with input
             *  - error -> indicating if input is valid and not empty -> used for error messages and validation
             */
            time: {
                hour: 0,
                minute: 0,
                error: {
                    invalidTime: false,
                    empty: false
                }
            }
        };
    },
    methods: {
        /**
         * Close Time manager
         * -> emit to parent to close this 
         */
        close(){
            this.$emit("close");
        },
        /**
         * validate input and if ok emit event containing the time information without error as an object
         */
        send(){
            if(!this.time.error.invalidTime && !this.time.error.empty){
                if(this.time.hour != 0 || this.time.minute != 0){
                    this.$emit("send", {
                        hour: this.time.hour,
                        minute: this.time.minute
                    });
                }
            }
        }
    }
}
</script>

<style scoped>
    h1{
        margin-left: 15px;
    }
    .button_card_container{
        min-width: 600px;
    }
    .time_selector_container{
        margin: 20px 0;
        margin-left: 15px;
    }
</style>