<template>
    <div class="table-shipped mt-4">
        <TableGlobal :titletable="titletable" :options="options" :orders="ShippedOrders" @send-order="SendOrder"
            @remove-order="removeorder" sentenceorders="No order shipped today" v-model="popupVal"
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
        name: 'TableShipped',
        components: {
            TableGlobal,

        },

        data() {
            return {

                titletable: 'Orders Shipping',
                options: ['Delivered', 'Postponed', 'Return', 'Not treat'],
                popupVal: ''
            }
        },

        computed: {

            // GET MODULE STATE SHIPPED
            ...mapState('ShippedOrders', {
                ShippedOrders: 'ShippedOrders'
            }),

            // GET ALL VALUES IN SELECTS
            allValues() {
                let allValues = Array.from(document.querySelectorAll('select')).map(select => select.value)
                return allValues
            }

        },

        mounted() {
            // GET ALL ORDERS SHIPPED IN LOCALSTORAGE
            this.getOrderShipped()

        },


        methods: {

            // GET MODULE ACTIONS FOR SHIPPED
            ...mapActions('ShippedOrders', ['ac_RemoveOrderShipped']),
            // GET MODULE ACTIONS FOR ADD ORDER SHIPPED
            ...mapActions('ShippedOrders', ['ac_addShipped']),
            // GET MODULE ACTIONS FOR DELIVRED
            ...mapActions('DelivredOrders', ['ac_addDelivred']),
            // GET MODULE ACTIONS FOR POSTPOND
            ...mapActions('PostpondOrders', ['ac_addPostpond']),
            // GET MODULE ACTIONS FOR RETURN
            ...mapActions('ReturnOrders', ['ac_addReturn']),

            // GET ORDERS SHIPPED IN LOCAL
            getOrderShipped() {

                let OrdersShippedLocal = JSON.parse(localStorage.getItem('Shipped'))

                OrdersShippedLocal && OrdersShippedLocal.length > this.ShippedOrders.length ?
                    OrdersShippedLocal.forEach(order => {
                        this.ac_addShipped(order)
                    }) : ''
            },

            // SAVE ALL VALUES STATUS IN LOCAL STORAGE
            saveStatus() {
                let allValues = Array.from(document.querySelectorAll('select')).map(select => select.value)
                window.localStorage.setItem('statusShipped', JSON.stringify(allValues))
            },

            // CREATE FUNCTION FOR SEND ORDER IN PAGE SPECIFICE
            SendOrder(index) {

                // GET ALL VALUES BEFORE SEND
                this.allValues
                // GET ORDER CLICKED
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
                    Total: order[8],
                }

                // GET VALUE SELECTED
                let valueselected = document.querySelector(`#select${index}`) // 1

                // -------------- CHECK VALUE --------------

                valueselected.value === 'Delivered' ? (this.ac_addDelivred(objectOrder), this.ac_RemoveOrderShipped(
                        index)) :
                    valueselected.value === 'Return' ? (this.ac_addReturn(objectOrder), this.ac_RemoveOrderShipped(
                        index)) :
                    valueselected.value === 'Postponed' && this.valpopup !== '' ?
                    (objectOrder['Timepost'] = this.popupVal, this.ac_RemoveOrderShipped(index)) : ''

                // Reset values
                this.ResetvaluesRemoSend(index)

            },

            //REMOVE ORDER
            removeorder(index) {
                this.allValues
                this.ac_RemoveOrderShipped(index)

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
                window.localStorage.setItem('statusShipped', JSON.stringify(this.allValues))
            },
        },

    }
</script>




<style scoped lang="scss">
    .popup {
        width: 22%;
        border-radius: 11px;
        height: 149px;
        left: 38%;
        background-color: #000000;
        position: fixed;
        top: 32%;
        text-align: justify;
        padding: 30px;
        transition: 0.3s;

        .title {
            font-size: 21px;
            margin-bottom: 14px;
        }

        .input input {
            border: 1px solid #3F4053;
            background-color: transparent;
            position: relative;
            height: 47px;
            width: 88%;
            padding-left: 21px;
            color: white;
            transition: border-color 0.3s;
            border-radius: 5px
        }

        .allbtn {
            display: flex;

            .btn-send {
                width: 27%;
                height: 21%;
                border: none;
                border-radius: 5px;
                margin-top: 22px;
                position: absolute;
                right: 47px;
                font-weight: 800;
                cursor: pointer;
            }

            .btn-close {
                width: 21%;
                height: 21%;
                border: none;
                border-radius: 5px;
                margin-top: 22px;
                position: absolute;
                right: 167px;
                background-color: #b70505;
                color: white;
                font-weight: 800;
                cursor: pointer;
            }
        }
    }
</style>