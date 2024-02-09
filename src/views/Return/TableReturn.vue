<template>
     <div>
        <TableGlobal
        :titletable="titletable"
        :orders="ReturnOrders"
        @remove-order="removeorder"
        />
    </div>
</template>

<script>
 import {
    mapState,
    mapActions
  } from 'vuex'
  import TableGlobal from '@/components/TableGlobal.vue'
export default{
    name:'TableReturn',
    components:{
      TableGlobal
    },

    data(){
        return{
            titletable:'Today Return'
        }
    },

    computed:{
      // GET MODULE STATE RETURN
      ...mapState('ReturnOrders', {
        ReturnOrders: 'ReturnOrders'
      }),
    },

    methods:{
      ...mapActions('ReturnOrders',['ac_RemoveOrderReturn']),

      //REMOVE ORDER
      removeorder(index){
        this.ac_RemoveOrderReturn(index)  // ===> REMOVE ORDER IN STORE VUEX RETURN ACTIONS
        localStorage.setItem('Return',JSON.stringify(this.ReturnOrders))  // UPDATE STOCK RETURN
      }
    }
}
</script>