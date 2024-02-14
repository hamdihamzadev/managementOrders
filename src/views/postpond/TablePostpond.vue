<template>
    <div class="mt-4" id="tablePostPond">
        <TableGlobal :orders="PostpondOredrs" :options="options" :titletable="titletable" thTimepost="true"
            @send-order="SendOrder" @remove-order="removeorder" sentenceorders="No order postpond today" />
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
                options: ['Delivered', 'Return'],
                titletable: 'Today',
            }
        },
        computed: {
            // GET MODULE STATE POSTPOND
            ...mapState('PostpondOrders', {
                PostpondOredrs: 'PostpondOredrs'
            }),
            // GET MODULE STATE DELIVRED
            ...mapState('DelivredOrders', {
                DelivredOrders: 'DelivredOredrs'
            }),
            // GET MODULE STATE RETURN
            ...mapState('ReturnOrders', {
                ReturnOrders: 'ReturnOrders'
            }),
        },

        methods: {
            // GET ACTION DELETE ORDER FPR POSTPOND
            ...mapActions('PostpondOrders', ['ac_RemoveOrderPostpond']),
            // GET ACTION FOR DELIVRED
            ...mapActions('DelivredOrders', ['ac_addDelivred']),
            // GET ACTION FOR RETURN
            ...mapActions('ReturnOrders', ['ac_addReturn']),

            // SEND ORDER IN YOUR PLACE
            SendOrder(index) {
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
                if (valueselected === 'Delivered') {

                    this.ac_addDelivred(objectOrder); // ===> PUSH IN STORE ORDER DELIVRED 
                    localStorage.setItem('Delivered', JSON.stringify(this.DelivredOrders)) // ===> PUSH IN STOCK DELIVRED
                    
                    //REMOVE ORDER in table postpond and localstorage
                    this.removeorder()
                }

                // PUSH IN STORE ORDER CANCELED AND IN STOCK Return
                if (valueselected === 'Return') {

                    this.ac_addReturn(objectOrder);
                    localStorage.setItem('Return', JSON.stringify(this.ReturnOrders))

                    //REMOVE ORDER in table postpond and localstorage
                    this.removeorder()
            
                }

                // ===> init value select 
                let valueselectedAfter = Array.from(document.querySelector(`#order${index}`).children)[9].firstChild
                valueselectedAfter.value = ''
                valueselectedAfter.style.cssText = 'background: #ffffff;  border-color: #2e3033;'
            },

            //REMOVE ORDER
            removeorder(index) {
                this.ac_RemoveOrderPostpond(index) 
                localStorage.setItem('Postponed', JSON.stringify(this.PostpondOredrs)) 
            }
        }
    }
</script>



<style>
    #tablePostPond {
        border-radius: 12px;
    }
</style>