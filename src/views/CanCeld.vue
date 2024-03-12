<template>
    <b-container fluid class="mt-5">
        <h1 class="mb-4"> <strong>Orders cancelled</strong> </h1>
        <CartsCanceld/>
        <TableCanceld
        />
    </b-container>
</template>

<script>
import CartsCanceld from '@/views/Canceld/CardsCaanceld.vue'
import TableCanceld from '@/views/Canceld/TableCanceld.vue'
export default{
    name:'CanCeld',
    components:{
        TableCanceld,
        CartsCanceld
    },

  

 
}
</script>


