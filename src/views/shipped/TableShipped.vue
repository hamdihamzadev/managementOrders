<template>
    <div class="table-shipped mt-4">
        <TableGlobal :options="options" :orders="ShippedOrders" @send-order="SendOrder" @remove-order="removeorder"
            sentenceorders="No order shipped today" v-model="popupVal" @save-status="saveStatus" />
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
                options: [{
                        value: 'Delivered',
                        text: 'Delivered'
                    },
                    {
                        value: 'Postponed',
                        text: 'Postponed'
                    },
                    {
                        value: 'Return',
                        text: 'Return'
                    },
                    {
                        value: 'Not treat',
                        text: 'Not treat'
                    },
                ],
                popupVal: ''
            }
        },

        computed: {

            // GET MODULE STATE SHIPPED
            ...mapState('ShippedOrders', {
                StoreShippedOrders: state => state
            }),

            ShippedOrders() {
                let allOrdersShipped = []
                Object.values(this.StoreShippedOrders).forEach(tableCtg => {
                    tableCtg.length > 0 ? tableCtg.forEach(order => {
                        allOrdersShipped.push(order)
                    }) : ''
                })

                return allOrdersShipped.sort((orderA, orderB) => {
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
            // GET ALL ORDERS SHIPPED IN LOCALSTORAGE
            this.getOrderShipped()

        },


        methods: {

            ...mapActions('ShippedOrders', ['ac_RemoveOrderShipped']),
            ...mapActions('ShippedOrders', ['ac_addOrderShipped']),
            ...mapActions('DelivredOrders', ['ac_addOrdersdelivered']),
            ...mapActions('PostpondOrders', ['ac_addOrderPostpond']),
            ...mapActions('ReturnOrders', ['ac_addOrderReturn']),
            ...mapActions('ProductsModule', ['ac_addproduct']),
            // GET FUNCTION ACTIONS IN VUEX ALL ORDERS
            ...mapActions('allOrder', ['ac_addInAllOrder']),

            // SAVE ALL VALUES STATUS IN LOCAL STORAGE
            saveStatus() {
                let allValues = Array.from(document.querySelectorAll('select')).map(select => select.value)
                window.localStorage.setItem('statusShipped', JSON.stringify(allValues))
            },

            // CREATE FUNCTION FOR SEND ORDER IN PAGE SPECIFICE
            SendOrder(data) {

                // GET ALL VALUES BEFORE SEND
                this.allValues

                let orderSelected = {}
                for (const category in this.StoreShippedOrders) {
                    this.StoreShippedOrders[category].forEach(order => {
                        order.ref === data.ref ? (orderSelected.category = category, orderSelected.order =
                            order) : ''
                    })
                }

                let valueselected = document.querySelector(`#select${data.index}`).value

                valueselected === 'Delivered' ? (this.ac_addOrdersdelivered(orderSelected), this.ac_addInAllOrder({
                            status: 'Delivered',
                            order: orderSelected
                        }),
                        this.ac_RemoveOrderShipped({
                            category: orderSelected.category,
                            ref: data.ref
                        }), this.ResetvaluesRemoSend(data.index)) :


                    valueselected === 'Return' ? (this.ac_addOrderReturn(orderSelected), this.ac_addInAllOrder({
                            status: 'return',
                            order: orderSelected
                        }),
                        this.ac_RemoveOrderShipped({
                            category: orderSelected.category,
                            ref: data.ref
                        }), this.ResetvaluesRemoSend(data.index)) :


                    valueselected === 'Postponed' && this.popupVal !== '' ?
                    (orderSelected.order.Timepost = this.popupVal, this.ac_addOrderPostpond(orderSelected),
                        this.ac_addInAllOrder({
                            status: 'postpond',
                            order: orderSelected
                        }),
                        this.ac_RemoveOrderShipped({
                            category: orderSelected.category,
                            ref: data.ref
                        }), this.ResetvaluesRemoSend(data.index)) : ''
            },

            //REMOVE ORDER
            removeorder(data) {
                this.allValues
                for (const category in this.StoreShippedOrders) {
                    this.StoreShippedOrders[category].forEach(order => {
                        order.ref === data.ref ? this.ac_RemoveOrderShipped({
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