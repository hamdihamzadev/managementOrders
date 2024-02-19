<template>

    <b-container fluid>
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