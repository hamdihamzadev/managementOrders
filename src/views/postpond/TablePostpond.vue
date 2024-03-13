<template>
    <div class="mt-4" id="tablePostPond">
        <TableGlobal :orders="ordersPostponed" :options="options" thTimepost="true" @send-order="SendOrder"
            @remove-order="removeorder" sentenceorders="No order postpond today" @save-status="saveStatus" />
    </div>
</template>

<script>
    import {
        mapState,
        mapActions
    } from 'vuex'

    import TableGlobal from '@/components/TableGlobal.vue'
    export default {
        name: 'PostPondTable',
        components: {
            TableGlobal
        },
        data() {
            return {
                options: ['Delivered', 'Return', 'Not treat'],
            }
        },
        computed: {
            // GET MODULE STATE POSTPOND
            ...mapState('PostpondOrders', {
                StoreOrdersPostpond: state => state
            }),

            ordersPostponed() {
                let allOrders = []
                Object.values(this.StoreOrdersPostpond).forEach(tablectg => {
                    tablectg.length > 0 ? tablectg.forEach(order => {
                        allOrders.push(order)
                    }) : ''
                })
                return allOrders.sort((orderA, orderB) => {
                    return orderA.ref - orderB.ref
                })
            },

            // GET ALL VALUES IN SELECTS
            allValues() {
                let allValues = Array.from(document.querySelectorAll('select')).map(select => select.value)
                return allValues
            }
        },

        mounted() {
            this.getOrdersPostponed()
        },

        methods: {

            // GET ACTION ADD ORDER FOR POSTPOND
            ...mapActions('PostpondOrders', ['ac_addOrderPostpond']),
            // GET ACTION DELETE ORDER FPR POSTPOND
            ...mapActions('PostpondOrders', ['ac_RemoveOrderPostpond']),
            // GET ACTION FOR DELIVRED
            ...mapActions('DelivredOrders', ['ac_addOrdersdelivered']),
            // GET ACTION FOR RETURN
            ...mapActions('ReturnOrders', ['ac_addOrderReturn']),
            // GET FUNCTION ACTIONS IN VUEX ALL ORDERS
            ...mapActions('allOrder', ['ac_addInAllOrder']),

            // GET ALL ORDERS POSTPOND AND SHOW IN TABLE
            getOrdersPostponed() {
                let orderPostponedlocal = JSON.parse(localStorage.getItem('Postponed'))
                let numbersOrderLocal = Object.values(orderPostponedlocal).reduce((acc, tableCtg) => {
                    return acc + tableCtg.length;
                }, 0);
                let numbersOrderStore = Object.values(this.StoreOrdersPostpond).reduce((acc, tableCtg) => {
                    return acc + tableCtg.length;
                }, 0);

                if (orderPostponedlocal && numbersOrderLocal > numbersOrderStore) {
                    for (const category in orderPostponedlocal) {
                        orderPostponedlocal[category].forEach(orderPostponed => {
                            this.ac_addOrderPostpond({
                                category: category,
                                order: orderPostponed
                            })
                        })
                    }
                }
            },

            // SEND ORDER IN YOUR PLACE
            saveStatus() {
                let allValues = Array.from(document.querySelectorAll('select')).map(select => select.value)
                window.localStorage.setItem('statusPostponed', JSON.stringify(allValues))
            },

            // SEND ORDER IN YOUR PLACE
            SendOrder(data) {

                this.allValues
                let orderSelected = {}
                for (const category in this.StoreOrdersPostpond) {
                    this.StoreOrdersPostpond[category].forEach(order => {
                        order.ref === data.ref ? (delete order.Timepost, orderSelected.category = category,
                            orderSelected.order = order) : ''
                    })
                }
                // GET VALUE SELECTED
                let valueselected = document.querySelector(`#select${data.index}`).value

                // -------------- CHECK VALUE --------------
                valueselected === 'Delivered' ? (this.ac_addOrdersdelivered(orderSelected), 
                        this.ac_addInAllOrder({
                            status: 'Delivered',
                            order: orderSelected
                        }),
                        this.ac_RemoveOrderPostpond({
                            category: orderSelected.category,
                            ref: data.ref
                        }), this.ResetvaluesRemoSend(data.index)) :

                    valueselected === 'Return' ? (this.ac_addOrderReturn(orderSelected), 
                        this.ac_addInAllOrder({
                            status: 'return',
                            order: orderSelected
                        }),
                        this.ac_RemoveOrderPostpond({
                        category: orderSelected.category,
                        ref: data.ref
                    }), this.ResetvaluesRemoSend(data.index)) : ''


            },

            //REMOVE ORDER
            removeorder(data) {
                this.allValues
                for (const category in this.StoreOrdersPostpond) {
                    this.StoreOrdersPostpond[category].forEach(order => {
                        order.ref === data.ref ? this.ac_RemoveOrderPostpond({
                            category: category,
                            ref: data.ref
                        }) : ''
                    })
                }

                // Reset values
                this.ResetvaluesRemoSend(data.index)
            },

            // RESET VALUE AFTER REMOVE OR SEND
            ResetvaluesRemoSend(index) {
                // get value for any select after remove or send order
                this.allValues.splice(index, 1)
                let statuAfter = document.querySelectorAll('select')
                this.allValues.forEach((value, i) => {
                    statuAfter[i].value = value
                })
                window.localStorage.setItem('statusPostponed', JSON.stringify(this.allValues))
            }
        }
    }
</script>



<style>
    #tablePostPond {
        border-radius: 12px;
    }
</style>