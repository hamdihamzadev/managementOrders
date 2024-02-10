const state={
    DelivredOredrs:[]
}

const mutations={
    m_addDelivred(state,order){
        state.DelivredOredrs.push(order)
    },

    m_RemoveOrderDelivred(state,index){
        state.DelivredOredrs.splice(index,1)
    }
}

const actions ={
    ac_addDelivred({commit},order){
        commit('m_addDelivred',order)
    },

    ac_RemoveOrderDelivred({commit},index){
        commit('m_RemoveOrderDelivred',index)
    }
}
  
export default{
    namespaced: true,
    state,
    mutations,
    actions
}