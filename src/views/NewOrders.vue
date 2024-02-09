<template>
    <b-container class="neworders" fluid>
        <h1 class="mb-4">New Orders</h1>
        <CardNeworders/>
        <TableNeworders/>
    </b-container>
</template>

<script>
import CardNeworders from '@/views/NewOrders/CardNeworders.vue'
import TableNeworders from '@/views/NewOrders/TabelNeworders.vue'
export default{
    name:'NewOrders',
    components:{
        CardNeworders,
        TableNeworders,
        
    }
}
</script>