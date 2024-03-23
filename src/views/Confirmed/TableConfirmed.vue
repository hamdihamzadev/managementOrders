<template>
  <div class="table-confirmed mt-4">
    <TableGlobal :options="options" :orders="ordersConfirmed" @send-order="SendOrder" @remove-order="removeorder"
      sentenceorders="No Confirmed Orders Today" @save-status="saveStatus" />
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

        let orderSelected = {
          category: null,
          order: data.order
        }

        for (const categoryKey in this.storeConfirmed) {
          this.storeConfirmed[categoryKey].forEach(order => {
            order.date === data.order.date ? orderSelected.category = categoryKey : null
          })
        }

        // CHECK VALUE 
        if (data.value === 'Shipped') {

          this.ac_addOrderShipped(orderSelected),
            this.ac_addInAllOrder({
              status: 'shipped',
              order: data.order
            }),
            this.ac_RemoveOrderConfirmed({
              category: orderSelected.category,
              date: data.order.date
            }),
            this.ac_removeValue({
              status: 'confirmed',
              index: data.index
            })

        } else if (data.value === 'Progress') {

          this.ac_addOrderInProgress(orderSelected),
            this.ac_addInAllOrder({
              status: 'progress',
              order: data.order
            }),
            this.ac_RemoveOrderConfirmed({
              category: orderSelected.category,
              date: data.order.date
            }),
            this.ac_removeValue({
              status: 'confirmed',
              index: data.index
            })
        }


      },

      //REMOVE ORDER
      removeorder(data) {

        // this.allValues
        for (const categoryKey in this.storeConfirmed) {
          this.storeConfirmed[categoryKey].forEach(order => {
            // CHECK VERIFICATION ORDER WITH DATE
            order.date === data.date ? this.ac_RemoveOrderConfirmed({
              category: categoryKey,
              date: data.date
            }) : ''
          })
        }

        this.ac_removeValue({
          status: 'confirmed',
          index: data.index
        })

      },

    },

  }
</script>