const state={
    smartwatch:JSON.parse(localStorage.getItem('Confirmed')).smartwatch,
    camera: JSON.parse(localStorage.getItem('Confirmed')).camera,
    powerbank: JSON.parse(localStorage.getItem('Confirmed')).powerbank,
    airpods: JSON.parse(localStorage.getItem('Confirmed')).airpods,
    keyboard: JSON.parse(localStorage.getItem('Confirmed')).keyboard
}

const mutations={
    m_addorderConfirmed(state,{category,order}){
        state[category].push(order)
    },
    m_RemoveOrderConfirmed(state,{category,ref}){
         state[category]= state[category].filter(order=>{
             return order.ref!==ref
         })
    },


}

const actions ={

    ac_orderConfirmed({commit,state},{category,order}){
        commit('m_addorderConfirmed',{category,order})
        localStorage.setItem('Confirmed', JSON.stringify(state))

    },

    ac_RemoveOrderConfirmed({commit,state},{category,ref}){
        commit('m_RemoveOrderConfirmed',{category,ref})
        localStorage.setItem('Confirmed', JSON.stringify(state))
             
    },


}
  
export default{
    namespaced: true,
    state,
    mutations,
    actions
}

