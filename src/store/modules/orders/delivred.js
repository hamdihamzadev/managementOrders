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
    ac_addDelivred({commit,state},order){
        commit('m_addDelivred',order)
        localStorage.setItem('Delivered', JSON.stringify(state.DelivredOredrs))
    },

    ac_RemoveOrderDelivred({commit,state},index){
        commit('m_RemoveOrderDelivred',index)
        localStorage.setItem('Delivered', JSON.stringify(state.DelivredOredrs))
    }
}
  
export default{
    namespaced: true,
    state,
    mutations,
    actions
}