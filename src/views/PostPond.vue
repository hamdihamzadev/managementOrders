<template>
    <b-container fluid class="postpond">
        <h1 class="mb-4"> Orders PostPond</h1>
        <PostPondTable/>
    </b-container>
</template>

<script>
import PostPondTable from '@/views/postpond/TablePostpond.vue'
export default{
    name:'PostPond',
    components:{
        PostPondTable
    }
}
</script>