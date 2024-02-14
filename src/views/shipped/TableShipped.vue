<template>
    <div class="table-shipped mt-4">
        <TableGlobal :titletable="titletable" :options="options" :orders="ShippedOrders" @send-order="SendOrder"
            @remove-order="removeorder" sentenceorders="No order shipped today" v-model="popupVal" />
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
                options: ['Delivered', 'Postponed', 'Return'],
                popupVal:''
            }
        },

        computed: {

            // GET MODULE STATE SHIPPED
            ...mapState('ShippedOrders', {
                ShippedOrders: 'ShippedOrders'
            }),

            // GET MODULE STATE DELIVRED
            ...mapState('DelivredOrders', {
                DelivredOrders: 'DelivredOredrs'
            }),
            // GET MODULE STATE POSTPOND
            ...mapState('PostpondOrders', {
                PostpondOredrs: 'PostpondOredrs'
            }),
            // GET MODULE STATE RETURN
            ...mapState('ReturnOrders', {
                ReturnOrders: 'ReturnOrders'
            }),


        },

        methods: {

            // GET MODULE ACTIONS FOR SHIPPED
            ...mapActions('ShippedOrders', ['ac_RemoveOrderShipped']),
            // GET MODULE ACTIONS FOR DELIVRED
            ...mapActions('DelivredOrders', ['ac_addDelivred']),
            // GET MODULE ACTIONS FOR POSTPOND
            ...mapActions('PostpondOrders', ['ac_addPostpond']),
            // GET MODULE ACTIONS FOR RETURN
            ...mapActions('ReturnOrders', ['ac_addReturn']),


            // CREATE FUNCTION FOR SEND ORDER IN PAGE SPECIFICE
            SendOrder(index) {

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
                let valueselected = Array.from(document.querySelector(`#order${index}`).children)[9].firstChild.value

                // -------------- CHECK VALUE --------------

                if (valueselected === 'Delivered') {

                    this.ac_addDelivred(objectOrder); // ===> PUSH IN STORE ORDER DELIVRED 
                    localStorage.setItem('Delivered', JSON.stringify(this
                        .DelivredOrders)) // ===> PUSH IN STOCK DELIVRED

                    //REMOVE ORDER in table shipped
                    this.removeorder()

                }

                if (valueselected === 'Postponed') {

                    // CREATE OBJECT SPECIFIFCE FOR POSTPONED
                    objectOrder['Timepost']=this.popupVal

                    if(this.valpopup !== '' ){
                        this.ac_addPostpond(objectOrder)
                        localStorage.setItem('Postponed', JSON.stringify(this.PostpondOredrs)) 

                        //REMOVE ORDER in table shipped
                        this.removeorder()
                    }
                    
                }

                if (valueselected === 'Return') {

                    this.ac_addReturn(objectOrder);
                    localStorage.setItem('Return', JSON.stringify(this.ReturnOrders))

                    //REMOVE ORDER in table shipped
                    this.removeorder()
                }

                // ===> init value select 
                let valueselectedAfter = Array.from(document.querySelector(`#order${index}`).children)[9].firstChild
                valueselectedAfter.value = ''
                valueselectedAfter.style.cssText = 'background: #ffffff;  border-color: #2e3033;'


            },

            //REMOVE ORDER
            removeorder(index) {
                this.ac_RemoveOrderShipped(index) // ===> REMOVE ORDER IN STORE VUEX SHIPPED ACTIONS
                localStorage.setItem('Shipped', JSON.stringify(this.ShippedOrders)) // UPDATE STOCK SHIPPED
            }
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