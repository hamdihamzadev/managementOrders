<template>
    <b-container class="return" fluid>
        <h1 class="mb-4"> <strong>Orders Return</strong> </h1>
        <CardsReturn/>
        <TableReturn/>
    </b-container>
</template>

<script>
    import CardsReturn from '@/views/Return/CardsReturn.vue'
    import TableReturn from '@/views/Return/TableReturn.vue'
    export default {
        name: 'ReTurn',
        components: {
            CardsReturn,
            TableReturn
        }
    }
</script>