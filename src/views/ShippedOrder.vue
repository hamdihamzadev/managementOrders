<template>

    <b-container fluid class="shipped">
        <CardsShipped />
        <TableShipped />
    </b-container>

</template>

<script>
    import CardsShipped from '@/views/shipped/CardsShipped.vue'
    import TableShipped from '@/views/shipped/TableShipped.vue'

    export default {
        name: 'ShippedOrder',
        components: {
            CardsShipped,
            TableShipped,

           
        },


    }
</script>