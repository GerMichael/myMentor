import axios from 'axios';

const state = {
    /**
     * Details about the current signed in user
     *  - id of user
     *  - first and last name
     *  - email/username
     *  - credits
     *  - rank of user
     *  - the skills he has
     */
    currentUser: {
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
        credits: 0,
        rank: 0,
        has_skills: [],
        wants_skills: []
    }
};

const getters = {
    /**
     * Getter for id
     * @return user id
     */
    getId: (state) => {
        return state.currentUser.id;
    },
    /**
     * Getter for firstname
     * @return user firstname
     */
    getFirstname: (state) => {
        return state.currentUser.first_name;
    },
    /**
     * Getter for lastname
     * @return user lastname
     */
    getLastname: (state) => {
        return state.currentUser.last_name;
    },
    /**
     * Getter for fullname
     * @return user first + last name
     */
    getFullName: (state) => {
        return state.currentUser.first_name + " " + state.currentUser.last_name;
    },
    /**
     * Getter for credits
     * @return user credits
     */
    getCredits: (state) => {
        return state.currentUser.credits;
    },
    /**
     * Getter for email
     * @return user email
     */
    getEmail: (state) => {
        return state.currentUser.email;
    },
    /**
     * Getter for rank
     * @return user rank
     */
    getRank: (state) => {
        return state.currentUser.rank;
    },
    /**
     * Getter for skills
     * @return user skills he has
     */
    getUserSkills: (state) => {
        return state.currentUser.has_skills;
    },
    /**
     * Getter for skills
     * @return user skills he has
     */
    getUserWantsSkills: (state) => {
        return state.currentUser.wants_skills;
    },
    /**
     * Getter for the current User
     * @return user as object
     */
    getCurrentUser: (state) => {
        return state.currentUser;
    }
};

const mutations = {
    /**
     * Setter for user id
     * @param state: state of this store
     * @param payload new user id
     * sets id to new user id
     */
    setId: (state, payload) => {
        state.id = payload;
    },
    /**
     * Compare user to current user mutation
     * @param state: state of this store
     * @param payload: other username
     * @return boolean that checks if given userename is the same as the one of the current user
     * checks if the username (email) of the given other user is the same as the current user saved in this store
     */
    compareToCurrentUser: (state, payload)=>{
        return state.currentUser.email == payload.email;
    },
    /**
     * update Current User Mutation
     * @param state: state of this store
     * @param payload new user object
     * updates every key-value of the current user with the values of the new user
     *   Only keys available in current user will be updatet, no new keys will be added
     */
    updateCurrentUser: (state, payload) => {
        for(let key in state.currentUser){              //Aktuell wird von getCurrentUser noch keine ID übergeben -> DB Server updaten bitte 
            if(payload[key])state.currentUser[key] = payload[key];
        }
        console.log("Updated", {user: payload});
    },
    /**
     * Set current User
     * @param state: state of this store 
     * @param payload new current user as object
     */
    setCurrentUser: (state, payload) => {
        state.currentUser = payload;
    },
    /**
     * reset current User
     * @param state: state of this store
     * Sets current User values to default values
     */
    resetCurrentUser: (state) => {
        for(let key in state.currentUser){
            if(typeof state.currentUser[key] == String) state.currentUser[key] = "";
            if(typeof state.currentUser[key] == Array) state.currentUser[key] = [];
            if(typeof state.currentUser[key] == Number) state.currentUser[key] = 0;
        }
    }
};

