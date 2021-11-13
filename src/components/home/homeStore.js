import axios from 'axios';

const state = {
    
};

const getters = {
    
};

const mutations = {
    
};

const actions = {
    /**
     * Request the matches from the server
     * @return the Promise as answer of the server including error or data
     */
    getMatches: () => {
        return axios.get("/matches");
    },
    /**
     * Accept a match
     * @param payload the id of the match
     * @return the response of the accept request
     */
    acceptMatch: (context, payload) => {
        return axios.post("/matches/accept/" + payload);
    },
    /**
     * Reject a match
     * @param payload the id of the match
     * @return the response of the reject request
     */
    rejectMatch: (context, payload) => {
        return axios.post("/matches/reject/" + payload);
    },
    /**
     * Request the Mentorings from the server
     * @return the Promise as answer of the server including error or data
     */
    getMentorings: () => {
        return axios.get("/mentorings");
    },
    /**
     * Deactivate (Finish) Mentoring
     * @param context the context of the store
     * @param payload the id of the mentoring to deactivate
     * @return the Promise as answer of the server request including error or data
     */
    deactivateMentoring: (context, payload) => {
        return axios.post("/mentorings/deactivate/"+payload);
    },
    /**
     * Get all chats without content -> get content by id
     * @return the Promise as answer of the server request including error or data
     */
    getAllChats: ()=>{
        return axios.get("/chats");
    },
    /**
     * Get chat by id including chat messages
     * @param context the of the store
     * @param payload the id of the chat
     * @return the Promise as answer of the server request containing error or data
     */
    getChatById: (context, payload) => {
        return axios.get("/chats/" + payload);
    },
    /**
     * Sets a messages status as seen
     * @param context of the store
     * @param payload the id of the message
     * @return the promise as answer of the server request containing error or data
     */
    setMessageAsSeen: (context, payload) => {
        return axios.post("/chats/set_message_seen/"+payload);
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
    namespace: true
}