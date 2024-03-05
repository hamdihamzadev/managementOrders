let state={
    Powerbank:[]
}

let mutations={
    m_addPowerbank(state,newPowerbank){
        state.Powerbank.psuh(newPowerbank)
    }
}

const actions ={
    ac_addPowerbank({commit,state},newPowerbank){
        commit(' m_addPowerbank',newPowerbank)
        localStorage.setItem('ProuctPowerbank',JSON.stringify(state.Powerbank))
    }
}

export default{
    namespaced:true,
    state,
    mutations,
    actions
}