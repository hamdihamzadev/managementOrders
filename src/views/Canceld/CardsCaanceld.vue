<template>
    <div class="carts-confirmed">
        <CardGlobal :carts="cards" />
    </div>
</template>

<script>

    import CardGlobal from '@/components/CardGlobal.vue'
import { mapState } from 'vuex'
    export default {
        name: 'CartsCanceld',
        components: {
            CardGlobal,
        },
  
        computed: {
            cards() {
                let allCards = [

                    {
                        classicon: 'Order-Confirmed',
                        icon: 'bx bx-package',
                        title: 'Order Canceld',
                        number: `${this.Orderscancelled} / ${this.newOrder}`,
                        pourcentage: 1.20,
                        duration: 'Today'

                    },
                    {

                        classicon: 'confirmation-rate',
                        icon: 'bx bx-chart',
                        title: 'cancelled Rate',
                        number: `${this.cancelledRate} %`,
                        pourcentage: 1.20,
                        duration: 'Today'
                    }
                ]
                return allCards
            },

            ...mapState('allOrder', {
                AllNewOrders: state => state.new
            }),

            ...mapState('allOrder', {
                AllOrderscancelled: state => state.cancelled
            }),

            newOrder(){
                let numbersOrders=this.AllNewOrders.length
                return numbersOrders
            },

            Orderscancelled(){
                let numbersOrders=this.AllOrderscancelled.length
                return numbersOrders
            },

            cancelledRate(){
                let percentage= Math.floor((this.Orderscancelled/this.newOrder)*100)
                return percentage
            }

        }

    }
</script>