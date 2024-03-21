<template>

    <div class="tabelNeworders mt-4">
        <TableGlobal :orders="neworders" :options="options" @send-order="SendOrder" sentenceorders="No Orders Today"
            @save-status="saveStatus" />
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



            neworders() {
                let allNewOrders = []
                Object.values(this.storeNeworders).forEach(tableCtg => {
                    tableCtg.forEach(order => {
                        allNewOrders.push(order)
                    })
                })
                allNewOrders.sort((orderA, orderB) => {
                    return orderA - orderB
                })
                return allNewOrders
            },

            // GET ALL VALUES IN SELECTS
            allValues() {
                let allValues = Array.from(document.querySelectorAll('select')).map(select => select.value)
                return allValues
            }

        },

        methods: {
            // GET FUNCTION ACTIONS IN VUEX CONFIRMED
            ...mapActions('OrderConfirmed', ['ac_orderConfirmed']),
            // GET FUNCTION ACTIONS IN VUEX CANCELD
            ...mapActions('OrderCancelled', ['ac_addOrderCancelled']),
            // GET FUNCTION ACTIONS IN VUEX ALL ORDERS
            ...mapActions('allOrder', ['ac_addInAllOrder']),

            // PUSH ORDER CONFIRMED IN ACTION
            SendOrder(data) {

                this.allValues
                let orderSelected = {}
                for (const category in this.storeNeworders) {
                    this.storeNeworders[category].forEach(order => {
                        // CHECK  VERIFICATION ORDER WITH REF
                        order.ref === data.ref ? (orderSelected.category = category, orderSelected.order =
                            order) : ''
                    })
                }

                // GET VALUE SELECTED
                let valueselected = document.querySelector(`#select${data.index}`).value
                // CHECK VALUE AND PUSH ORDER
                valueselected === 'Confirmed' ? (this.ac_orderConfirmed(orderSelected),
                        this.ac_addInAllOrder({
                            status: 'confirmed',
                            order: orderSelected
                        })) :
                    valueselected === 'Canceled' ? (this.ac_addOrderCancelled(orderSelected),
                        this.ac_addInAllOrder({
                            status: 'cancelled',
                            order: orderSelected
                        })) : ''

                console.log(this.storeallOrder)

            },

            saveStatus() {
                let allValues = Array.from(document.querySelectorAll('select')).map(select => select.value)
                window.localStorage.setItem('statusNeworders', JSON.stringify(allValues))
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