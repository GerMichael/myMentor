import axios from 'axios';

const state = {
    /**
     * Available Skills to choose from
     */
    skills: [],
    /**
     * Available fields to schoose from
     */
    fields: []
};

const getters = {
    /**
     * Getter for skills
     * @return skill list
     */
    getSkills: (state) => {
        return state.skills;
    },
    /**
     * Getter for fields
     * @return field list
     */
    getFields: (state) => {
        return state.fields;
    }
};

const mutations = {
    /**
     * Setter for skills
     * @param state: state of this store and payload as new skill list
     * sets skills to new skill list
     */
    setSkills: (state, payload)=>{
        state.skills = payload;
    },
    /**
     * Setter for fields
     * @param state: state of this store 
     * @param payload payload as new field list
     * sets fields to new field list
     */
    setFields: (state, payload)=>{
        state.fields = payload;
    }
};

const actions = {
    /**
     * Action to load all Skills
     * @return the skill list as an Promise
     * If the data is available locally (buffered in state.skills ) return this as an Promise
     * If the data is not available locally return the Promis of the skills request to server
     *    In addition, send a new request and buffer the result locally
     */
    loadSkills: () => {
        if(state.skills.length > 0) {
            console.log("[skillStore.js]: Skills where loaded from buffer");
            return new Promise((resolve)=>{
                resolve({data: { data: state.skills}});
            });
        }
        else {
            axios.get("/skills")
            .then(response=>{
                console.log("[skillStore.js]: Skills where buffered");
                state.skills = response.data.data;
            });
            return axios.get("/skills");
        }
    },
    /**
     * Action to load all fields
     * @return the fields list as an Promise
     * If the data is available locally (buffered in state.fields ) return this as an Promise
     * If the data is not available locally return the Promis of the fields request to server
     *    In addition, send a new request and buffer the result locally
     */
    loadFields: () => {
        if(state.fields.length > 0) {
            console.log("[skillStore.js]: Fields where loaded from buffer");
            return new Promise((resolve)=>{
                resolve({data: { data: state.fields}});
            });
        }
        else {
            axios.get("/fields")
            .then(response=>{
                console.log("[skillStore.js]: Fields where buffered");
                state.fields = response.data.data;
            });
            return axios.get("/fields");
        }
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
    namespace: true
}