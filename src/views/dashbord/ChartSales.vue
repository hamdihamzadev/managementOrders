<template>

    <div class="chart-views">
        <div class="headline">
            <h6 class="title">Total Sales in last 6 months</h6>
            <h3 class="order-sexmonths">84 420 $</h3>
        </div>
        <canvas id="myviews"></canvas>
    </div>

</template>

<script>
    import Chart from 'chart.js/auto';
    export default {

        name: 'ChartSales',
        mounted() {

            const ctx = document.getElementById('myviews');
            const data = {
                labels: ['January','February','March','April','May','June'],
                datasets: [{
                    label: 'Total Sales',
                    data: [34305, 11942, 10340, 134031, 56234, 45645, 32342],
                    fill: false,
                    borderColor: '#365cf5',
                    tension: 0.1
                }]
            };
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
            })

        }
    }
</script>

<style scoped>
    .chart-views {
        margin-top: 34px;
        background: #14142D;
        padding: 41px 40px;
        border-radius: 12px;
    }

    #myviews {
        height: 20%;
        width: 30%;
    }

    .headline .title {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 10px;
    }

    .headline .order-sexmonths {
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 15px;
    }
</style>