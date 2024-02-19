<template>
  <div class="table-confirmed mt-4">
    <TableGlobal :options="options" :orders="OrderConfirmed" :titletable="titletable" @send-order="SendOrder"
      @remove-order="removeorder" sentenceorders="No Confirmed Orders Today" @save-status="saveStatus" />
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
        options: [{
            value: 'Shipped',
            text: 'Shipped'
          },
          {
            value: 'Progress',
            text: 'Progress'
          },
          {
            value: 'Not treat',
            text: 'Not treat'
          },
        ],
        titletable: 'Orders Confirmed',
      }
    },


    computed: {

      // GET STORE CONFIRMED
      ...mapState('OrderConfirmed', {
        OrderConfirmed: 'dataConfrimed'
      }),
      // GET STORE CONFIRMED
      ...mapState('OrderConfirmed', {
        Status: 'Status'
      }),

      // GET ALL VALUES IN SELECTS
      allValues() {
        let allValues = Array.from(document.querySelectorAll('select')).map(select => select.value)
        return allValues
      }

    },

    mounted() {
      this.getOrdersConfirmed()
    },

    methods: {

      // GET FUNCTION ACTIONS IN VUEX CONFIRMED
      ...mapActions('OrderConfirmed', ['ac_orderConfirmed']),
      ...mapActions('OrderConfirmed', ['ac_RemoveOrderConfirmed']),
      ...mapActions('ShippedOrders', ['ac_addShipped']),
      ...mapActions('InProgressOrders', ['ac_addProgress']),

      getOrdersConfirmed() {
        let orderConfirmedlocal = JSON.parse(localStorage.getItem('Confirmed'))
        orderConfirmedlocal && orderConfirmedlocal.length>this.OrderConfirmed.length? 
        orderConfirmedlocal.forEach(order => {this.ac_orderConfirmed(order)}) :''
      },

      saveStatus() {
        let allValues = Array.from(document.querySelectorAll('select')).map(select => select.value)
        window.localStorage.setItem('statusConfirmed', JSON.stringify(allValues))
      },

      SendOrder(index) {

        this.allValues
        // ORDER
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
        //  VALUE SELECTED
        let valueselected = Array.from(document.querySelector(`#order${index}`).children)[9].firstChild.value
        // CHECK VALUE 
        valueselected === 'Shipped' ? (this.ac_addShipped(objectOrder), this.ac_RemoveOrderConfirmed(index)) :
        valueselected === 'Progress' ? (this.ac_addProgress(objectOrder), this.ac_RemoveOrderConfirmed(index)) : ''

        // Reset values
        this.ResetvaluesRemoSend(index)
      },

      //REMOVE ORDER
      removeorder(index){
        this.allValues
        this.ac_RemoveOrderConfirmed(index)

        // Reset values
        this.ResetvaluesRemoSend(index)
      },
         

      // RESET VALUE AFTER REMOVE OR SEND
      ResetvaluesRemoSend(index){
      // get value for any select after remove or send order
      this.allValues.splice(index, 1)
      let statuAfter = document.querySelectorAll('select')
      this.allValues.forEach((value, i) => {statuAfter[i].value = value})
      window.localStorage.setItem('statusConfirmed', JSON.stringify(this.allValues))
       },

      // CHANGE BACKGROUND 


    },

    

  }
</script>