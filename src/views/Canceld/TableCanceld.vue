<template>

    <div class="tabelCanceld mt-4">
        <TableGlobal 
        :titletable="titletable"
        :orders="OrdersCanceld"
        :options="options" 
        @remove-order="removeorder"
        sentenceorders="No order canceld today"
         />
    </div>

</template>


<script>
    import {
        mapState,
        mapActions
    } from 'vuex'
    import TableGlobal from '@/components/TableGlobal.vue'

    export default {
        name: 'TableCanceld',
        components: {
            TableGlobal
        },
        data() {
            return {
                titletable: 'Orders Canceld',
                options: ['Confirmed', 'Canceled'],
            }
        },
        computed: {
            // GET DATA CANCELD FROM VUEX 
            ...mapState('OrderCanceld', {
                OrdersCanceld: 'ordercanceld'
            }),
        },

        mounted(){
            this.getOrders()
        },

         methods:{
        // GET ACTION REMOVE ORDER CANCELD IN VUEX
        ...mapActions('OrderCanceld',['ac_RemoveOrderCanceld']),
         // GET FUNCTION ACTIONS IN VUEX CANCELD
         ...mapActions('OrderCanceld', ['ac_addCanceld']),

         // GET ORDERS FROM LOCALSTORAGE AND PUSH IN STORE
         getOrders(){
            let orderLocal=JSON.parse(localStorage.getItem('Canceled'))
            console.log(orderLocal)
            orderLocal && orderLocal.length > this.OrdersCanceld.length ? orderLocal.forEach(order=>this.ac_addCanceld(order)):''
         },
        //REMOVE ORDER CANCELD
        removeorder(index){
           this.ac_RemoveOrderCanceld(index)  // ===> REMOVE ORDER IN STORE VUEX CANCELD ACTIONS
        }
         }
    }
</script>



<style>
    .tabelCanceld {
        border-radius: 12px;
    }
</style>