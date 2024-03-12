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
                        title: 'Income',
                        number: this.income,
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

            ...mapState('NewOrders', {
                StoreNewOrders:state=>state
            }),

            NumbersNewOrders(){
                let numbOrders=Object.values(this.StoreNewOrders).reduce((accu,table)=>{
                    return accu+table.length
                },0)
                return numbOrders
            },

            income(){
                let incomeOrders=0
                Object.values(this.StoreNewOrders).forEach(tableCtg=>{
                    tableCtg.length>0 ? tableCtg.forEach(order=>{ incomeOrders= Math.floor(incomeOrders+ parseFloat(order.total))  }) : ''
                })
                return incomeOrders
            }

        },

        mounted(){
            console.log(this.income)
        }

    }
</script>