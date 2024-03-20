<template>
    <div class="analytnewOrder">
        <CardGlobal :carts="cards" />
    </div>
</template>

<script>
    import CardGlobal from '@/components/CardGlobal.vue'
    import {
        mapState,
        mapActions
    } from 'vuex'
    export default {
        name: 'CartsAllorders',
        components: {
            CardGlobal
        },

        computed: {
            cards() {
                let allcards = [{
                        classicon: 'allorders',
                        icon: 'bx bx-shopping-bag',
                        title: 'All Orders',
                        number: this.numbersOrders,
                        pourcentage: 2.43
                    },
                    {
                        classicon: 'income',
                        icon: 'bx bx-money',
                        title: 'Income',
                        number: 23328,
                        dollar: '$',
                        pourcentage: 2.43
                    },
                    {
                        classicon: 'views',
                        icon: 'bx bx-show',
                        title: 'All Views',
                        number: 6085,
                        pourcentage: 2.43
                    },
                    {
                        classicon: 'sales',
                        icon: 'bx bx-wallet',
                        title: 'Sales',
                        dollar: '$',
                        number: 15854,
                        pourcentage: 2.43
                    },

                ]
                return allcards
            },

            ...mapState('allOrder', {
                storeAllOrder: state => state
            }),

            numbersOrders(){
                let orders=Object.values(this.storeAllOrder).reduce((accu,table)=>{
                    return accu+table.length
                },0)
                return orders
            }
        },

        mounted() {
            this.getAllOrders()
            console.log(Object.values(this.storeAllOrder))
        },

        methods: {
            // GET FUNCTION ACTIONS IN VUEX ALL ORDERS
            ...mapActions('allOrder', ['ac_addInAllOrder']),

            getAllOrders() {
                let OrdersLocal = JSON.parse(localStorage.getItem('allOrder'))

                let numbersOrderLocal = Object.values(OrdersLocal).reduce((acc, tableCtg) => {
                    return acc + tableCtg.length;
                }, 0);

                let numbersOrderStore = Object.values(this.storeAllOrder).reduce((acc, tableCtg) => {
                    return acc + tableCtg.length;
                }, 0);

                if (OrdersLocal && numbersOrderLocal > numbersOrderStore) {
                    for (const statusOrder in OrdersLocal) {
                        OrdersLocal[statusOrder].forEach(order => {
                            this.ac_addInAllOrder({
                                status: statusOrder,
                                order: order
                            })
                        })
                    }
                }

            },
        }


    }
</script>