<template>
    <div class="mt-4" id="tablePostPond">
        <TableGlobal :orders="PostpondOredrs" :options="options" :titletable="titletable" thTimepost="true"
            @send-order="SendOrder" @remove-order="removeorder" sentenceorders="No order postpond today"
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
        name: 'PostPondTable',
        components: {
            TableGlobal
        },
        data() {
            return {
                options: ['Delivered', 'Return', 'Not treat'],
                titletable: 'Today',
            }
        },
        computed: {
            // GET MODULE STATE POSTPOND
            ...mapState('PostpondOrders', {
                PostpondOredrs: 'PostpondOredrs'
            }),

            // GET ALL VALUES IN SELECTS
            allValues() {
                let allValues = Array.from(document.querySelectorAll('select')).map(select => select.value)
                return allValues
            }
        },

        mounted() {
            this.getOrdersConfirmed()
        },

        methods: {

            // GET ACTION ADD ORDER FOR POSTPOND
            ...mapActions('PostpondOrders', ['ac_addPostpond']),
            // GET ACTION DELETE ORDER FPR POSTPOND
            ...mapActions('PostpondOrders', ['ac_RemoveOrderPostpond']),
            // GET ACTION FOR DELIVRED
            ...mapActions('DelivredOrders', ['ac_addDelivred']),
            // GET ACTION FOR RETURN
            ...mapActions('ReturnOrders', ['ac_addReturn']),

            // GET ALL ORDERS POSTPOND AND SHOW IN TABLE
            getOrdersConfirmed() {
                let orderPostponedlocal = JSON.parse(localStorage.getItem('Postponed'))
                orderPostponedlocal && orderPostponedlocal.length > this.OrderConfirmed.length ?
                    orderPostponedlocal.forEach(order => {
                        this.ac_addPostpond(order)
                    }) : ''
            },

            // SEND ORDER IN YOUR PLACE
            saveStatus() {
                let allValues = Array.from(document.querySelectorAll('select')).map(select => select.value)
                window.localStorage.setItem('statusPostponed', JSON.stringify(allValues))
            },

            // SEND ORDER IN YOUR PLACE
            SendOrder(index) {

                this.allValues
                // GET TD IN DOM FOR ORDER
                let order = Array.from(document.querySelector(`#order${index}`).children).slice(0, 9).map(td => td
                    .textContent)
                // PUSH ORDER IN OBJECT
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
                let valueselected = Array.from(document.querySelector(`#order${index}`).children)[10].firstChild.value

                // -------------- CHECK VALUE --------------
                valueselected === 'Delivered' ? this.ac_addDelivred(objectOrder) :
                    valueselected === 'Return' ? this.ac_addReturn(objectOrder) : ''


                // Reset values
                this.ResetvaluesRemoSend(index)

            },

            //REMOVE ORDER
            removeorder(index) {
                this.allValues
                this.ac_RemoveOrderPostpond(index)

                // Reset values
                this.ResetvaluesRemoSend(index)
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