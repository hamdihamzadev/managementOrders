<template>
    <div>
        <TableGlobal  :orders="DelivredOrders" @remove-order="removeorder"
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

        computed: {
            // GET MODULE STATE DELIVRED
            ...mapState('DelivredOrders', {
                StoreOrdersDelivred: state => state
            }),

            DelivredOrders() {
                let allOrdersDelivred = []
                Object.values(this.StoreOrdersDelivred).forEach(tableCtg => {
                    tableCtg.length > 0 ? tableCtg.forEach(order => {
                        allOrdersDelivred.push(order)
                    }) : ''
                })

                return allOrdersDelivred.sort((orderA, orderB) => {return orderA.ref - orderB.ref})
            },
        },

        mounted() {
            // CALL FUNCTION getOrderShipped
            this.getOrderDelivred()
            
        },

        methods: {
            ...mapActions('DelivredOrders', ['ac_RemoveOrderDelivred']),
            ...mapActions('DelivredOrders', ['ac_addOrdersdelivered']),
            //REMOVE ORDER
            removeorder(data) {
                for (const categoryKey in this.StoreOrdersDelivred) {
                    this.StoreOrdersDelivred[categoryKey].forEach(order => {
                        order.date === data.date ? this.ac_RemoveOrderDelivred({ category: categoryKey,date: data.date }) : ''
                    })
                }
            },

    
        },

    }
</script>