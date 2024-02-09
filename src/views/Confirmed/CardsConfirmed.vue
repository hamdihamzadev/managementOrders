<template>
    <div class="carts-confirmed">
        <CardGlobal :carts="carts" />
    </div>
</template>

<script>
    import CardGlobal from '@/components/CardGlobal.vue'
    export default {
        name: 'CardsConfirmed',
        components: {
            CardGlobal,
        },
        data() {
            return {
                
                carts: [

                    {
                    classicon: 'Order-Confirmed',
                    icon: 'bx bx-package',
                    title: 'Order Confirmed',
                    number: "120 / 234",
                    pourcentage: 3.20,
                    duration:'Today'
                   
                },
                    {

                    classicon: 'confirmation-rate',
                    icon: 'bx bx-chart',
                    title: 'Confirmation Rate',
                    number: '57%',
                    pourcentage: 3.20,
                    duration:'Today'
                }
            ]

            }
        }

    }
</script>

