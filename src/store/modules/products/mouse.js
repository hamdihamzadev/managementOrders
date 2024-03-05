let state={
    mouse:[]
}

let mutations={
    m_addMouse(state,newMouse){
        state.mouse.psuh(newMouse)
    }
}

const actions ={
    ac_addMouse({commit,state},newMouse){
        commit(' m_addMouse',newMouse)
        localStorage.setItem('ProuctMouse',JSON.stringify(state.mouse))
    }
}

export default{
    namespaced:true,
    state,
    mutations,
    actions
}