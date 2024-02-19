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
    ac_addCanceld({commit,state},order){
        commit('addorder',order)
        localStorage.setItem('Canceled', JSON.stringify(state.ordercanceld))
    },

    ac_RemoveOrderCanceld({commit,state},index){
        commit('m_RemoveOrderCanceld',index)
        localStorage.setItem('Canceled', JSON.stringify(state.ordercanceld))
    }
}
  
export default{
    namespaced: true,
    state,
    mutations,
    actions
}