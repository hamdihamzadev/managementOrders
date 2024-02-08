<template>
  <div id="app" class="container-flui d-flex">
    <div :class="{'invisible':toggelaside}"><SideBar /></div>
    <div class="head-cont" :class="{'fullWidth':toggelaside}">
      <HeaDer @toggel-header="toggelheader" />
      <router-view />
    </div>
  </div>
</template>

<script>
  import SideBar from './components/app/SideBar.vue'
  import HeaDer from './components/app/HeaDer.vue'
  import {
    mapActions
  } from 'vuex'

  export default {
    name: 'App',
    components: {
      SideBar,
      HeaDer
    },
    data() {
      return {
        toggelaside: false,
      }
    },

    methods: {
      toggelheader() {
        this.toggelaside = !this.toggelaside
      },
      // GET FUNCTION ACTIONS IN VUEX CONFIRMED
      ...mapActions('OrderConfirmed', ['ac_orderConfirmed']),
      // GET FUNCTION ACTIONS IN VUEX CANCELD
      ...mapActions('OrderCanceld', ['ac_addCanceld']),
      //GET ACTIONS IN STORE FOR ORDER SHIPPED
      ...mapActions('ShippedOrders', ['ac_addShipped']),
      //GET ACTIONS IN STORE FOR ORDER IN PROGRESS
      ...mapActions('InProgressOrders', ['ac_addProgress']),
      // GET MODULE ACTIONS FOR DELIVRED
      ...mapActions('DelivredOrders', ['ac_addDelivred']),
      // GET MODULE ACTIONS FOR POSTPOND
      ...mapActions('PostpondOrders', ['ac_addPostpond']),
      // GET MODULE ACTIONS FOR RETURN
      ...mapActions('ReturnOrders', ['ac_addReturn']),
    },

    mounted() {
      window.addEventListener('load', () => {
        // for confirmed
        let orderConfirmedlocal = JSON.parse(localStorage.getItem('Confirmed'))
        //CHECK IF IS CREATE
        if(orderConfirmedlocal){
          orderConfirmedlocal.forEach(order => {
          this.ac_orderConfirmed(order)
        })
        }
        
        // for canceld
        let OrdersCanceldLocal = JSON.parse(localStorage.getItem('Canceled'))
         //CHECK IF IS CREATE
        if(OrdersCanceldLocal){
          OrdersCanceldLocal.forEach(order => {
          this.ac_addCanceld(order)
        })
        }
       
        // for shipped  
        let OrdersShippedLocal = JSON.parse(localStorage.getItem('Shipped'))
         //CHECK IF IS CREATE
        if(OrdersShippedLocal){
          OrdersShippedLocal.forEach(order => {
          this.ac_addShipped(order)
        })
        }
    
        // for inprogress
        let OrdersInProgressLocal = JSON.parse(localStorage.getItem('Progress'))
         //CHECK IF IS CREATE
        if(OrdersInProgressLocal){
          OrdersInProgressLocal.forEach(order => {
          this.ac_addProgress(order)
        })
        }
        
        // for DELIVRED
        let OrdersDelivredLocal = JSON.parse(localStorage.getItem('Delivered'))
         //CHECK IF IS CREATE
        if(OrdersDelivredLocal){
          OrdersDelivredLocal.forEach(order => {
          this.ac_addDelivred(order)
        })
        }
        
        // for Postponed
        let OrdersPostponedLocal = JSON.parse(localStorage.getItem('Postponed'))
         //CHECK IF IS CREATE
        if(OrdersPostponedLocal){
          OrdersPostponedLocal.forEach(order => {
          this.ac_addPostpond(order)
        })
        }
        
        // for Return
        let OrdersReturnLocal = JSON.parse(localStorage.getItem('Return'))
         //CHECK IF IS CREATE
        if(OrdersReturnLocal){
          OrdersReturnLocal.forEach(order => {
          this.ac_addReturn(order)
        })
        }

      })
    }
  }
</script>

<style lang="scss">
  #app {
    background-color: #02021e;
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: white;
    overflow-x: hidden;

    .head-cont {
      width: 100%;
      margin-left: 14%;
      transition: 0.3s;

      .dashbord,
      .neworders,
      .confirmedorders,
      .shipped,
      .delivred,
      .return,
      .postpond {
        margin: 47px 0px;

      }

      .namepage {
        margin-bottom: 30px;
      }
    }

    .fullWidth {
      margin-left: 0px;
    }
    .invisible{
      display: none;
    }
  }
</style>