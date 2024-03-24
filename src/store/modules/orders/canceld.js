const state={
    smartwatch:JSON.parse(localStorage.getItem('CancelledOrders')).smartwatch,
    camera: JSON.parse(localStorage.getItem('CancelledOrders')).camera,
    powerbank: JSON.parse(localStorage.getItem('CancelledOrders')).powerbank,
    airpods: JSON.parse(localStorage.getItem('CancelledOrders')).airpods,
    keyboard: JSON.parse(localStorage.getItem('CancelledOrders')).keyboard

  
}

const mutations={
    m_addOrderCancelled(state,{category,order}){
        state[category].push(order)
    },

    m_RemoveOrderCancelled(state,{category,date}){
        state[category]= state[category].filter(order=>{
            return order.date!==date
        })
   },
}

const actions ={
    ac_addOrderCancelled({commit,state},{category,order}){
        commit('m_addOrderCancelled',{category,order})
        localStorage.setItem('CancelledOrders',JSON.stringify(state))
    },

    ac_RemoveOrderCancelled({commit,state},{category,date}){
        commit('m_RemoveOrderCancelled',{category,date})
        localStorage.setItem('CancelledOrders',JSON.stringify(state))
    }
}
  
export default{
    namespaced: true,
    state,
    mutations,
    actions
}