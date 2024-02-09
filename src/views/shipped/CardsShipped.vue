<template>
    <div class="carts-shipped">
        <CardGlobal :carts="AllCarts" />
    </div>
</template>

<script>
    import CardGlobal from '@/components/CardGlobal.vue'
    export default {
        name: 'CardsShipped',
        components: {
            CardGlobal
        },
        data() {
            return {
                AllCarts: [
                    {
                        classicon: 'Shipped',
                        icon: 'bx bx-trip',
                        title: 'Order Shipped',
                        number: '203/392',
                        pourcentage: 2.43,
                        duration:'Days'
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