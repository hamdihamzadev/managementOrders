<template>
  <b-container fluid class="dashbord">
    <h1 class="mb-4">Dashbord</h1>
    <CartsAllorders />
    <b-row>

      <b-col cols="6">
        <GraphiqueOrders />
      </b-col>

      <b-col cols="6">
        <ChartSales />
      </b-col>

    </b-row>

  </b-container>
</template>

<script>
  import CartsAllorders from '@/views/dashbord/CartsAllorders.vue'
  import GraphiqueOrders from '@/views/dashbord/ChartOrders.vue'
  import ChartSales from '@/views/dashbord/ChartSales.vue'

  export default {
    name: 'DashBord',
    components: {
      CartsAllorders,
      GraphiqueOrders,
      ChartSales,
    },
    data() {
      return {
        fields: ['first_name', 'last_name', 'age', 'menu'],
        items: [
        { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
      ],
      options:['confirmed','shipped']
      }
    }

  }
</script>

<style>
  #table-Order {
    color: white
  }

  #table{
    color:white
  }
</style>