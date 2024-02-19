const state={
    dataConfrimed:[],

}

const mutations={
    addorder(state,order){
        state.dataConfrimed.push(order)
    },
    m_RemoveOrderConfirmed(state,index){
        state.dataConfrimed.splice(index,1)
    },


}

const actions ={

    ac_orderConfirmed({commit,state},order){
        commit('addorder',order)
        localStorage.setItem('Confirmed', JSON.stringify(state.dataConfrimed))

    },

    ac_RemoveOrderConfirmed({commit,state},index){
        commit('m_RemoveOrderConfirmed',index)
        localStorage.setItem('Confirmed', JSON.stringify(state.dataConfrimed))
             
    },

}
  
export default{
    namespaced: true,
    state,
    mutations,
    actions
}