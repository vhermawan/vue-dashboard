import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Welcome from "../views/Welcome.vue";
import PositiveTweet from "../views/PositiveTweet.vue";
import NegativeTweet from "../views/NegativeTweet.vue";
import Tweet from "../views/Tweet.vue";

const routes = [
  {
    path: "/",
    name: "/",
    // redirect: "/dashboard-default",
    component: Welcome,
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/positive-tweet/vaksin",
    name: "Positive Tweet",
    component: PositiveTweet,
  },
  {
    path: "/negative-tweet/vaksin",
    name: "Negative Tweet",
    component: NegativeTweet,
  },
  {
    path: "/tweet/vaksin",
    name: "Tweet",
    component: Tweet,
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
