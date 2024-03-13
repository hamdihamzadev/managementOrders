const state={
    new:[],
    confirmed:[],
    shipped:[],
    Delivered:[],
    cancelled:[],
    postpond:[],
    progress:[],
    return:[],
}

const mutations={
    m_addInAllOrder(state,{status,order}){
        state[status].push(order)
    },

}

const actions={
    ac_addInAllOrder({commit,state},{status,order}){
        commit('m_addInAllOrder',{status,order})
        localStorage.setItem('allOrder',JSON.stringify(state))
    },

}

export default{
    namespaced:true,
    state,
    mutations,
    actions

}



