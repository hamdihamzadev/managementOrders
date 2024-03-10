const state={
    smartwatch: [],
    camera: [],
    powerbank: [],
    airpods: [],
    keyboard: []
}

const mutations={
    m_addOrdersdelivered(state,{category,order}){
        state[category].push(order)
    },

    m_RemoveOrderDelivred(state,{category,ref}){
        state[category]= state[category].filter(order=>{
            return order.ref!==ref
        })
    }
}

const actions ={
    ac_addOrdersdelivered({commit,state},{category,order}){
        commit('m_addOrdersdelivered',{category,order})
        localStorage.setItem('Ordersdelivered', JSON.stringify(state))
    },

    ac_RemoveOrderDelivred({commit,state},{category,ref}){
        commit('m_RemoveOrderDelivred',{category,ref})
        localStorage.setItem('Ordersdelivered', JSON.stringify(state))
    }
}
  
export default{
    namespaced: true,
    state,
    mutations,
    actions
}



