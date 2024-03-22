<template>
    <div class="carts-confirmed">
        <CardGlobal :carts="cards" />
    </div>
</template>

<script>
    import CardGlobal from '@/components/CardGlobal.vue'
    import { mapState } from 'vuex'
    export default {
        name: 'CardsConfirmed',
        components: {
            CardGlobal,
        },

        computed: {
            cards() {
                let allCrads = [

                    {
                        classicon: 'Order-Confirmed',
                        icon: 'bx bx-package',
                        title: 'Order Confirmed',
                        number: `${this.NumbersOrdersConirmed} / ${this.NumbersNewOrders}`,
                        pourcentage: 3.20,
                        duration: 'Today'

                    },
                    {

                        classicon: 'confirmation-rate',
                        icon: 'bx bx-chart',
                        title: 'Confirmation Rate',
                        number: '57%',
                        pourcentage: 3.20,
                        duration: 'Today'
                    }
                ]
                return allCrads
            },

            ...mapState('allOrder', {
                AllOrdersConirmed:state=>state.confirmed
            }),

            ...mapState('allOrder', {
                AllNewOrders:state=>state.new
            }),

            NumbersNewOrders(){
                let numbOrders=this.AllNewOrders.length
                return numbOrders
            },

            NumbersOrdersConirmed(){
                let numbOrders=this.AllOrdersConirmed.length
                return numbOrders
            },

            confirmationRate(){
                let Allsales=this.AllOrdersConirmed.reduce((accu,order)=>{
                    return accu+order.total
                },0)
                return Allsales
            }


        },

        mounted(){
            console.log(this.storeAllOrders.confirmed)
        }

    }
</script>