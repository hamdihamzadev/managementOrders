let state={
    Camera:[]
}

let mutations={
    m_addCamera(state,newcamera){
        state.Camera.psuh(newcamera)
    }
}

const actions ={
    ac_addCamera({commit,state},newcamera){
        commit(' m_addCamera',newcamera)
        localStorage.setItem('ProuctCamera',JSON.stringify(state.Camera))
    }
}

export default{
    namespaced:true,
    state,
    mutations,
    actions
}