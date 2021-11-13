<template>
    <div class="chats_container">
        <h1>Nachrichten</h1>
        <section v-if="selectedChatId > -1">
            <app-chat-list :chats="chats" :selectedId="getSelectedChat.id" @chatclicked="selectChat"/>
            <app-chat v-for="chat in chats" :key="JSON.stringify(chat)"
                :chat="chat" :socket="socket" :userId="userId" :display="chat.id == selectedChatId"
                @setTime="selectTime = true"/>
            <!-- <p v-show="selectedChatId == chat.id" v-for="chat in chats" :key="JSON.stringify(chat)">
                {{ chat }}
            </p> -->
            <app-time-managmenet :chat="getSelectedChat" v-if="selectTime" 
                @close="selectTime = false" @send="sendTimeSuggestion"/>
        </section>
    </div>
</template>

<script>
import ChatList from "./ChatList.vue";
import Chat from "./Chat.vue";
import TimeManagement from "./TimeManagement.vue";
import { Socket } from "phoenix";

export default {
    components: {
        /**
         * The Chat Component to display all messages and the input of the current selected chat
         */
        appChat: Chat,
        /**
         * The Chat list to display all available chats
         */
        appChatList: ChatList,
        /**
         * The Time Manager if the user wants to suggest a time-message
         */
        appTimeManagmenet: TimeManagement
    },
    data(){
        return {
            /**
             * Contains all chats
             */
            chats: [],
            /**
             * Containts the current chat that gets displayed
             */
            selectedChatId: -1,
            /**
             * The id of the user currently signed in
             */
            userId: -1,
            /**
             * A socket to communicate with the backend
             */
            socket: undefined,
            /**
             * Indicates if the user wants to choose a new time to suggest for time management
             */
            selectTime: false
        };
    },
    computed:{
        /**
         * Returns the selected Chat
         * @return selected Chat
         */
        getSelectedChat(){
            for (var chat of this.chats){
                if(chat.id == this.selectedChatId) return chat;
            }
            return undefined;
        }
    },
    methods: {
        /**
         * Select a chat (emitted from ChatList)
         * @param chatId: the id of the selected chat
         */
        selectChat(chatId){
            this.selectedChatId = chatId;
        },
        /**
         * sends a time Suggestion (currently only local functions - no backend connection)
         * @param timeObject
         */
        sendTimeSuggestion(timeObject){
            console.log(`[Chats]: Sending Time Suggestion (${timeObject.hour}:${timeObject.minute})`);
            this.currentMessages.push(                {
                "content": `${timeObject.hour}:${(timeObject.minute<10 ? '0' : '') + timeObject.minute}`,
                "acknowledged": 0,
                "type": 'time',
                "id": 1,
                "seen": true,
                "sender": this.userId,
                "timestamp_utc": "2020-05-29T08:33:51"
            });
            this.selectTime = false;
        }
    },
    created(){
        /**
         * setup the connection via socket to the backend
         * 1. get all Chats from backend via axios request
         * 2. establish a new connection via socket
         * 3. for every chat establish a new channel and save the assiciation from chat to channel in channelChat
         * 4. setup event listener for joining the channel (only once) -> load all messages and save them locally
         * 5. setup event listener for receiving a new message -> add to local messages array
         */
        this.$store.dispatch("getAllChats")
        .then(response=>{
            console.log("[Chats]: Loaded all chats successfully", response.data.data);
            //this.chats = response.data.data;
            //console.log("[Chats][DEBUG]: ", response.data);

            response.data.data.forEach(chat=>{
                if(chat.id)this.chats.push(chat);
            });
            this.selectedChatId = this.chats[0].id;
            //console.log("[Chats][DEBUG]: ", this.chats);

            this.userId = this.$store.getters.getId;

            //this.socket = new Socket("ws://localhost:4000/chats/"); //for localhost, Later if deployed: wss://...
            this.socket = new Socket("wss://mymentor-alm.herokuapp.com/chats/"); //Deployed
            this.socket.connect();

        })
        .catch(error=>{
            console.log("[Chats]: Error on getting all chats: ", error);
        });
    }
}
</script>

<style scoped>
    h1{
        font: var(--app-font-m-bold);
        color: var(--app-color-black);
        display: inline-block;
        margin-bottom: 20px;
    }

    .chats_container{
        margin: 0 50px 50px 35px;
        height: 100%;
    }

    .chats_container>section{
        display: grid;
        grid-template-columns: 250px auto;
        grid-column-gap: 30px;
    }
</style>