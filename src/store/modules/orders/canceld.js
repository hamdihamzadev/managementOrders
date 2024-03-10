const state={
    smartwatch: [],
    camera: [],
    powerbank: [],
    airpods: [],
    keyboard: []
}

const mutations={
    m_addOrderCancelled(state,{category,order}){
        state[category].push(order)
    },

    m_RemoveOrderCancelled(state,{category,ref}){
        state[category]=state[category].filter(order=>{
            return order.ref!==ref
        })
    }
}

const actions ={
    ac_addOrderCancelled({commit,state},{category,order}){
        commit('m_addOrderCancelled',{category,order})
        localStorage.setItem('CancelledOrders',JSON.stringify(state))
    },

    ac_RemoveOrderCancelled({commit,state},{category,ref}){
        commit('m_RemoveOrderCancelled',{category,ref})
        localStorage.setItem('CancelledOrders',JSON.stringify(state))
    }
}
  
export default{
    namespaced: true,
    state,
    mutations,
    actions
}