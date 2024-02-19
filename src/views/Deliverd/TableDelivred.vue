<template>
    <div>
        <TableGlobal :titletable="titletable" :orders="DelivredOrders" @remove-order="removeorder"
            sentenceorders="No order delivred today" />
    </div>
</template>

<script>
    import {
        mapState,
        mapActions
    } from 'vuex'
    import TableGlobal from '@/components/TableGlobal.vue'
    export default {

        name: 'TableDelivred',
        components: {
            TableGlobal
        },

        data() {
            return {
                titletable: 'Today Deliverd'
            }
        },

        computed: {
            // GET MODULE STATE DELIVRED
            ...mapState('DelivredOrders', {
                DelivredOrders: 'DelivredOredrs'
            }),
        },

        mounted(){
            // CALL FUNCTION getOrderShipped
            this.getOrderShipped()
        },

        methods: {
            ...mapActions('DelivredOrders', ['ac_RemoveOrderDelivred']),
            ...mapActions('DelivredOrders', ['ac_addDelivred']),
            //REMOVE ORDER
            removeorder(index) {
                this.ac_RemoveOrderDelivred(index) // ===> REMOVE ORDER IN STORE VUEX POSTPOND ACTIONS
                localStorage.setItem('Delivered', JSON.stringify(this.DelivredOrders)) // UPDATE STOCK POSTPOND
            },

            // GET ORDERS DELIVRED IN LOCALSTOREAGE
            getOrderShipped() {

                let OrdersShippedLocal = JSON.parse(localStorage.getItem('Delivered'))
                OrdersShippedLocal && OrdersShippedLocal.length > this.DelivredOrders.length ?
                OrdersShippedLocal.forEach(order => { this.ac_addDelivred(order)}) : ''
            },

        }
    }
</script>