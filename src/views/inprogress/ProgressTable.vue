<template>

  <TableGlobal :options="options" :orders="OrdersInProgress" @send-order="SendOrder" @remove-order="removeorder"
    @save-status="saveStatus" />

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
        StoreOrdersInProgress: state => state
      }),

      OrdersInProgress() {
        const allOrders = []
        Object.values(this.StoreOrdersInProgress).forEach(tablectg => {
          tablectg.length > 0 ? tablectg.forEach(order => allOrders.push(order)) : ''
        })
        return allOrders.sort((orderA, orderB) => {
          return orderA.ref - orderB.ref
        })
      },

      // GET ALL VALUES IN SELECTS
      allValues() {
        let allValues = Array.from(document.querySelectorAll('select')).map(select => select.value)
        return allValues
      }

    },


    methods: {
      // GET ACTIONS IN STORE FOR ADD ORDER PROGRESS
      ...mapActions('InProgressOrders', ['ac_addOrderInProgress']),
      // GET ACTIONS IN STORE FOR REMOVE ORDER PROGRESS
      ...mapActions('InProgressOrders', ['ac_RemoveOrderProgress']),
      //GET ACTIONS IN STORE FOR ORDER SHIPPED
      ...mapActions('ShippedOrders', ['ac_addOrderShipped']),
      // GET FUNCTION ACTIONS IN VUEX ALL ORDERS
      ...mapActions('allOrder', ['ac_addInAllOrder']),
      // GET FUNCTION ACTIONS IN VUEX VALUES STATUS
      ...mapActions('valuesStatus', ['ac_addNewValue', 'ac_removeValue']),

      saveStatus() {
        let allValues = Array.from(document.querySelectorAll('select')).map(select => select.value)
        this.ac_addNewValue({
          status: 'progress',
          values: allValues
        })
      },

      SendOrder(data) {

        let orderSelected = {
          category: null,
          order: data.order
        }

        for (const categoryKey in this.StoreOrdersInProgress) {
          this.StoreOrdersInProgress[categoryKey].forEach(order => {
            order.date === data.order.date ? orderSelected.category = categoryKey : null
          })
        }

       if(data.value === 'Shipped'){

          this.ac_addOrderShipped(orderSelected)
          this.ac_addInAllOrder({status: 'shipped', order: data.order})
          this.ac_RemoveOrderProgress({category: orderSelected.category , date: data.order.date})
          this.ac_removeValue({status: 'progress', index: data.index })

       }
       
          
      },

      // REMOVE ORDER
      removeorder(data) {

        for (const categoryKey in this.StoreOrdersInProgress) {
          this.StoreOrdersInProgress[categoryKey].forEach(order => {
            order.date === data.date ? this.ac_RemoveOrderProgress({category: categoryKey,date: data.date }) : ''
          })
          
          this.ac_removeValue({ status: 'progress',index: data.index })
        }
      },


    }

  }
</script>