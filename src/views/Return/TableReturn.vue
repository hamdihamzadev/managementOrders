<template>
  <div>
    <TableGlobal :titletable="titletable" :orders="ReturnOrders" @remove-order="removeorder"
      sentenceorders="No order return today" />
  </div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'
  import TableGlobal from '@/components/TableGlobal.vue'
  export default {
    name: 'TableReturn',
    components: {
      TableGlobal
    },

    data() {
      return {
        titletable: 'Today Return'
      }
    },

    computed: {
      // GET MODULE STATE RETURN
      ...mapState('ReturnOrders', {
        ReturnOrders: 'ReturnOrders'
      }),
    },

    mounted() {
      // CALL FUNCTION getOrderShipped
      this.getOrderShipped()
    },


    methods: {
      ...mapActions('ReturnOrders', ['ac_RemoveOrderReturn']),
      ...mapActions('ReturnOrders', ['ac_addReturn']),

      //REMOVE ORDER
      removeorder(index) {
        this.ac_RemoveOrderReturn(index) // ===> REMOVE ORDER IN STORE VUEX RETURN ACTIONS
        localStorage.setItem('Return', JSON.stringify(this.ReturnOrders)) // UPDATE STOCK RETURN
      },

      // GET ORDERS DELIVRED IN LOCALSTOREAGE
      getOrderShipped() {

        let OrdersShippedLocal = JSON.parse(localStorage.getItem('Return'))
        OrdersShippedLocal && OrdersShippedLocal.length > this.ReturnOrders.length ?
          OrdersShippedLocal.forEach(order => {this.ac_addReturn(order)}) : ''
      },
    }
  }
</script>