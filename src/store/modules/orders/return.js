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
    ac_addReturn({commit,state},order){
        commit('m_addReturn',order)
        localStorage.setItem('Return', JSON.stringify(state.ReturnOrders))
    },

    ac_RemoveOrderReturn({commit,state},index){
        commit('m_RemoveOrderReturn',index)
        localStorage.setItem('Return', JSON.stringify(state.ReturnOrders))
    }
}

export default{
    namespaced: true,
    state,
    mutations,
    actions
}