<template>
    <div>
        <CardGlobal :carts="Allcarts" />
    </div>

</template>

<script>

import CardGlobal from '@/components/CardGlobal.vue'
    export default {

        name: 'CardNeworders',
        components: {
            CardGlobal
        },
        data() {
            return {
                Allcarts: [{
                        classicon: 'Neworders',
                        icon: 'bx bx-cart-add',
                        title: 'New orders',
                        number: 139,
                        pourcentage: 4.43
                    },

                    {
                        classicon: 'income',
                        icon: 'bx bx-money',
                        title: 'Income',
                        number: 2404,
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
            }
        }

    }
</script>