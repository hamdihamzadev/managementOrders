<template>
    <div class="mb-4">
        <CardGlobal 
        :carts="cards"
        />
    </div>
</template>

<script>

import CardGlobal from '@/components/CardGlobal.vue'
import { mapState } from 'vuex'
export default{
    name:'CardsDeliverd',
    components: {
        CardGlobal
        },
             
        computed:{
            cards(){
                let AllCards=[
                    {
                        classicon: 'Shipped',
                        icon: 'bx bx-trip',
                        title: 'Order Delivred',
                        number: `${this.NumberOrdersDelivred} / ${this.NumberOrdersShipped} `,
                        pourcentage: 5.43,
                        duration:'Days'
                    },
                    {
                        classicon: 'income',
                        icon: 'bx bx-money',
                        title: 'Sales',
                        number: this.sales,
                        dollar: '$',
                        pourcentage: 4.87
                    },

                    {
                        classicon: 'delivery-rate',
                        icon: 'bx bx-money',
                        title: 'Delivery Rate',
                        number: `${this.deliveryRate} %`,
                        pourcentage: 2.43,
                        duration:'Days'
                    },

                ]
                return AllCards
            },

            ...mapState('allOrder', {
                AllOrdersShipped: state => state.shipped
            }),
            ...mapState('allOrder', {
                AllOrdersDelivered: state => state.Delivered
            }),

            NumberOrdersShipped(){
                let numbers=this.AllOrdersShipped.length
                return numbers
            },
           
            NumberOrdersDelivred(){
                let numbers=this.AllOrdersDelivered.length
                return numbers
            },

            sales(){

                let totalSales=this.AllOrdersDelivered.reduce((accu,order)=>{
                    return accu+order.total
                },0)
                return totalSales
            },

            deliveryRate(){
                let percentage= Math.floor((this.NumberOrdersDelivred/this.NumberOrdersShipped)*100)
                return percentage
            }
    
        }
}
</script>