<template>
    <div class="ChartConfirmationRate">
        <ChartGlobal :title="title" v-bind:classcanvas="classcanvas" v-bind:classchart="classchart"/>
    </div>
</template>

<script>
    import $ from 'jquery'; // jquery
    import Chart from 'chart.js/auto';
    import ChartGlobal from '@/components/ChartGlobal.vue'
    export default {
        name: "ChartConfirmationRate",
        components: {
            ChartGlobal
        },

        data() {
            return {
                title: 'Confirmation Rate Last 6 Months',
                classcanvas:'canvasconfirmationrate',
                classchart:'confirmationrate'
            }
        },

        mounted() {

            // CHART ORDER
            const data = {
                labels: [
                'January','February','March','April','May','June'],
                datasets: [{
                    label: 'Confirmation Rate %',
                    data: [55, 37, 86, 45, 70,32],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(75, 192, 192)',
                        'rgb(255, 205, 86)',
                        'rgb(201, 203, 207)',
                        'rgb(54, 162, 235)'
                    ]
                }]
            };

            const ctx = $('.canvasconfirmationrate')
            new Chart(ctx, {
                type: 'line',
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
.ChartConfirmationRate{
    width: 100%;

    .confirmationrate{

        width: 88%;
    }
}

</style>