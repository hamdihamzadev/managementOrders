const state={
    ShippedOrders:[]
}

const mutations={
    m_addShipped(state,order){
        state.ShippedOrders.push(order)
    },

    m_RemoveOrderShipped(state,index){
        state.ShippedOrders.splice(index,1)
    }
}

const actions ={
    ac_addShipped({commit},order){
        commit('m_addShipped',order)
    },

    ac_RemoveOrderShipped({commit},index){
        commit('m_RemoveOrderShipped',index)
    }
}
  
export default{
    namespaced: true,
    state,
    mutations,
    actions
}