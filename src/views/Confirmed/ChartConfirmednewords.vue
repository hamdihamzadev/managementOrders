<template>
    <div class="chartConfirmedneworders">
        <ChartGlobal
        :title="title"
        :number="number"
        v-bind:classcanvas="classcanvas"
        v-bind:classchart="classchart"
        />
    </div>
</template>

<script>
import $ from 'jquery'; // jquery
import Chart from 'chart.js/auto'; // chart
import ChartGlobal from '@/components/ChartGlobal.vue' // chart global

export default{
    name:'ChartConfirmedneworders',
    components:{
        ChartGlobal
    },

    data(){
        return{
            title:'Confirmed / New Orders Last 6 Months',
            number:'10393/20482',
            classcanvas:'canvas',
            classchart:'confirmedneworders'
        }
    },

    mounted() {
            
            // CHART ORDER
            const data = {

                labels:['January','February','March','April','May','June'] ,
                datasets: [{
                    label: ' Confirmed',
                    data: [2067, 3970, 5076, 6386, 3965, 2986],
                    backgroundColor:'rgba(242, 153, 74, 0.1)',
                    borderColor:'#f2994a',
                    borderWidth: 1
                },

                {
                    label: 'New orders',
                    data: [6805, 5079, 8490, 9031, 5686, 3995],
                    backgroundColor:'rgba(33, 150, 83, 0.1)',
                    borderColor:'#219653',
                    borderWidth: 1

                }]
            };

            const ctx = $('.canvas')
            new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
}
</script>


<style scoped lang="scss">
.chartConfirmedneworders{
    width: 100%;

    .confirmedneworders{
        width: 81%;
    }
}
</style>