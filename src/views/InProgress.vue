<template>

    <b-container fluid class="inprogress" >
        <h1 class="mb-4"> <strong>Orders in progress</strong> </h1>
        <ProgressTable />
    </b-container>


</template>

<script>
    import ProgressTable from '@/views/inprogress/ProgressTable.vue'
    export default {
        name: 'InProgress',
        components: {
            ProgressTable
        }
    }
</script>