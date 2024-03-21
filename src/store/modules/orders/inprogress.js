const state={
    smartwatch:JSON.parse(localStorage.getItem('Progress')).smartwatch,
    camera: JSON.parse(localStorage.getItem('Progress')).camera,
    powerbank: JSON.parse(localStorage.getItem('Progress')).powerbank,
    airpods: JSON.parse(localStorage.getItem('Progress')).airpods,
    keyboard: JSON.parse(localStorage.getItem('Progress')).keyboard
}

const mutations={
    m_addOrderInProgress(state,{category,order}){
        state[category].push(order)
    },

    m_RemoveOrderProgress(state,{category,ref}){
        state[category]=state[category].filter(order=>{
            return order.ref!==ref
        })
    }
}

const actions ={
    ac_addOrderInProgress({commit,state},{category,order}){
        commit('m_addOrderInProgress',{category,order})
        localStorage.setItem('Progress', JSON.stringify(state))
    },

    ac_RemoveOrderProgress({commit,state},{category,ref}){
        commit('m_RemoveOrderProgress',{category,ref})
        localStorage.setItem('Progress', JSON.stringify(state))

        /**
         * save numbers orders ===> array 
         */
    }
}

export default{
    namespaced: true,
    state,
    mutations,
    actions
}