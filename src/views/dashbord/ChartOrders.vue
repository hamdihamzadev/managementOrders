<template>

    <div class="chart-orders">
        <div class="headline">
                  <h6 class="title">Total orders last 6 months</h6>
                  <h3 class="order-sexmonths">403874</h3>
        </div>
        <canvas id="myorder"></canvas>
    </div>

</template>

<script>
    import Chart from 'chart.js/auto';
    export default {

        name: 'GraphiqueOrders',
        mounted() {
            
            // CHART ORDER
            const data = {

                labels:['January','February','March','April','May','June'] ,
                datasets: [{
                    label: 'Total Orders',
                    data: [2067, 3970, 5076, 6386, 3965, 2986],
                    backgroundColor:'#f536361a',
                    borderColor:'#f5363d',
                    borderWidth: 1
                },

                {
                    label: 'Total Views',
                    data: [6805, 5079, 8490, 9031, 5686, 3995],
                    backgroundColor:'rgba(54, 92, 245, 0.1)',
                    borderColor:'#365CF5',
                    borderWidth: 1
                }]
            };

            const ctx = document.getElementById('myorder');
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

<style scoped>
.chart-orders{
    margin-top: 34px;
    background: #14142D;
    padding: 41px 40px;
    border-radius: 12px;
}

#myorder{
height: 20%;
width: 30%;
}

.headline .title{
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
}

.headline .order-sexmonths{
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 15px;
}

</style>