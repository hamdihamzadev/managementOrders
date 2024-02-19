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
    ac_addPostpond({commit,state},order){
        commit('m_addPostpond',order)
        localStorage.setItem('Postponed', JSON.stringify(state.PostpondOredrs))
    },

    ac_RemoveOrderPostpond({commit,state},index){
        commit('m_RemoveOrderPostpond',index)
        localStorage.setItem('Postponed', JSON.stringify(state.PostpondOredrs))
    }
}
  
export default{
    namespaced: true,
    state,
    mutations,
    actions
}