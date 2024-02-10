const state={
    ReturnOrders:[]
}

const mutations={
    m_addReturn(state,order){
        state.ReturnOrders.push(order)
    },

    m_RemoveOrderReturn(state,index){
        state.ReturnOrders.splice(index,1)
    }
}

const actions ={
    ac_addReturn({commit},order){
        commit('m_addReturn',order)
    },

    ac_RemoveOrderReturn({commit},index){
        commit('m_RemoveOrderReturn',index)
    }
}
  
export default{
    namespaced: true,
    state,
    mutations,
    actions
}