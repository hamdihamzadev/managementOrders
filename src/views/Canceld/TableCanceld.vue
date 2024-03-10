<template>

    <div class="tabelCanceld mt-4">
        <TableGlobal 
        :titletable="titletable"
        :orders="ordersCancled"
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
            ...mapState('OrderCancelled', {
                StoreOrdersCanceld: state=>state
            }),

            ordersCancled(){
                let allOrdersCanceld=[]
                Object.values(this.StoreOrdersCanceld).forEach(tableCtg=>{
                    tableCtg.length>0 ? tableCtg.forEach(order=>{allOrdersCanceld.push(order)}) : ''
                })

              return  allOrdersCanceld.sort((orderA , orderB)=>{ return orderA.ref - orderB.ref })
            }
        },

        mounted(){
            this.getOrdersCancled()
        },

         methods:{
        // GET ACTION REMOVE ORDER CANCELD IN VUEX
        ...mapActions('OrderCancelled',['ac_RemoveOrderCancelled']),
        // GET FUNCTION ACTIONS IN VUEX CANCELD
        ...mapActions('OrderCancelled', ['ac_addOrderCancelled']),

         // GET ORDERS FROM LOCALSTORAGE AND PUSH IN STORE
         getOrdersCancled(){
            let orderLocal=JSON.parse(localStorage.getItem('CancelledOrders'))
            let numbersOrderLocal = Object.values(orderLocal).reduce((acc, tableCtg) => {return acc + tableCtg.length;}, 0);
            let numbersOrderStore = Object.values(this.StoreOrdersCanceld).reduce((acc, tableCtg) => {return acc + tableCtg.length;}, 0);

            if(orderLocal && numbersOrderLocal>numbersOrderStore){
                for(const category in orderLocal){
                    orderLocal[category].forEach(orderConf=>{ this.ac_addOrderCancelled({category:category,order:orderConf})})
                }
            }
            
         },

        //REMOVE ORDER CANCELD
        removeorder(data){
           for(const category in this.StoreOrdersCanceld){
            this.StoreOrdersCanceld[category].forEach(order=>{
                order.ref===data.ref ? this.ac_RemoveOrderCancelled({category:category,ref:data.ref}) : ''
            })
           }
        }
         }
    }
</script>



<style>
    .tabelCanceld {
        border-radius: 12px;
    }
</style>