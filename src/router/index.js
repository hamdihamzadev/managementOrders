import Vue from "vue";
import VueRouter from "vue-router";
import DashBord from '../views/DashBord.vue'
import NewOrders from '../views/NewOrders.vue'
import ConfirmedOredrs from '../views/ConfirmedOrders.vue'
import ShippedOrder from '../views/ShippedOrder.vue'
import DeliVerd from '../views/DeliVerd.vue'
import PostPond from '../views/PostPond.vue'
import ReTurn from '../views/ReTurn.vue'
import CanCeld from '../views/CanCeld.vue'
import InProgress from '../views/InProgress.vue'
import LoginUser from '../views/LoginUser.vue'
import SignUp from '../views/SignUp.vue'
import AllProducts from '../views/AllProduct.vue'
import StockProduct from '../views/StockProduct.vue'
import TopStatistics from '../views/TopStatistics.vue'
import WorstStatistics from '../views/WorstStatistics.vue'

Vue.use(VueRouter);

const routes = [
  
  { path: '/', component: DashBord },
  { path: '/Orders/NewOrders', component: NewOrders },
  { path: '/Orders/Confirmed', component: ConfirmedOredrs},
  { path: '/Orders/Shipped', component: ShippedOrder},
  { path: '/Orders/Deliverd', component: DeliVerd},
  { path: '/Orders/PostPond', component: PostPond},
  { path: '/Orders/Return', component: ReTurn},
  { path: '/Orders/Canceld', component: CanCeld},
  { path: '/Orders/InProgress', component: InProgress},
  { path: '/Login', component: LoginUser},
  { path: '/Signup', component: SignUp},
  { path: '/Products', component: AllProducts},
  { path: '/Stock', component: StockProduct},
  { path: '/Statistics/Top', component: TopStatistics},
  { path: '/Statistics/Worst', component: WorstStatistics},

];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
