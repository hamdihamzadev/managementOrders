<template>
  <div class="table-confirmed mt-4">
    <TableGlobal :options="options" :orders="OrderConfirmed" :titletable="titletable" @send-order="SendOrder"
      @remove-order="removeorder"  sentenceorders="No Confirmed Orders Today"/>
  </div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'
  import TableGlobal from '@/components/TableGlobal.vue'
  export default {
    name: 'TableConfirmed',
    components: {
      TableGlobal
    },

    data() {
      return {
        valueinitial: '',
        options: ['Shipped', 'Progress'],
        titletable: 'Orders Confirmed',
      }
    },

    computed: {

      // GET STORE CONFIRMED
      ...mapState('OrderConfirmed', {
        OrderConfirmed: 'dataConfrimed'
      }),
      // GET STORE SHIPPED
      ...mapState('ShippedOrders', {
        ShippedOrders: 'ShippedOrders'
      }),
      // GET STORE IN PROGRESS
      ...mapState('InProgressOrders', {
        ProgressOrders: 'ProgressOrders'
      })

    },

    methods: {
      // GET ACTION IN STORE FOR ORDER CONFIRMED   
      ...mapActions('OrderConfirmed', ['ac_RemoveOrderConfirmed']),
      //GET ACTIONS IN STORE FOR ORDER SHIPPED
      ...mapActions('ShippedOrders', ['ac_addShipped']),
      //GET ACTIONS IN STORE FOR ORDER IN PROGRESS
      ...mapActions('InProgressOrders', ['ac_addProgress']),


      SendOrder(index) {
        // GET TD IN DOM FOR ORDER
        let order = Array.from(document.querySelector(`#order${index}`).children).slice(0, 9).map(td => td
          .textContent)
        // PUSH ORDER IN OBJECT
        let objectOrder = {
          Customer: order[0],
          Phone: order[1],
          city: order[2],
          Adress: order[3],
          Product: order[4],
          Price: order[5],
          Delivery: order[6],
          Quantity: order[7],
          Total: order[8]
        }
        // GET VALUE SELECTED
        let valueselected = Array.from(document.querySelector(`#order${index}`).children)[9].firstChild.value
        // CHECK VALUE 
        if (valueselected === 'Shipped') {

          this.ac_addShipped(objectOrder); // ===> PUSH IN STORE ORDER SHIPPED 
          localStorage.setItem('Shipped', JSON.stringify(this.ShippedOrders)) // ===> PUSH IN STOCK SHIPPED
          this.ac_RemoveOrderConfirmed(index) // ===> REMOVE ORDER IN STORE VUEX CONFIRMED ACTIONS
          localStorage.setItem('Confirmed', JSON.stringify(this.OrderConfirmed)) // UPDATE STOCK CONFIRMED

        }
        if (valueselected === 'Progress') {

          this.ac_addProgress(objectOrder); // ===> PUSH IN STORE ORDER PROGRESS
          localStorage.setItem('Progress', JSON.stringify(this.ProgressOrders)) // ===> PUSH IN STOCK PROGRESS
          this.ac_RemoveOrderConfirmed(index) // ===> REMOVE ORDER IN STORE VUEX CONFIRMED ACTIONS
          localStorage.setItem('Confirmed', JSON.stringify(this.OrderConfirmed)) // UPDATE STOCK CONFIRMED

        }
      },

      //REMOVE ORDER
      removeorder(index) {
        this.ac_RemoveOrderConfirmed(index) // ===> REMOVE ORDER IN STORE VUEX CONFIRMED ACTIONS
        localStorage.setItem('Confirmed', JSON.stringify(this.OrderConfirmed)) // UPDATE STOCK CONFIRMED
      }
    }

  }
  // click remove ===> remove order in store and update localeStorage
  // ===> 
</script>