// store/index.js

import Vue from 'vue';
import Vuex from 'vuex';
import NewOrdersModule from '@/store/modules/orders/neworders.js';
import OrderConfirmedModule from '@/store/modules/orders/confirmedorder.js'
import CanceldModule from '@/store/modules/orders/canceld'
import ShippedModule from '@/store/modules/orders/shipped'
import InProgressModule from '@/store/modules/orders/inprogress'
import DelivredModule from '@/store/modules/orders/delivred'
import PostpondModule from '@/store/modules/orders/postpond'
import ReturnModule from '@/store/modules/orders/return'
import UsersModule from '@/store/modules/users'
import ProductsModule from '@/store/modules/allproucts'
import allOrder from '@/store/modules/orders/allOrders'
import valuesStatus from '@/store/modules/statusvalues'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    NewOrders: NewOrdersModule,
    OrderConfirmed:OrderConfirmedModule,
    OrderCancelled:CanceldModule,
    ShippedOrders:ShippedModule,
    InProgressOrders:InProgressModule,
    DelivredOrders:DelivredModule,
    PostpondOrders:PostpondModule,
    ReturnOrders:ReturnModule,
    UsersModule : UsersModule,
    ProductsModule,
    allOrder,
    valuesStatus,
    
  }
});
