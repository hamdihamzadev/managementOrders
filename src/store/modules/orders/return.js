const state={
    smartwatch:JSON.parse(localStorage.getItem('Return')).smartwatch,
    camera: JSON.parse(localStorage.getItem('Return')).camera,
    powerbank: JSON.parse(localStorage.getItem('Return')).powerbank,
    airpods: JSON.parse(localStorage.getItem('Return')).airpods,
    keyboard: JSON.parse(localStorage.getItem('Return')).keyboard
}

const mutations={

    m_addOrderReturn(state,{category,order}){
        state[category].push(order)
    },

    m_RemoveOrderReturn(state,{category,date}){
        state[category]= state[category].filter(order=>{
            return order.date!==date
        })
   },
}

const actions ={
    ac_addOrderReturn({commit,state},{category,order}){
        commit('m_addOrderReturn',{category,order})
        localStorage.setItem('Return', JSON.stringify(state))
    },

    ac_RemoveOrderReturn({commit,state},{category,date}){
        commit('m_RemoveOrderReturn',{category,date})
        localStorage.setItem('Return', JSON.stringify(state))
    }
}

export default{
    namespaced: true,
    state,
    mutations,
    actions
}