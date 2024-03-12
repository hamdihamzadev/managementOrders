<template>
    <div class="carts-confirmed">
        <CardGlobal :carts="allCards" />
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    import CardGlobal from '@/components/CardGlobal.vue'
    export default {
        name: 'CardsConfirmed',
        components: {
            CardGlobal,
        },

        computed: {
            ...mapState('NewOrders', {
                StoreNewOrders: state => state
            }),
            ...mapState('OrderConfirmed', {
                storeConfirmed: state => state
            }),

            allCards() {
                let carts = [

                    {
                        classicon: 'Order-Confirmed',
                        icon: 'bx bx-package',
                        title: 'Order Confirmed',
                        number: `${this.NumbersOrdersConfirmed}/${this.NumbersNewOrders}`,
                        pourcentage: 3.20,
                        duration: 'Today'

                    },
                    {

                        classicon: 'confirmation-rate',
                        icon: 'bx bx-chart',
                        title: 'Confirmation Rate',
                        number: `${this.ConfirmationRate}%`,
                        pourcentage: 3.20,
                        duration: 'Today'
                    }
                ]

                return carts
            },

            NumbersNewOrders() {
                let numbOrders = Object.values(this.StoreNewOrders).reduce((accu, table) => {
                    return accu + table.length
                }, 0)
                return numbOrders
            },

            NumbersOrdersConfirmed() {
                let numbOrders = Object.values(this.storeConfirmed).reduce((accu, table) => {
                    return accu + table.length
                }, 0)
                return numbOrders
            },

            ConfirmationRate(){
                let pourcentage= Math.floor(this.NumbersOrdersConfirmed/this.NumbersNewOrders * 100)
                return pourcentage
            }

        },

        mounted(){
            console.log(this.NumbersNewOrders)
            console.log(this.NumbersOrdersConfirmed)
        }

    }
</script>