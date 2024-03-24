const state={
    smartwatch:JSON.parse(localStorage.getItem('Ordersdelivered')).smartwatch,
    camera: JSON.parse(localStorage.getItem('Ordersdelivered')).camera,
    powerbank: JSON.parse(localStorage.getItem('Ordersdelivered')).powerbank,
    airpods: JSON.parse(localStorage.getItem('Ordersdelivered')).airpods,
    keyboard: JSON.parse(localStorage.getItem('Ordersdelivered')).keyboard

}

const mutations={
    m_addOrdersdelivered(state,{category,order}){
        state[category].push(order)
    },

    m_RemoveOrderDelivred(state,{category,date}){
        state[category]= state[category].filter(order=>{
            return order.date!==date
        })
   },
}

const actions ={
    ac_addOrdersdelivered({commit,state},{category,order}){
        commit('m_addOrdersdelivered',{category,order})
        localStorage.setItem('Ordersdelivered', JSON.stringify(state))
    },

    ac_RemoveOrderDelivred({commit,state},{category,date}){
        commit('m_RemoveOrderDelivred',{category,date})
        localStorage.setItem('Ordersdelivered', JSON.stringify(state))
    }
}
  
export default{
    namespaced: true,
    state,
    mutations,
    actions
}



