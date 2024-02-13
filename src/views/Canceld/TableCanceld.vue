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

         methods:{
        // GET ACTION REMOVE ORDER CANCELD IN VUEX
        ...mapActions('OrderCanceld',['ac_RemoveOrderCanceld']),
        //REMOVE ORDER CANCELD
        removeorder(index){
            this.ac_RemoveOrderCanceld(index)  // ===> REMOVE ORDER IN STORE VUEX CANCELD ACTIONS
           localStorage.setItem('Canceled',JSON.stringify(this.OrdersCanceld))  // UPDATE STOCK CANCELD
        }
         }
    }
</script>



<style>
    .tabelCanceld {
        border-radius: 12px;
    }
</style>