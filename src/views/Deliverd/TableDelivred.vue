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
                for (const category in this.StoreOrdersDelivred) {
                    this.StoreOrdersDelivred[category].forEach(order => {
                        order.ref === data.ref ? this.ac_RemoveOrderDelivred({category:category,ref:data.ref}) : ''
                    })
                }
            },

            getOrderDelivred() {
                let orderDelivredlocal = JSON.parse(localStorage.getItem('Ordersdelivered'))
                let numbersOrderLocal = Object.values(orderDelivredlocal).reduce((acc, tableCtg) => {
                    return acc + tableCtg.length;
                }, 0);
                let numbersOrderStore = Object.values(this.StoreOrdersDelivred).reduce((acc, tableCtg) => {
                    return acc + tableCtg.length;
                }, 0);
  

                if (orderDelivredlocal && numbersOrderLocal > numbersOrderStore) {
                    for (const category in orderDelivredlocal) {
                        orderDelivredlocal[category].forEach(orderConf => {
                            this.ac_addOrdersdelivered({
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