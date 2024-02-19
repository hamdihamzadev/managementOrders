<template>

    <div class="tabelNeworders mt-4">
        <TableGlobal :orders="TodayOrders" :options="options" :titletable="titletable" @send-order="SendOrder"
            sentenceorders="No Orders Today" />
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
                titletable: 'Orders Today',
                options: ['Confirmed', 'Canceled', 'Not treat'],
            }
        },
        computed: {

            // STORE NEW ORDERS
            ...mapState('NewOrders', {
                TodayOrders: 'NewOrders'
            }),

        },

        methods: {
            // GET FUNCTION ACTIONS IN VUEX CONFIRMED
            ...mapActions('OrderConfirmed', ['ac_orderConfirmed']),
            // GET FUNCTION ACTIONS IN VUEX CANCELD
            ...mapActions('OrderCanceld', ['ac_addCanceld']),

            // PUSH ORDER CONFIRMED IN ACTION
            SendOrder(index) {

                let order = Array.from(document.querySelector(`#order${index}`).children).slice(0, 9).map(td => td
                    .textContent)
                let objectOrder = {
                    Customer: order[0],
                    Phone: order[1],
                    city: order[2],
                    Adress: order[3],
                    Product: order[4],
                    Price: order[5],
                    Delivery: order[6],
                    Quantity: order[7],
                    Total: order[8]
                }

                // GET VALUE SELECTED
                let valueselected = Array.from(document.querySelector(`#order${index}`).children)[9].firstChild.value

                // CHECK VALUE 
                valueselected === 'Confirmed' ? this.ac_orderConfirmed(objectOrder) : 
                valueselected === 'Canceled'  ?  this.ac_addCanceld(objectOrder) : ''

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