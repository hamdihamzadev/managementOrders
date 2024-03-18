
const state={
    
    smartwatch:JSON.parse(localStorage.getItem('New orders')).smartwatch,
    camera: JSON.parse(localStorage.getItem('New orders')).camera,
    powerbank: JSON.parse(localStorage.getItem('New orders')).powerbank,
    airpods: JSON.parse(localStorage.getItem('New orders')).airpods,
    keyboard: JSON.parse(localStorage.getItem('New orders')).keyboard
}

const mutations={

    m_addNewOrder(state,{category,order}){
        state[category].push(order)
    }
}

const actions ={
    ac_addNewOrder({commit},{category,order}){
        commit('m_addNewOrder',{category,order})
        localStorage.setItem('New orders', JSON.stringify(state))
    }
}
  
export default{
    namespaced: true,
    state,
    mutations,
    actions
}






