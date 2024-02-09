import Vue from "vue";
import VueRouter from "vue-router";
import DashBord from '../views/DashBord.vue'


Vue.use(VueRouter);

const routes = [
  { path: '/', component: DashBord },
];

const router = new VueRouter({
  routes,
});

export default router;
