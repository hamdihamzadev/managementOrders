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
    ac_addShipped({commit,state},order){
        commit('m_addShipped',order)
        localStorage.setItem('Shipped', JSON.stringify(state.ShippedOrders))
    },

    ac_RemoveOrderShipped({commit,state},index){
        commit('m_RemoveOrderShipped',index)
        localStorage.setItem('Shipped', JSON.stringify(state.ShippedOrders))
    }
}
  
export default{
    namespaced: true,
    state,
    mutations,
    actions
}