<template>
    <div class="chat_container" v-show="display">
        <app-button-card :withPadding="false"
        justifyContentFooter="flex-end"
        :footerButtons="(chat.id ? [
                {type: 'graduation_hat', textAlignLeft: true, name: 'mentoring'},
                {type: 'timer', textAlignLeft: true, name: 'setTime'},
                {type: 'calendar', textAlignLeft: true, name: 'calendar'},
                {type: 'attachment', textAlignLeft: true, name: 'attach'},
                {type: 'send', textAlignLeft: true, name: 'send'}
            ] : [])"
            @sendFooterButtonClicked="sendMessage"
            @setTimeFooterButtonClicked="setTime"
            >
            <template v-if="!chat.id">
                <p class="empty">
                    Wähle links einen Chat aus.
                </p>
            </template>
            <template v-else>
                <div class="chat_window">
                    <div class="chat_messages" ref="chatMessages">
                        <app-message v-for="(msg, i) in messages" :message="msg" :from_self="msg.sender_id != chat.other_user.id" 
                            :key="i + msg.content" :other_user="chat.other_user"/>
                    </div>
                    <div class="input">
                        <textarea type="text" placeholder="Nachricht schreiben..." 
                            v-model="newMessageInput" @keydown.enter.prevent="sendMessage"></textarea>
                    </div>
                </div>
            </template>
        </app-button-card>
    </div>
</template>

<script>
import ButtonCard from "./../shared/parts/ButtonCard.vue"; 
import Message from "./Message.vue";
import { chatBus } from './../../main';

