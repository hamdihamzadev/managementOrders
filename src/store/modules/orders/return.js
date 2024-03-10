const state={
    smartwatch: [],
    camera: [],
    powerbank: [],
    airpods: [],
    keyboard: []
}

const mutations={
    m_addOrderReturn(state,{category,order}){
        state[category].push(order)
    },

    m_RemoveOrderReturn(state,{category,ref}){
        state[category]=state[category].filter(order=>{
            return order.ref!==ref
        })
    }
}

const actions ={
    ac_addOrderReturn({commit,state},{category,order}){
        commit('m_addOrderReturn',{category,order})
        localStorage.setItem('Return', JSON.stringify(state))
    },

    ac_RemoveOrderReturn({commit,state},{category,ref}){
        commit('m_RemoveOrderReturn',{category,ref})
        localStorage.setItem('Return', JSON.stringify(state))
    }
}

export default{
    namespaced: true,
    state,
    mutations,
    actions
}