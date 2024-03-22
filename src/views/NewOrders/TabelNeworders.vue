<template>

    <div class="tabelNeworders mt-4">
        <TableGlobal :orders="neworders" :options="options" @send-order="SendOrder" sentenceorders="No Orders Today"
            @save-status="saveStatus" @remove-order="removeorder" />
    </div>

</template>

<script>
    import {
        mapState,
        mapActions
    } from 'vuex'
    import TableGlobal from '@/components/TableGlobal.vue'


    export default {
        name: 'TableNeworders',
        components: {
            TableGlobal
        },
        data() {
            return {

                options: [{
                        value: 'Confirmed',
                        text: 'Confirmed'
                    },
                    {
                        value: 'Canceled',
                        text: 'Canceled'
                    },
                    {
                        value: 'Not treat',
                        text: 'Not treat'
                    },
                ],


            }
        },
        computed: {

            // STORE NEW ORDERS
            ...mapState('NewOrders', {
                storeNeworders: state => state
            }),
            ...mapState('valuesStatus', {
                storevaluesStatus: state => state.new
            }),

            neworders() {
                let allNewOrders = []
                Object.values(this.storeNeworders).forEach(tableCtg => {
                    tableCtg.forEach(order => {
                        allNewOrders.push(order)
                    })
                })
                return allNewOrders
            },

        },

        methods: {
            // GET FUNCTION ACTIONS IN VUEX CONFIRMED
            ...mapActions('OrderConfirmed', ['ac_orderConfirmed']),
            // GET FUNCTION ACTIONS IN VUEX CANCELD
            ...mapActions('OrderCancelled', ['ac_addOrderCancelled']),
            // GET FUNCTION ACTIONS IN VUEX ALL ORDERS
            ...mapActions('allOrder', ['ac_addInAllOrder']),
            // GET FUNCTION ACTIONS IN VUEX NEW ORDERS
            ...mapActions('NewOrders', ['ac_RemoveNewOrder']),
            // GET FUNCTION ACTIONS IN VUEX VALUES STATUS
            ...mapActions('valuesStatus', ['ac_addNewValue', 'ac_removeValue']),


            SendOrder(data) {

                let orderSelected = {
                    category: null,
                    order: data.order
                }

                for (const categoryKey in this.storeNeworders) {
                    this.storeNeworders[categoryKey].forEach(order => {
                        order.date === data.order.date ? orderSelected.category = categoryKey : null
                    })
                }

                // CHECK VALUE AND PUSH ORDER
                data.value === 'Confirmed' ? (this.ac_orderConfirmed(orderSelected),
                        this.ac_addInAllOrder({
                            status: 'confirmed',
                            order: data.order
                        }), this.ac_RemoveNewOrder({
                            category: orderSelected.category,
                            date: data.order.date
                        }),
                        this.ac_removeValue({
                            status: 'new',
                            index: data.index
                        })) :

                    data.value === 'Canceled' ? (
                        this.ac_addOrderCancelled(orderSelected),
                        this.ac_addInAllOrder({
                            status: 'cancelled',
                            order: data.order
                        }),
                        this.ac_RemoveNewOrder({
                            category: orderSelected.category,
                            date: data.order.date
                        }),
                        console.log('is work'),
                        this.ac_removeValue({
                            status: 'new',
                            index: data.index
                        })) : ''
            },

            removeorder(data) {

                // this.allValues
                for (const categoryKey in this.storeNeworders) {
                    this.storeNeworders[categoryKey].forEach(order => {
                        // CHECK  VERIFICATION ORDER WITH DATE
                        order.date === data.date ? this.ac_RemoveNewOrder({
                            category: categoryKey,
                            date: data.date
                        }) : ''
                    })
                }

                this.ac_removeValue({
                    status: 'new',
                    index: data.index
                })

            },

            saveStatus() {
                let allValues = Array.from(document.querySelectorAll('select')).map(select => select.value)
                this.ac_addNewValue({
                    status: 'new',
                    values: allValues
                })
            },

        },

    }
</script>

<style>
    .tabelNeworders {
        border-radius: 12px;
    }

    #nouveau-fond {
        background-color: rgb(52, 28, 28);
    }

    #BackConfirmed {
        background-color: aqua;
    }

    #BackCanceled {
        background-color: black;
    }
</style>