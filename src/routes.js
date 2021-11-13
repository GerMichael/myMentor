import Start from './components/start/Start.vue';
import Header from './components/shared/Header.vue';
import Footer from './components/shared/Footer.vue';
import UserLogin from "./components/start/UserLogin.vue";
import UserRegistration from "./components/start/UserRegistration.vue";
import Home from "./components/home/Home.vue";
import UserLogoutProcess from "./components/user/UserLogoutProcess.vue";
import UserLogout from "./components/start/UserLogout.vue";
import NotFound from "./components/shared/NotFound.vue";
import User from "./components/user/User.vue";
import SignedIn from "./components/home/SignedIn.vue";
import Mentorings from "./components/mentorings/Mentorings.vue";
import GroupMentors from "./components/groupMentors/GroupMentors.vue";
import GroupMentorings from "./components/groupMentorings/GroupMentorings.vue";
import { store } from "./store/store";
import Impressum from "./components/general/Impressum.vue";
import Datenschutz from "./components/general/Datenschutz.vue";
import General from "./components/general/General.vue";
import Chats from "./components/chat/Chats.vue";

export const routes = [
    { path: "/", name: "start", components: {
        default: Start,
        footer: Footer
    }, children: [
        { path: "login", component: UserLogin },
        { path: "registration", component: UserRegistration },
        { path: "loggedOut", component: UserLogout }
    ] },
    { path: "/signedIn", name: "signedIn", components: {
        header: Header,
        default: SignedIn
    }, redirect: "/home", beforeEnter: (to, from, next)=>{
        if(store.getters.getCurrentUser.email == ''){
            console.log("[routes.js]: You are not signed in!");
            console.log("[routes.js]: Start Check", to.fullPath);
            //debugger; //Chrome Debugger
            next({path:"/login", query: {origin: to.fullPath}});
        } else {
            next();
        }
    }, children: [
        { path: "/home", name: "home", component: Home },
        { path: "/chat", name: "chat", component: Chats },
        { path: "/user", name: "user", component: User},
        { path: "/mentorings", name: "mentorings", component: Mentorings },
        { path: "/groupmentor", name: "groupmentor", component: GroupMentors },
        { path: "/groups", name: "groups", component: GroupMentorings }
    ]},
    { path: "/info", component: General, children: [
        { path: "/imprint", component: Impressum },
        { path: "/privacy", component: Datenschutz },
    ] },
    { path: "/logout", component: UserLogoutProcess },
    { path: "/notfound", name: "notfound", component: NotFound },
    { path: "*", redirect: "/notfound"}
];