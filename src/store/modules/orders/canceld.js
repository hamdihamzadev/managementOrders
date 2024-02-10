const state={
    ordercanceld:[]
}

const mutations={
    addorder(state,order){
        state.ordercanceld.push(order)
    },

    m_RemoveOrderCanceld(state,index){
        state.ordercanceld.splice(index,1)
    }
}

const actions ={
    ac_addCanceld({commit},order){
        commit('addorder',order)
    },

    ac_RemoveOrderCanceld({commit},index){
        commit('m_RemoveOrderCanceld',index)
    }
}
  
export default{
    namespaced: true,
    state,
    mutations,
    actions
}