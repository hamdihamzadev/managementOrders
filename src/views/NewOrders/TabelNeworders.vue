<template>

    <div class="tabelNeworders mt-4">
        <TableGlobal :orders="TodayOrders" :options="options" :titletable="titletable" @send-order="SendOrder" />
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
                options: ['Confirmed', 'Canceled'],
            }
        },
        computed: {

            // STORE NEW ORDERS
            ...mapState('NewOrders', {
                TodayOrders: 'NewOrders'
            }),
            // STORE ORDER CONFIRMED
            ...mapState('OrderConfirmed', {
                OrderConfirmed: 'dataConfrimed'
            }),
            // STORE ORDER CANCELD
            ...mapState('OrderCanceld', {
                OrdersCanceld: 'ordercanceld'
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
                if(valueselected === 'Confirmed'){
                    // PUSH IN STORE ORDER CONFIRMED AND IN STOCK CONFIRMED
                    this.ac_orderConfirmed(objectOrder);
                    localStorage.setItem('Confirmed',JSON.stringify(this.OrderConfirmed))
                }
                if(valueselected === 'Canceled'){
                    // PUSH IN STORE ORDER CANCELED AND IN STOCK CANCELED
                    this.ac_addCanceld(objectOrder) ;
                    localStorage.setItem('Canceled',JSON.stringify(this.OrdersCanceld))
                }
            },
        },

    }


    // REMOVE ORDER:
    //        =====> remove order in store vuex ==> update localstorage
    //        =====> work in array ==> delete in array ===> indice for remove in array
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