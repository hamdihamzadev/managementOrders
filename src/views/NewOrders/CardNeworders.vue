<template>
    <div>
        <CardGlobal :carts="Allcarts" />
    </div>

</template>

<script>
    import {
        mapState
    } from 'vuex';
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
                        number: this.NumbersNewOrders,
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
                AllNewOrders:state=>state.new
            }),

            NumbersNewOrders(){
                let numbOrders=this.AllNewOrders.length
                return numbOrders
            },

            sales(){
                let Allsales=this.AllNewOrders.reduce((accu,order)=>{
                    return accu+order.total
                },0)
                return Allsales
            }

        },

        mounted(){
            this.AllNewOrders.forEach(order=>{
                console.log(order.total)
            })
        }



    }
</script>