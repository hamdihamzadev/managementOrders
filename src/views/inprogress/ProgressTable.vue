<template>

  <TableGlobal :options="options" :orders="OrdersInProgress"  @send-order="SendOrder"
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
        StoreOrdersInProgress: state=>state
      }),

      OrdersInProgress(){
        const allOrders=[]
        Object.values(this.StoreOrdersInProgress).forEach(tablectg=>{
          tablectg.length>0 ? tablectg.forEach(order=>allOrders.push(order)) : ''
        })
        return allOrders.sort((orderA , orderB)=>{ return orderA.ref - orderB.ref })
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
      

      SendOrder(data) {

        this.allValues
        let orderSelected = {}
        for (const category in this.StoreOrdersInProgress) {
            this.StoreOrdersInProgress[category].forEach(order => {
              order.ref === data.ref ? (orderSelected.category = category, orderSelected.order = order) : ''
            })
        }
        
        let valueselected = document.querySelector(`#select${data.index}`).value
        valueselected === 'Shipped' ? (this.ac_addOrderShipped(orderSelected),this.ac_addInAllOrder({status:'shipped',order:orderSelected}), 
        this.ac_RemoveOrderProgress({category:orderSelected.category,ref:data.ref}),this.ResetvaluesRemoSend(data.index)) : ''

      },

      // REMOVE ORDER
      removeorder(data) {
        this.allValues
        for(const category in this.StoreOrdersInProgress){
          this.StoreOrdersInProgress[category].forEach(order=>{
            order.ref===data.ref ? this.ac_RemoveOrderProgress({category:category,ref:data.ref}) : ''
          })
        }
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