<template>

   <TableGlobal 
   :options="options"
   :orders="ProgressOrders" 
   :titletable="titletable"
   @send-order="SendOrder"
   @remove-order="removeorder" />

</template>

<script>
import {
    mapState,
    mapActions
  } from 'vuex'
 import TableGlobal from '@/components/TableGlobal.vue'
export default{
    name:'ProgressTable',
    components: {
      TableGlobal
    },
    data(){
        return{
            options:['Shipped'],
            titletable:'Orders In Progress'
        }
    },

    computed:{
        //GET STATE INPROGRESS IN VUEX
        ...mapState('InProgressOrders',{
            ProgressOrders:'ProgressOrders'
        }),
        //GET STATE SHIPPED IN VUEX
        ...mapState('ShippedOrders',{
        ShippedOrders:'ShippedOrders'
        }),
    },

    methods:{
      // GET ACTIONS IN STORE FOR REMOVE ORDER PROGRESS
      ...mapActions('InProgressOrders',['ac_RemoveOrderProgress']),
      //GET ACTIONS IN STORE FOR ORDER SHIPPED
      ...mapActions('ShippedOrders',['ac_addShipped']),
        //GET ACTIONS IN STORE FOR ORDER SHIPPED
      ...mapActions('ShippedOrders',['ac_addShipped']),

      // SEND ORDER IN YOUT PLACE
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
          // PUSH IN STORE ORDER CONFIRMED AND IN STOCK CONFIRMED
          this.ac_addShipped(objectOrder);
          localStorage.setItem('Shipped', JSON.stringify(this.ShippedOrders))
          this.ac_RemoveOrderProgress(index)  // ===> REMOVE ORDER IN STORE VUEX PROGRESS ACTIONS
          localStorage.setItem('Progress',JSON.stringify(this.ProgressOrders))  // UPDATE STOCK PROGRESS
        }
      },

      //REMOVE ORDER
      removeorder(index) {
        this.ac_RemoveOrderProgress(index) // ===> REMOVE ORDER IN STORE VUEX PROGRESS ACTIONS
        localStorage.setItem('Progress',JSON.stringify(this.ProgressOrders)) // UPDATE STOCK PROGRESS
       }

    }
}
</script>