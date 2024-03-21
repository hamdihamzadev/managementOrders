const state={
    smartwatch:JSON.parse(localStorage.getItem('ShippedOrders')).smartwatch,
    camera: JSON.parse(localStorage.getItem('ShippedOrders')).camera,
    powerbank: JSON.parse(localStorage.getItem('ShippedOrders')).powerbank,
    airpods: JSON.parse(localStorage.getItem('ShippedOrders')).airpods,
    keyboard: JSON.parse(localStorage.getItem('ShippedOrders')).keyboard
}

const mutations={
    m_addOrderShipped(state,{category,order}){
        state[category].push(order)
    },

    m_RemoveOrderShipped(state,{category,ref}){
        state[category]=state[category].filter(order=>{
            return order.ref!==ref
        })
    }
}

const actions ={
    ac_addOrderShipped({commit,state},{category,order}){
        commit('m_addOrderShipped',{category,order})
        localStorage.setItem('ShippedOrders', JSON.stringify(state))
    },

    ac_RemoveOrderShipped({commit,state},{category,ref}){
        commit('m_RemoveOrderShipped',{category,ref})
        localStorage.setItem('ShippedOrders', JSON.stringify(state))
    }
}
  
export default{
    namespaced: true,
    state,
    mutations,
    actions
}