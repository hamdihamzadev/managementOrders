<template>
    <section id="topStatistics" >
        <b-container>
            <div>
                <b-tabs content-class="mt-3" fill>
                  <b-tab title="Top category" active> <TopCategory/></b-tab>
                  <b-tab title="Top Product"><TopProduct/></b-tab>
                  <b-tab title="Top City"><TopCity/></b-tab>
                  <b-tab title="Top Customer"> <TopCustomer/> </b-tab>
                </b-tabs>
            </div>
        </b-container>
    </section>
</template>

<script>

import TopCategory from '@/views/top/TopCategory.vue'
import TopCity from '@/views/top/TopCity.vue'
import TopCustomer from '@/views/top/TopCustomer.vue'
import TopProduct from '@/views/top/TopProduct.vue'

export default{
    name:'TopStatistics',
    components:{
        TopCategory,
        TopCity,
        TopCustomer,
        TopProduct
    }
}
</script>