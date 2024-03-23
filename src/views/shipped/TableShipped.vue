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
            // GET FUNCTION ACTIONS IN VUEX VALUES STATUS
            ...mapActions('valuesStatus', ['ac_addNewValue', 'ac_removeValue']),

            // SAVE ALL VALUES STATUS IN LOCAL STORAGE
            saveStatus() {
                let allValues = Array.from(document.querySelectorAll('select')).map(select => select.value)
                this.ac_addNewValue({
                    status: 'shipped',
                    values: allValues
                })
            },

            // CREATE FUNCTION FOR SEND ORDER IN PAGE SPECIFICE
            SendOrder(data) {

                let orderSelected = {
                    category: null,
                    order: data.order
                }

                for (const categoryKey in this.StoreShippedOrders) {
                    this.StoreShippedOrders[categoryKey].forEach(order => {
                        order.date === data.order.date ? orderSelected.category = categoryKey : null
                    })
                }

                if(data.value=== 'Delivered' ){

                    this.ac_addOrdersdelivered(orderSelected)
                    this.ac_addInAllOrder({status:'Delivered',order: data.order})
                    this.ac_RemoveOrderShipped({category: orderSelected.category , date: data.order.date})
                    this.ac_removeValue({status: 'shipped', index: data.index })

                }
                else if(data.value === 'Return'){

                    this.ac_addOrderReturn(orderSelected)
                    this.ac_addInAllOrder({status: 'return',order: data.order})
                    this.ac_RemoveOrderShipped({category: orderSelected.category , date: data.order.date})
                    this.ac_removeValue({status: 'shipped', index: data.index })

                }
                else if(data.value === 'Postponed' && this.popupVal !== ''){

                    orderSelected.order.Timepost = this.popupVal
                    this.ac_addOrderPostpond(orderSelected)
                    this.ac_addInAllOrder({status: 'postpond',order: data.order})
                    this.ac_RemoveOrderShipped({category: orderSelected.category , date: data.order.date})
                    this.ac_removeValue({status: 'shipped', index: data.index })

                }
                 

            },

            //REMOVE ORDER
            removeorder(data) {

                for (const categoryKey in this.StoreShippedOrders) {
                 this.StoreShippedOrders[categoryKey].forEach(order => {
                    // CHECK VERIFICATION ORDER WITH DATE
                    order.date === data.date ? this.ac_RemoveOrderShipped({category: categoryKey,date: data.date }) : ''
                 })
                }

                this.ac_removeValue({
                  status: 'shipped',
                  index: data.index
                })
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