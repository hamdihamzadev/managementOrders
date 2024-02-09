<template>
    <div class="mb-4">
        <CardGlobal 
        :carts="AllCarts"
        />
    </div>
</template>

<script>
import CardGlobal from '@/components/CardGlobal.vue'
export default{
    name:'CardsDeliverd',
    components: {
        CardGlobal
        },
        data() {
            return {
                AllCarts: [
                    {
                        classicon: 'Shipped',
                        icon: 'bx bx-trip',
                        title: 'Order Delivred',
                        number: '102/320',
                        pourcentage: 5.43,
                        duration:'Days'
                    },
                    {
                        classicon: 'income',
                        icon: 'bx bx-money',
                        title: 'Income',
                        number: 1634,
                        dollar: '$',
                        pourcentage: 4.87
                    },

                    {
                        classicon: 'delivery-rate',
                        icon: 'bx bx-money',
                        title: 'Delivery Rate',
                        number: '3.23 %',
                        pourcentage: 2.43,
                        duration:'Days'
                    },

                ]
            }
        }    
}
</script>