const state={
    smartwatch: [],
    camera: [],
    powerbank: [],
    airpods: [],
    keyboard: []
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

