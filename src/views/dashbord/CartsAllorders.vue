<template>
    <div class="analytnewOrder">
        <CardGlobal
        :carts="AllCarts"
        />
    </div>
</template>

<script>
import CardGlobal from '@/components/CardGlobal.vue'
export default{
    name:'CartsAllorders',
    components:{
        CardGlobal
    },
    data(){
       return{
        AllCarts:[
            {
             classicon:'allorders',
             icon:'bx bx-shopping-bag',
             title:'All Orders',
             number:3028,
             pourcentage:2.43
        },
            {
             classicon:'income',
             icon:'bx bx-money',
             title:'Income',
             number:23328,
             dollar:'$',
             pourcentage:2.43
        },
            {
             classicon:'views',
             icon:'bx bx-show',
             title:'All Views',
             number:6085,
             pourcentage:2.43
        },
            {
             classicon:'sales',
             icon:'bx bx-wallet',
             title:'Sales',
             dollar:'$',
             number:15854,
             pourcentage:2.43
        },
    
    ]
       }
    }
}
</script>

