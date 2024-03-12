<template>
    <b-container fluid class="delivred">
        <h1 class="mb-4">  <strong>Orders Delivered</strong> </h1>
        <CardsDeliverd/>
        <TableDelivred/>
    </b-container>
</template>

<script>
import CardsDeliverd from '@/views/Deliverd/CardsDeliverd.vue'
import TableDelivred from '@/views/Deliverd/TableDelivred.vue'

export default{

    name:'DeliVerd',
    components:{
        CardsDeliverd,
        TableDelivred
    }
}
</script>