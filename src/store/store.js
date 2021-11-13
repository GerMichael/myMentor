import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from "./actions";
import * as getters from "./getters";
import * as mutations from "./mutations";
import * as state from "./states";

import userStore from "../components/user/userStore";
import skillStore from "../components/start/skillStore";
import homeStore from "../components/home/homeStore";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        userStore,
        skillStore,
        homeStore
    }
});