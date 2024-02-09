import Vue from "vue";
import VueRouter from "vue-router";
import DashBord from '../views/DashBord.vue'
import NewOrders from '../views/NewOrders.vue'
import ConfirmedOredrs from '../views/ConfirmedOrders.vue'


Vue.use(VueRouter);

const routes = [
  { path: '/', component: DashBord },
  { path: '/Orders/NewOrders', component: NewOrders },
  { path: '/Orders/Confirmed', component: ConfirmedOredrs},
];

const router = new VueRouter({
  routes,
});

export default router;
