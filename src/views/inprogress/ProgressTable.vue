<template>

  <TableGlobal :options="options" :orders="ProgressOrders" :titletable="titletable" @send-order="SendOrder"
    @remove-order="removeorder" @save-status="saveStatus" />

</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'
  import TableGlobal from '@/components/TableGlobal.vue'
  export default {
    name: 'ProgressTable',
    components: {
      TableGlobal
    },
    data() {
      return {
        titletable: 'Orders In Progress',
        options: [{
            value: 'Shipped',
            text: 'Shipped'
          },
          {
            value: 'Not treat',
            text: 'Not treat'
          },
        ],
      }
    },

    computed: {
      //GET STATE INPROGRESS IN VUEX
      ...mapState('InProgressOrders', {
        ProgressOrders: 'ProgressOrders'
      }),
      //GET STATE SHIPPED IN VUEX
      ...mapState('ShippedOrders', {
        ShippedOrders: 'ShippedOrders'
      }),

      // GET ALL VALUES IN SELECTS
      allValues() {
        let allValues = Array.from(document.querySelectorAll('select')).map(select => select.value)
        return allValues
      }

    },

    mounted() {
      // CALL FUNCTION GET ORDERS
      this.getOrderProgress()
    },

    methods: {
      // GET ACTIONS IN STORE FOR ADD ORDER PROGRESS
      ...mapActions('InProgressOrders', ['ac_addProgress']),
      // GET ACTIONS IN STORE FOR REMOVE ORDER PROGRESS
      ...mapActions('InProgressOrders', ['ac_RemoveOrderProgress']),
      //GET ACTIONS IN STORE FOR ORDER SHIPPED
      ...mapActions('ShippedOrders', ['ac_addShipped']),


      // GET ORDERS Progress IN LOCALSTOREAGE
      getOrderProgress() {
        let OrdersProgressLocal = JSON.parse(localStorage.getItem('Progress'))
        OrdersProgressLocal && OrdersProgressLocal.length > this.ProgressOrders.length ?
        OrdersProgressLocal.forEach(order => {this.ac_addProgress(order)}) : ''
      },

      // SEND ORDER IN YOUT PLACE
      SendOrder(index) {

        this.allValues
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
        valueselected === 'Shipped' ? (this.ac_addShipped(objectOrder), this.ac_RemoveOrderProgress(index)) : ''

        // Reset values
        this.ResetvaluesRemoSend(index)

      },

      //REMOVE ORDER
      removeorder(index) {
        this.allValues
        this.ac_RemoveOrderProgress(index)
      },


      saveStatus() {
        let allValues = Array.from(document.querySelectorAll('select')).map(select => select.value)
        window.localStorage.setItem('statusProgress', JSON.stringify(allValues))
      },


      // RESET VALUE AFTER REMOVE OR SEND
      ResetvaluesRemoSend(index) {
        // get value for any select after remove or send order
        this.allValues.splice(index, 1)
        let statuAfter = document.querySelectorAll('select')
        this.allValues.forEach((value, i) => {statuAfter[i].value = value})
        window.localStorage.setItem('statusProgress', JSON.stringify(this.allValues))
      },

    }

  }
</script>