export default {
    components: {
        /**
         * Button Card containing all Messages and Input Field
         * Buttons for sending text, time suggestion, ...
         */
        appButtonCard: ButtonCard,
        /**
         * Message displaying one message of every type
         */
        appMessage: Message
    },
    props: {
        /**
         * The chat with the selected person
         */
        chat: {
            required: true
        },
        /**
         * Socket to communicate trough
         */
        socket: {
            required: true
        },
        /**
         * The id of the user currently signed in
         */
        userId: {
            default: -1
        },
        /**
         * Specifies if chat should be displayed
         */
        display: {
            default: false
        }
    },
    data(){
        return {
            /**
             * The new Text Message content
             */
            newMessageInput: "",
            /**
             * Array containing all messages
             * array has the same pointer as the attribute "messages" of chat
             * -> required because otherwise Vue isn't able to watch nested objects and arrays
             */
            messages: {
                type: Array
            },
            /**
             * Channel to communicate trough
             */
            channel: undefined,
            /** amount of unread messages */
            unreadMessages: 0
        };
    },
    methods: {
        /**
         * Send a new Message
         * Check if text-Message is valid, 
         * -> if yes send it 
         * -> else do nothing
         */
        sendMessage(){
            if(this.newMessageInput != ""){
                this.channel.push('message:add', {
                    content: this.newMessageInput,
                    user_id: this.userId
                });
                this.newMessageInput = "";
            }
        },
        /**
         * adds a Message to the chat-messages-list
         * @param chat: the chat on which the message gets added
         * @param message: the message to add to the chat
         */
        addMessage(message){
            if(!this.display) {
                if(!message.seen){
                    this.unreadMessages++;
                    this.notifyAboutNewAmountOfUnreadMessages();
                }
            }
            this.messages.push(message);
        },
        /**
         * calls to display the send time suggestion dialogue
         */
        setTime(){
            this.$emit("setTime");
        },
        /**
         * Compares two messages according to their timestamps
         * @param message1 the first message
         * @param message2 the second message
         * @return if the message1 is greater than message2 -> return -1
         *         if the message1 is less than message2 -> return 1
         *         else they are both equal -> return 0
         */
        compareMessage(message1, message2){
            var date_message1 = this.getDateFrom(message1.timestamp_utc);
            var date_message2 = this.getDateFrom(message2.timestamp_utc);
            return this.compareDates(date_message1, date_message2);
        },
        /**
         * Compares two dates according to their values
         * @param date1 the first date
         * @param date2 the second date
         * @return if the date1 is greater than date2 -> return -1
         *         if the date1 is less than date2 -> return 1
         *         else they are both equal -> return 0
         */
        compareDates(date1, date2){
            var keyOrder = ["year", "month", "day", "hour", "minute", "second"];
            var equalValues = 0;
            for(var key of keyOrder){
                if(date1[key] < date2[key]) return -1;
                if(date1[key] == date2[key]) equalValues++;
            }
            return (equalValues == keyOrder.length ? 0 : 1);
        },
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
         * Raises an Event in ChatBus that the amount of unread messages of this chat has changed
         */
        notifyAboutNewAmountOfUnreadMessages(){
            chatBus.$emit("unreadMessagesHaveChanged", {chatId: this.chat.id, amount: this.unreadMessages});
        }
    },
    created(){
        /**
         * Connect the Chat-System via Web-Socket with the backend
         * -> For each chat one channel
         * -> if channel was connected successfully, add all messages
         * -> if a new message comes via channel -> add message, too 
         */
        //Initialize the messages array
        this.messages = [];

        this.channel = this.socket.channel(`chat_room:${this.chat.id}`, {user_id: this.userId});
        
        this.channel.join()
        .receive("ok", resp => {
            console.log("[Chats]: Joined chat with id " + this.chat.id + " successfully", resp);
            //Initially add of Messages
            if(resp.messages != undefined){
                resp.messages.sort(this.compareMessage).map(msg => this.addMessage(msg));
                
                this.notifyAboutNewAmountOfUnreadMessages();
            }
            //New Messages
            this.channel.on(`chat_room:${this.chat.id}:new_message`, msg => {
                console.log("receive to", this.chat);
                this.addMessage(msg);
            });
        })
        .receive("error", err=>{
            console.log("[Chats]: Unable to join to chat with id " + this.chat.id, err);
        });
    },
    destroyed(){
        chatBus.$off();
    },
    watch: {
        /**
         * Watch messages
         * if the messages array changes (e.g. a new message arrives) scroll to the bottom to display the newest message
         */
        messages: {
            handler: function(){
                setTimeout(()=>{
                    if(this.$refs.chatMessages) this.$refs.chatMessages.scrollTo(0,this.$refs.chatMessages.scrollHeight);
                }, 300);
            },
            deep: true
        },
        /**
         * if the chat was displayed, set messages as seen
         */
        display(){
            if(this.display){
                for(var message of this.messages){
                    if(!message.seen){
                        this.$store.dispatch("setMessageAsSeen", message.id)
                        .catch(err=>{
                            console.log(`Message with id ${message.id} couldn't be set as seen`, err);
                        });
                    }
                }
                this.unreadMessages = 0;
                this.notifyAboutNewAmountOfUnreadMessages();
            }
        }
    }
}
</script>

<style scoped>
    .chat_container .button_card_container{
        height: 670px;
        width: 100%;
    }

    p.empty{
        display: flex;
        height: 100%;
        width: 100%;
        margin: 0;
        justify-content: center;
        align-items: center;
    }

    .chat_window{
        height: 100%;
        width: 100%;
    }
    .chat_window .chat_messages{
        width: 100%;
        height: calc(100% - 100px);
        padding: 25px 15px;

        scroll-behavior: smooth;

        overflow: hidden scroll;
    }
    .chat_window .input{
        width: 100%;
        height: 100px;
        border-top: solid 2px var(--app-color-dark-grey);
    }

    textarea{
        bottom: 0;
        -webkit-appearance: none;
        outline: none;
        border: none;
        background-color: transparent;
        resize: none;

        overflow-y: scroll;

        width: 100%;
        max-height: 100%;
        padding: 10px 20px;

        font: var(--app-font-xxs-regular);
        color: var(--app-color-black);
    }

    textarea::placeholder{
        color: var(--app-color-dark-grey);
    }
</style>