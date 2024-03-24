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

    m_RemoveOrderShipped(state,{category,date}){
        state[category]= state[category].filter(order=>{
            return order.date!==date
        })
   },
}

const actions ={
    ac_addOrderShipped({commit,state},{category,order}){
        commit('m_addOrderShipped',{category,order})
        localStorage.setItem('ShippedOrders', JSON.stringify(state))
    },

    ac_RemoveOrderShipped({commit,state},{category,date}){
        commit('m_RemoveOrderShipped',{category,date})
        localStorage.setItem('ShippedOrders', JSON.stringify(state))
    }
}
  
export default{
    namespaced: true,
    state,
    mutations,
    actions
}