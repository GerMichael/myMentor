import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import { routes } from './routes';
import { store } from "./store/store";
import axios from 'axios';

export const status = { 
  success :  1, 
  error   : -1,
  unset   :  0 
}

axios.defaults.baseURL = "http://localhost:4000/api"; //Lokal
//axios.defaults.baseURL = "https://mymentor-alm.herokuapp.com/api"; //Published
//Credentials = e.g. cookies
axios.defaults.withCredentials = true;

export const matchBus = new Vue();
export const chatBus = new Vue();

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode:"history",
  /**
   * scrollBehaviour Function
   * @param to destination
   * @param from source
   * @param savedPosition savedPosition for this component:
   * @return position to scroll to
   * if there is a saved Position go there
   * if there is a hash got ho the hash
   * if there is nothing go to the top
   */
  scrollBehavior(to, from, savedPosition){
    if(savedPosition){
      return savedPosition;
    }
    if(to.hash){
      return {selector: to.hash};
    }
    return {x: 0, y: 0};
  }
});

var vm = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

export const vueInstance = vm;
