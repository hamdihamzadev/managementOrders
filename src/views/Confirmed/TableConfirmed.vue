<template>
  <div class="table-confirmed mt-4">
    <TableGlobal :options="options" :orders="ordersConfirmed" @send-order="SendOrder" @remove-order="removeorder"
      sentenceorders="No Confirmed Orders Today" @save-status="saveStatus" />
      <p>values{{ storevaluesStatus }}</p>
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

      }
    },


    computed: {

      // GET STORE CONFIRMED
      ...mapState('OrderConfirmed', {
        storeConfirmed: state => state
      }),

      ...mapState('valuesStatus', {
        storevaluesStatus: state => state.confirmed
      }),

      ordersConfirmed() {
        let allOrdersConfirmed = []
        Object.values(this.storeConfirmed).forEach(tableCtg => {
          tableCtg.length > 0 ? tableCtg.forEach(order => {
            allOrdersConfirmed.push(order)
          }) : ''
        })

        return allOrdersConfirmed.sort((orderA, orderB) => {
          return orderA.ref - orderB.ref
        })

      },


    },



    methods: {

      // GET FUNCTION ACTIONS IN VUEX CONFIRMED
      ...mapActions('OrderConfirmed', ['ac_orderConfirmed']),
      ...mapActions('OrderConfirmed', ['ac_RemoveOrderConfirmed']),
      ...mapActions('ShippedOrders', ['ac_addOrderShipped']),
      ...mapActions('InProgressOrders', ['ac_addOrderInProgress']),
      // GET FUNCTION ACTIONS IN VUEX ALL ORDERS
      ...mapActions('allOrder', ['ac_addInAllOrder']),
      // GET FUNCTION ACTIONS IN VUEX VALUES STATUS
      ...mapActions('valuesStatus', ['ac_addNewValue', 'ac_removeValue']),


      saveStatus() {
        let allValues = Array.from(document.querySelectorAll('select')).map(select => select.value)
        this.ac_addNewValue({
          status: 'confirmed',
          values: allValues
        })
      },

      SendOrder(data) {

        this.allValues
        let orderSelected = {}
        for (const category in this.storeConfirmed) {
          this.storeConfirmed[category].forEach(order => {
            // CHECK  VERIFICATION ORDER WITH REF
            order.ref === data.ref ? (orderSelected.category = category, orderSelected.order = order) : ''
          })
        }
        //  VALUE SELECTED
        let valueselected = document.querySelector(`#select${data.index}`).value
        // CHECK VALUE 
        valueselected === 'Shipped' ? (this.ac_addOrderShipped(orderSelected), this.ac_addInAllOrder({
              status: 'shipped',
              order: orderSelected
            }),
            this.ac_RemoveOrderConfirmed({
              category: orderSelected.category,
              ref: data.ref
            }), this.ResetvaluesRemoSend(data.index)) :

          valueselected === 'Progress' ? (this.ac_addOrderInProgress(orderSelected), this.ac_addInAllOrder({
              status: 'progress',
              order: orderSelected
            }),
            this.ac_RemoveOrderConfirmed({
              category: orderSelected.category,
              ref: data.ref
            }), this.ResetvaluesRemoSend(data.index)) : ''

      },

      //REMOVE ORDER
      removeorder(data) {

        this.allValues
        for (const category in this.storeConfirmed) {
          this.storeConfirmed[category].forEach(order => {
            // CHECK  VERIFICATION ORDER WITH REF
            order.ref === data.ref ? this.ac_RemoveOrderConfirmed({
              category: category,
              ref: data.ref
            }) : ''
          })
        }
        // Reset values
        this.ResetvaluesRemoSend(data.index)
      },


      // RESET VALUE AFTER REMOVE OR SEND
      ResetvaluesRemoSend(index) {
        // get value for any select after remove or send order
        this.allValues.splice(index, 1)
        let allSelects = document.querySelectorAll('select')

        this.allValues.forEach((value, index) => {
          allSelects[index].value = value
        })

        allSelects.forEach((sle, index) => {
          sle.value = this.allValues[index]
        })


        window.localStorage.setItem('statusConfirmed', JSON.stringify(this.allValues))
      },



    },



  }
</script>