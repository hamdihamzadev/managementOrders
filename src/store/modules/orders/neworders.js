// neworders.js
import JsonNewOrders from '@/json/neworder.json'

const state={
    NewOrders:JsonNewOrders
}

const mutations={

    addorder(state,order){
        state.NewOrders.push(order)
    }
}

const actions ={
    ac_addOrder({commit},order){
        commit('addorder',order)
    }
}
  
export default{
    namespaced: true,
    state,
    mutations,
    actions
}