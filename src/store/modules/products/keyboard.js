let state={
    keyboard:[]
}

let mutations={
    m_addkeyboard(state,newkeyboard){
        state.keyboard.psuh(newkeyboard)
    }
}

const actions ={
    ac_addkeyboard({commit,state},newkeyboard){
        commit('m_addkeyboard',newkeyboard)
        localStorage.setItem('Prouctkeyboard',JSON.stringify(state.keyboard))
    }
}

export default{
    namespaced:true,
    state,
    mutations,
    actions
}