const actions = {
    /**
     * Setter for id
     * @param context: context of current store 
     * @param payload new id
     * calls the setId Mutation of the store and passes the new id
     */
    setId: (context, payload) => {
        context.commit('setId', payload);
    },
    /**
     * Compare user to current user action
     * @param context context of this store and payload as other username (Email)
     * @return boolean that says if given userename is the same as the one of the current user
     * calls the compareToCurrentUser mutations, passes the username (email) and returns boolean value of mutation
     */
    compareToCurrentUser: (context, payload) => {
        return context.commit("compareToCurrentUser", payload);
    },
    /**
     * getCurrentUser Action
     * @return: Promise that contains error or details about the current user
     * returns the details of the current user that is signed in
     */
    getCurrentUser: () => {
        return axios.get("/users/current");
    },
    /**
     * update Current User Mutation
     * @param state: state of this store and payload as new user
     * calls updateCurrentUser mutation and passes new user object
     */
    updateCurrentUser: (context, payload) => {
        return new Promise((resolve)=>{
            context.commit("updateCurrentUser", payload);
            resolve();
        });
    },
    /**
     * @param context: The context of the current store
     * reset current User
     * Sets current User values to default values
     */
    resetCurrentUser: (context) => {
        for(let key in context.currentUser){
            if(typeof context.currentUser[key] == String) context.currentUser[key] = "";
            if(typeof context.currentUser[key] == Array) context.currentUser[key] = [];
            if(typeof context.currentUser[key] == Number) context.currentUser[key] = 0;
        }
    },
    /**
     * signInUser Action
     * @param context: context of this store
     * @param payload: payload with the username + password
     * @return: Proimse with the result of the login request
     * Sends sign In Request to server and return result 
     */
    signinUser: (context, payload) => {
        return axios.post("/users/sign_in", payload);
    },
    /**
     * registerUser Action
     * @param context: context of this store
     * @param payload payload with the user Details (username, password, skills, name, ...)
     * @return: Proimse with the result of the login request
     * Sends sign In Request to server and return result 
     */
    registerUser: (context, payload) => {
        return axios.post("/users", payload);
    },
    /**
     * user Exists Action
     * @param context: context of this store
     * @param payload: payload with the username (email) to check
     * @return: Promise with the result of the existsRequets (response contains true/false) and error for fatal errors
     */
    userExists: (context, payload) => {
        return axios.post("/users/exists", payload);
    },
    /**
     * Action to sign out user
     * @return: promise of sign out request
     * sends sign_out request to server 
     */
    signOutUser: (context) => {
        context.commit("resetCurrentUser");
        return axios.post("/users/sign_out");
    },
    /**
     * Validate Email Action
     * @param context: context of this store
     * @param payload: payload as email that has to be validated
     * @return boolean that says if email is a valide email
     * Checks with a regular expression if the email is a valide Email, return result as a promise
     */
    validateEmail: (context, payload) => {
        return new Promise(function(resolve){
            resolve(context.commit("validateEmail", payload));
        });
    },
    /**
     * Get User by Id
     * @param context: Context of this store
     * @param payload: Id of user 
     * @return Promise from axios request
     */
    getUserById: (context, payload) => {
        return axios.get("/users/" + payload);
    },
    // /**
    //  * Update users name and username (email)
    //  * @param: Object with new user Data
    //  * @return: Promis from axios request
    //  */
    // updateUsersPersonalData: (context, payload)=>{
    // },
    /**
     * Get User by Id
     * @param context: Context of this store
     * @param payload: New Skills
     * @return Promise from axios request
     */
    addUsersNewHasSkills: (context, payload) => {
        return axios.post("/users/add_has_skills",
                        {"skills": payload });
    },
    /**
     * Get User by Id
     * @param context: Context of this store
     * @param payload: removed skills
     * @return Promise from axios request
     */
    removeUsersNewHasSkills: (context, payload) => {
        return axios.post("/users/remove_has_skills",
                        {"skills": payload });
    },
    /**
     * Get User by Id
     * @param context: Context of this store
     * @param payload: new skills
     * @return Promise from axios request
     */
    addUsersNewWantsSkills: (context, payload) => {
        return axios.post("/users/add_wants_skills",
                        {"skills": payload });
    }, 
    /**
     * Get User by Id
     * @param context: Context of this store
     * @param payload: removed skills
     * @return Promise from axios request
     */
    removeUsersNewWantsSkills: (context, payload) => {
        return axios.post("/users/remove_wants_skills",
                        {"skills": payload });
    },
    /**
     * Update an user
     * @param context: Context of this store
     * @param payload: Opject containing the user id and the personal Data of user like name/email that have to be changed
     * @return Promis from axios requets
     */
    /** @param ... @return ... */
    updateUser: (context, payload) => {
        context.commit("updateCurrentUser", payload.userData);
        return axios.put(`/users/${payload.userId}`, {user: payload.userData});
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
    namespace: true
}