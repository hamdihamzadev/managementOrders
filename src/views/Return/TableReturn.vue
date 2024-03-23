<template>
  <div>
    <TableGlobal  :orders="OrdersReturn" @remove-order="removeorder"
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


    computed: {
      // GET MODULE STATE RETURN
      ...mapState('ReturnOrders', {
        StoreOrdersReturn: state=>state
      }),

      OrdersReturn(){
        let allOrders=[]
        Object.values(this.StoreOrdersReturn).forEach(tablectg=>{
          tablectg.length>0 ? tablectg.forEach(order=>{allOrders.push(order)}) : ''
        })
        return allOrders.sort((orderA ,orderB)=>{ return orderA.ref - orderB.ref })
      },
    },

    methods: {
      ...mapActions('ReturnOrders', ['ac_RemoveOrderReturn']),
      ...mapActions('ReturnOrders', ['ac_addOrderReturn']),

      //REMOVE ORDER
      removeorder(data) {
       
        for(const categoryKey in this.StoreOrdersReturn){
          this.StoreOrdersReturn[categoryKey].forEach(order=>{
            order.date === data.date ? this.ac_RemoveOrderReturn({ category: categoryKey,date: data.date }) : ''
          })
        }
      },

    }
  }
</script>