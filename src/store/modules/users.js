let state={
    users:[

    ]
}

let mutations={
    m_addUser(state,newuser){
        state.users.push(newuser)
    }
}

let actions={
    ac_addUser({commit,state},newuser){
        commit('m_addUser',newuser)
        localStorage.setItem('Users',JSON.stringify(state.users))
    }
}
    
export default{
    namespaced: true,
    state,
    mutations,
    actions
}