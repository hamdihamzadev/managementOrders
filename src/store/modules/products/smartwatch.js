let state={
    Smartwatch:[]
}

let mutations={
    m_addPrdSmartwatch(state,newuSmartwatch){
        state.Smartwatch.push(newuSmartwatch)
    }
}

let actions={
    ac_addPrdSmartwatch({commit,state},newuSmartwatch){
        commit('m_addPrdSmartwatch',newuSmartwatch)
        localStorage.setItem('ProuctSmartwatch',JSON.stringify(state.Smartwatch))
    }
}
    
export default{
    namespaced: true,
    state,
    mutations,
    actions
}