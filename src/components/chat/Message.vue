<template>
    <div class="message_container" :class="{align_left: !from_self}">
        <div class="text_message" v-if="getType == 'text'">
            <div class="message_time">{{getTimeStamp}}</div>
            <div class="message_content">{{ message.content }}</div>
            <div class="message_bubble_corner" :style="{backgroundImage: 'url(' + require('@/assets/icons/message_corner_'+(from_self ? 'right_white' : 'left_brand_1')+'.svg') + ')'}"></div>
        </div>
        <div class="time_message" v-if="getType == 'time'">
            <app-button-card
            :footerButtons="(!from_self && message.acknowledged == 0 ? [
                { imgName: 'cross.svg', name:'reject', title: 'Zeitangabe ablehnen', left: false},
                { imgName: 'ok.svg', name:'accept', title: 'Zeitangabe bestätigen'}
            ]: [])"
            @acceptFooterButtonClicked="acceptTimeSuggestion"
            @rejectFooterButtonClicked="rejectTimeSuggestion"
            :flatDesign="!(!from_self && message.acknowledged == 0)"
            backgroundColor="var(--app-color-white)">
                <template v-if="from_self">
                    <h1>Du hast angegeben mit {{other_user.first_name}} heute Adobe Illustrator gelernt zu haben.</h1>
                    <div class="time_suggestion">{{ getTimeSuggestion }} h</div>
                    <div class="message_acknowledged">
                        <template v-if="message.acknowledged == 1">
                            {{other_user.first_name}} hat die Zeitangabe bestätigt.
                        </template>
                        <template v-else-if="message.acknowledged == 0">
                            {{other_user.first_name}} muss die Zeitangabe noch bestätigen.
                        </template>
                        <template v-else>
                            {{other_user.first_name}} hat die Zeitangabe abgelehnt.
                        </template>
                    </div>
                </template>
                <template v-else>
                    <h1>{{other_user.first_name}} hat angegeben, er hat dir heute Python gelehrt.</h1>
                    <div class="time_suggestion">{{ getTimeSuggestion }} h</div>
                    <div class="message_acknowledged">
                        <template v-if="message.acknowledged == 1">
                            Du hast die Zeitangabe bestätigt.
                        </template>
                        <template v-else-if="message.acknowledged == 0">
                            Du hast die Zeitangabe abgelehnt.
                        </template>
                    </div>
                </template>
            </app-button-card>
        </div>
    </div>
</template>

<script>
import ButtonCard from "./../shared/parts/ButtonCard.vue";

export default {
    components: {
        /**
         * Button Card for displaying Time Suggestions with buttons
         */
        appButtonCard: ButtonCard
    },
    props: {
        /**
         * The message itself containing the content, timestamp and some further information
         */
        message: {
            type: Object,
            required: true
        },
        /**
         * Indicates if the message is from the user that is currently signed in
         */
        from_self: {
            type: Boolean,
            default: false
        },
        /**
         * The other user of the chat as object
         */
        other_user: {
            type: Object
        }
    },
    computed: {
        /**
         * get a readable version of timestamp of backend
         * if the date is today it replaces the date with "heute"
         * @return a string with "heute"/date and always the time
         */
        getTimeStamp(){
            var d = this.getDateFrom(this.message.timestamp_utc);
            var message_time = new Date(Date.UTC(d.year, d.month-1, d.day, d.hour, d.minute, d.second))
            var now = new Date();
            if(message_time.getFullYear() == now.getFullYear() && message_time.getMonth() == now.getMonth() && message_time.getDate() == now.getDate()){
                return `heute\n${message_time.getHours()}:${message_time.getMinutes()}`;
            }
            return `${message_time.getDate()}.${message_time.getMonth()+1}.${message_time.getFullYear()}\n${message_time.getHours()}:${message_time.getMinutes()}`
        },
        /**
         * Get type from message, default is text
         * @return string containting type
         */
        getType(){
            if(this.message.type) return this.message.type;
            else return 'text';
        },
        /**
         * Return the time suggestion
         * convert it to readable format
         * @return content of message
         */
        getTimeSuggestion(){
            return this.message.content;
        }
    },
    methods: {
        /**
         * Convert timestamp string to object with clean attributes
         * @param timestamp_utc: Input timestamp from backend
         * @return: an object containing date and time in seperate attributes
         */
        getDateFrom(timestamp_utc){
            var year = timestamp_utc.substring(0,4);
            var month = timestamp_utc.substring(5,7);
            var day = timestamp_utc.substring(8,10);
            var hour = timestamp_utc.substring(11, 13);
            var minute = timestamp_utc.substring(14, 16);
            var second = timestamp_utc.substring(17, 19);
            return {year, month, day, hour, minute, second } 
        },
        /**
         * Accept time Suggestion -> send to backend
         */
        acceptTimeSuggestion(){
            console.log(`[Message]: Accept Time Suggestion for ${this.getTimeSuggestion}`);
            this.message.acknowledged = 1;
        },
        /**
         * Reject time Suggestion -> send to backend
         */
        rejectTimeSuggestion(){
            console.log(`[Message]: Reject Time Suggestion for ${this.getTimeSuggestion}`);
            this.message.acknowledged = -1;
        }
    }
}
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .message_container{
        width: 100%;
        display: flex;
        flex-direction: row-reverse;
        margin: 20px 0;
    }
    .message_container.align_left{
        flex-direction: row;
    }
    .text_message{
        display: flex;
        flex-direction: row;
    }
    .message_content{
        padding: 20px;
        border-radius: 15px;
        order: 2;
        
        width: 100%;

        font: var(--app-font-xxs-regular);
        background-color: var(--app-color-white);
    }
    .text_message .message_content{
        max-width: 514px;
    }
    .message_container.align_left .message_content{
        background-color: var(--app-color-brand-1);
        color: var(--app-color-almost-white);
    }
    .message_bubble_corner{
        order: 3;
        min-width: 19px;
        height: 100%;
        background-repeat: no-repeat;
        background-position: 0 15px;
    }
    .message_container.align_left .message_bubble_corner{
        order: 1;
    }
    .message_time{
        order: 1;
        white-space:pre;
        text-align: right;
        margin: 0 10px;
        font: var(--app-font-xxxs-regular);
    }
    .message_container.align_left .message_time{
        order: 3;
        text-align: left;
    }
    .time_message{
        width: 100%;
    }
    .time_message h1{
        margin-top: 20px;
        text-align: center;
        font: var(--app-font-xxs-bold);
    }
    .time_message .time_suggestion{
        text-align: center;
        font: var(--app-font-xl-regular);
    }
    .time_message .message_acknowledged{
        text-align: center;
        font: var(--app-font-xxs-bold);
        margin-bottom: 20px;
    }
    .time_message .button_card_container{
        width: 100%;
    }
</style>