<template>
    <div class="chat_list_container">
        <app-card :withPadding="false">
            <template v-if="chats.length < 1">
                <p class="empty">
                    Keine Chats vorhanden.
                </p>
            </template>
            <template v-else>
                <ul>
                    <li v-for="chat in chats" :key="chat.id" :class="{selected: chat.id == selectedId}" @click="chatClicked(chat)">
                        <div class="chat_item">
                            <p>Mentor {{chat.other_user.first_name}}</p>
                            <!-- <span class="unread">{{unreadMessagesOfAllChats[chat.id]}}</span> -->
                        </div>
                    </li>
                </ul>
            </template>
        </app-card>
    </div>
</template>

<script>
import Card from "./../shared/parts/Card.vue";
import { chatBus } from './../../main';

export default {
    components: {
        /**
         * Card containing all chats
         */
        appCard: Card
    },
    props: {
        /**
         * List of all chats
         */
        chats: {
            type: Array,
            required: true
        },
        /**
         * Chat Id (Number) refering to the selected chat
         */
        selectedId: {
            type: Number,
            required: false
        }
    },
    data() {
        return {
            unreadMessagesOfAllChats: {}
        };
    },
    methods: {
        /**
         * Select a chat and emit an event to notify the parent element that a chat was selected
         * @param chat: the chat that was clicked
         */
        chatClicked(chat){
            this.$emit("chatclicked", chat.id);
        }
    },
    created(){
        /**
         * reset unreadMessagesCounter
         */
        this.chats.forEach((chat)=>{
            this.unreadMessagesOfAllChats[chat.id] = 0;
        });
        chatBus.$on("unreadMessagesHaveChanged", (changeObject)=>{
            this.unreadMessagesOfAllChats[changeObject.chatId] = changeObject.amount;
        });
    },
    destroyed(){
        chatBus.$off();
    }
}
</script>

<style scoped>
    .chat_list_container .card_container{
        display: block;
        height: 670px;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    p.empty{
        display: flex;
        height: 100%;
        width: 100%;
        margin: 0;
        justify-content: center;
        align-items: center;
    }
    ul{
        list-style: none;
    }
    li{
        display: block;
        padding: 30px 30px 0 30px;
    }
    li:hover{
        cursor: pointer;
    }
    li p{
        font: var(--app-font-xxs-bold);
        color: var(--app-color-dark-grey);
    }
    li.selected p{
        color: var(--app-color-brand-2);
    }
    li::after{
        display: block;
        content: "";
        width: 100%;
        height: 2px;
        background-color: var(--app-color-light-grey);
    }
    .chat_item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 30px;
    }
</style>