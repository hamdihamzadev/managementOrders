<template>
    <div class="carts-shipped">
        <CardGlobal :carts="allCards" />
    </div>
</template>

<script>
    import CardGlobal from '@/components/CardGlobal.vue'
    import { mapState } from 'vuex'
    export default {
        name: 'CardsShipped',
        components: {
            CardGlobal
        },
   
        computed:{
            ...mapState('ShippedOrders', {
                StoreShippedOrders: state => state
            }),
            ...mapState('OrderConfirmed', {
                storeConfirmed: state => state
            }),

            allCards(){
                let  Cards= [
                    {
                        classicon: 'Shipped',
                        icon: 'bx bx-trip',
                        title: 'Order Shipped',
                        number: `${this.NumbersOrdersShipped}/${this.NumbersOrdersConfirmed}`,
                  
                    },

                    {
                        classicon: 'delivery-rate',
                        icon: 'bx bx-money',
                        title: 'Delivery Rate',
                        number: '3.23 %',
                   
                    },

                ]

                return Cards
            },

            NumbersOrdersConfirmed() {
                let numbOrders = Object.values(this.storeConfirmed).reduce((accu, table) => {
                    return accu + table.length
                }, 0)
                return numbOrders
            },

            NumbersOrdersShipped(){
                let numbOrders = Object.values(this.StoreShippedOrders).reduce((accu, table) => {
                    return accu + table.length
                }, 0)
                return numbOrders
            }

        }


        /**
         * on send ==> remove order ==> save order with and date ==> 
         */
    }
</script>