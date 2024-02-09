<template>
    <div class="carts-confirmed">
        <CardGlobal :carts="carts" />
    </div>
</template>

<script>
    import CardGlobal from '@/components/CardGlobal.vue'
    export default {
        name: 'CartsCanceld',
        components: {
            CardGlobal,
        },
        data() {
            return {
                
                carts: [

                    {
                    classicon: 'Order-Confirmed',
                    icon: 'bx bx-package',
                    title: 'Order Canceld',
                    number: "23 /138",
                    pourcentage: 1.20,
                    duration:'Today'
                   
                },
                    {

                    classicon: 'confirmation-rate',
                    icon: 'bx bx-chart',
                    title: 'Canceld Rate',
                    number: '3%',
                    pourcentage: 1.20,
                    duration:'Today'
                }
            ]

            }
        }

    }
</script>

