
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
    },

    m_RemoveNewOrder(state,{category,date}){
        state[category]= state[category].filter(order=>{
            return order.date!==date
        })
   },

}

const actions ={
    ac_addNewOrder({commit,state},{category,order}){
        commit('m_addNewOrder',{category,order})
        localStorage.setItem('New orders', JSON.stringify(state))
    },

    ac_RemoveNewOrder({commit,state},{category,date}){
        commit('m_RemoveNewOrder' , {category,date})
        localStorage.setItem('New orders', JSON.stringify(state))
    }
}
  
export default{
    namespaced: true,
    state,
    mutations,
    actions
}






