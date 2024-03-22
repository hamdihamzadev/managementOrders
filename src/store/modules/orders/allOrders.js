const state={

    new:JSON.parse(localStorage.getItem('allOrder')).new,
    confirmed:JSON.parse(localStorage.getItem('allOrder')).confirmed,
    shipped:JSON.parse(localStorage.getItem('allOrder')).shipped,
    Delivered:JSON.parse(localStorage.getItem('allOrder')).Delivered,
    cancelled:JSON.parse(localStorage.getItem('allOrder')).cancelled,
    postpond:JSON.parse(localStorage.getItem('allOrder')).postpond,
    progress:JSON.parse(localStorage.getItem('allOrder')).progress,
    return:JSON.parse(localStorage.getItem('allOrder')).return,
   
}

const mutations={
    m_addInAllOrder(state,{status,order}){
        state[status].push(order)
    },

}

const actions={
    ac_addInAllOrder({commit,state},{status,order}){
        commit('m_addInAllOrder',{status,order})
        localStorage.setItem('allOrder',JSON.stringify(state))
    },

}

export default{
    namespaced:true,
    state,
    mutations,
    actions

}



