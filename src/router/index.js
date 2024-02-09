import Vue from "vue";
import VueRouter from "vue-router";
import DashBord from '../views/DashBord.vue'
import NewOrders from '../views/NewOrders.vue'


Vue.use(VueRouter);

const routes = [
  { path: '/', component: DashBord },
  { path: '/Orders/NewOrders', component: NewOrders },
];

const router = new VueRouter({
  routes,
});

export default router;
