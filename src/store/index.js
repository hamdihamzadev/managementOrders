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

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    NewOrders: NewOrdersModule,
    OrderConfirmed:OrderConfirmedModule,
    OrderCanceld:CanceldModule,
    ShippedOrders:ShippedModule,
    InProgressOrders:InProgressModule,
    DelivredOrders:DelivredModule,
    PostpondOrders:PostpondModule,
    ReturnOrders:ReturnModule
  }
});
