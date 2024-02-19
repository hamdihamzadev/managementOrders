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
    ac_addProgress({commit,state},order){
        commit('m_addProgress',order)
        localStorage.setItem('Progress', JSON.stringify(state.ProgressOrders))
    },

    ac_RemoveOrderProgress({commit,state},index){
        commit('m_RemoveOrderProgress',index)
        localStorage.setItem('Progress', JSON.stringify(state.ProgressOrders))
    }
}

export default{
    namespaced: true,
    state,
    mutations,
    actions
}