import Vue from "vue";
import VueRouter from "vue-router";
import DashBord from '../views/DashBord.vue'
import NewOrders from '../views/NewOrders.vue'
import ConfirmedOredrs from '../views/ConfirmedOrders.vue'
import ShippedOrder from '../views/ShippedOrder.vue'
import DeliVerd from '../views/DeliVerd.vue'


Vue.use(VueRouter);

const routes = [
  { path: '/', component: DashBord },
  { path: '/Orders/NewOrders', component: NewOrders },
  { path: '/Orders/Confirmed', component: ConfirmedOredrs},
  { path: '/Orders/Shipped', component: ShippedOrder},
  { path: '/Orders/Deliverd', component: DeliVerd},
];

const router = new VueRouter({
  routes,
});

export default router;
