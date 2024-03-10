const state={
    smartwatch: [],
    camera: [],
    powerbank: [],
    airpods: [],
    keyboard: []
}

const mutations={
    m_addOrderPostpond(state,{category,order}){
        state[category].push(order)
    },

    m_RemoveOrderPostpond(state,{category,ref}){
        state[category]=state[category].filter(order=>{
            return order.ref!==ref
        })
    }
}

const actions ={
    ac_addOrderPostpond({commit,state},{category,order}){
        commit('m_addOrderPostpond',{category,order})
        localStorage.setItem('Postponed', JSON.stringify(state))
    },

    ac_RemoveOrderPostpond({commit,state},{category,ref}){
        commit('m_RemoveOrderPostpond',{category,ref})
        localStorage.setItem('Postponed', JSON.stringify(state))
    }
}
  
export default{
    namespaced: true,
    state,
    mutations,
    actions
}