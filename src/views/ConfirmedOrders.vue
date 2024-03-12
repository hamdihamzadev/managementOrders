<template>
    <b-container fluid class="confirmedorders" >
        <h1 class="mb-4"> <strong>Orders confirmed</strong> </h1>
        <CardsConfirmed/>
        <TableConfirmed/>
       <!-- chartconfirmation -->

         <b-row>
            <b-col cols="6">
                <ChartConfirmedneworders/>
            </b-col>
            <b-col cols="6">
                <ChartConfirmationRate/>
            </b-col>
         </b-row>
          
    </b-container>
</template>

<script>

import CardsConfirmed from '@/views/Confirmed/CardsConfirmed.vue'
import TableConfirmed from '@/views/Confirmed/TableConfirmed.vue'
import ChartConfirmedneworders from '@/views/Confirmed/ChartConfirmednewords.vue'
import ChartConfirmationRate from '@/views/Confirmed/ChartConfirmationRate.vue'

export default{
    name:'ConfirmedOredrs',
    components:{
        CardsConfirmed,
        TableConfirmed,
        ChartConfirmedneworders,
        ChartConfirmationRate
    }

}

</script>

<style scoped>
.chartconfirmation{
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
</style>