const state={
    dataConfrimed:[]
}

const mutations={
    addorder(state,order){
        state.dataConfrimed.push(order)
    },
    m_RemoveOrderConfirmed(state,index){
        state.dataConfrimed.splice(index,1)
    }
}

const actions ={

    ac_orderConfirmed({commit},order){
        commit('addorder',order)
    },

    ac_RemoveOrderConfirmed({commit},index){
        commit('m_RemoveOrderConfirmed',index)
    }
}
  
export default{
    namespaced: true,
    state,
    mutations,
    actions
}