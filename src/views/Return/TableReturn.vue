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

    mounted() {
      // CALL FUNCTION getOrderShipped
      this.getOrderShipped()
    },


    methods: {
      ...mapActions('ReturnOrders', ['ac_RemoveOrderReturn']),
      ...mapActions('ReturnOrders', ['ac_addOrderReturn']),

      //REMOVE ORDER
      removeorder(data) {
       
        for(const category in this.StoreOrdersReturn){
          this.StoreOrdersReturn[category].forEach(order=>{
            order.ref===data.ref ? this.ac_RemoveOrderReturn({category:category,ref:data.ref}) : ''
          })
        }
      },

      // GET ORDERS DELIVRED IN LOCALSTOREAGE
      getOrderShipped() {

        let OrdersReturnLocal = JSON.parse(localStorage.getItem('Return'))
        let numbersOrderLocal = Object.values(OrdersReturnLocal).reduce((acc, tableCtg) => {
            return acc + tableCtg.length;
        }, 0);

        let numbersOrderStore = Object.values(this.StoreOrdersReturn).reduce((acc, tableCtg) => {
            return acc + tableCtg.length;
        }, 0);

        if (OrdersReturnLocal && numbersOrderLocal > numbersOrderStore) {
          for (const category in OrdersReturnLocal) {
            OrdersReturnLocal[category].forEach(orderConf => {
                  this.ac_addOrderReturn({
                      category: category,
                      order: orderConf
                  })
              })
          }
        }
    
       
      },
    }
  }
</script>