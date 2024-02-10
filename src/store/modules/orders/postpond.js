const state={
    PostpondOredrs:[]
}

const mutations={
    m_addPostpond(state,order){
        state.PostpondOredrs.push(order)
    },

    m_RemoveOrderPostpond(state,index){
        state.PostpondOredrs.splice(index,1)
    }
}

const actions ={
    ac_addPostpond({commit},order){
        commit('m_addPostpond',order)
    },

    ac_RemoveOrderPostpond({commit},index){
        commit('m_RemoveOrderPostpond',index)
    }
}
  
export default{
    namespaced: true,
    state,
    mutations,
    actions
}