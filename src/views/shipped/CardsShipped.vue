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

            allCards(){
                let  Cards= [
                    {
                        classicon: 'Shipped',
                        icon: 'bx bx-trip',
                        title: 'Order Shipped',
                        number: `${this.NumberOrdersShipped}/${this.NumberOrdersConfirmed}`,
                  
                    },

                    {
                        classicon: 'delivery-rate',
                        icon: 'bx bx-money',
                        title: 'Shipped Rate',
                        number: `${this.shippedRate} %`,
                   
                    },

                ]

                return Cards
            },

            ...mapState('allOrder', {
                AllOrdersShipped: state => state.shipped
            }),

            ...mapState('allOrder', {
                AllOrdersConfirmed: state => state.confirmed
            }),

            NumberOrdersShipped(){
                let numbers=this.AllOrdersShipped.length
                return numbers
            },

            NumberOrdersConfirmed(){
                let numbers=this.AllOrdersConfirmed.length
                return numbers
            },

            shippedRate(){
                let percentage= Math.floor((this.NumberOrdersShipped / this.NumberOrdersConfirmed) * 100)
                return percentage
            },

        }



    }
</script>