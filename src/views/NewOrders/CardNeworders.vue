<template>
    <div>
        <CardGlobal :carts="Allcarts" />
    </div>

</template>

<script>
    import { mapState } from 'vuex'
    import CardGlobal from '@/components/CardGlobal.vue'
    export default {

        name: 'CardNeworders',
        components: {
            CardGlobal
        },
       

        computed: {
            
            Allcarts(){
                 let  carts=[{
                        classicon: 'Neworders',
                        icon: 'bx bx-cart-add',
                        title: 'New orders',
                        number: this.newOrder,
                        pourcentage: 4.43
                    },

                    {
                        classicon: 'income',
                        icon: 'bx bx-money',
                        title: 'Sales',
                        number: this.sales,
                        dollar: '$',
                        pourcentage: 1.87
                    },
                    {
                        classicon: 'visitors',
                        icon: 'bx bx-show',
                        title: 'Visitors',
                        number: 4439,
                        pourcentage: 3.28
                    },
                ]
                return carts
            },

            ...mapState('allOrder', {
                productModuleStates: state => state.new
            }),

            newOrder(){
                let numbersOrders=this.productModuleStates.length
                return numbersOrders
            },

            sales(){
                let totalSales=this.productModuleStates.reduce((accu,order)=>{
                    return accu + order.total
                },0)
                return totalSales
            }


        },

    



    }
</script>