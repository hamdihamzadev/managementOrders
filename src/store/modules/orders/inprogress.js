const state={
    ProgressOrders:[]
}

const mutations={
    m_addProgress(state,order){
        state.ProgressOrders.push(order)
    },

    m_RemoveOrderProgress(state,index){
        state.ProgressOrders.splice(index,1)
    }
}

const actions ={
    ac_addProgress({commit},order){
        commit('m_addProgress',order)
    },

    ac_RemoveOrderProgress({commit},index){
        commit('m_RemoveOrderProgress',index)
    }
}

export default{
    namespaced: true,
    state,
    mutations,
    actions
}