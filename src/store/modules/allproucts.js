let state = {
    smartwatch: [],
    camera: [],
    powerbank: [],
    airpods: [],
    keyboard: []
}


let mutations = {

    // ADD PRODUCT
    m_addproduct(state, {
        category,
        newprd
    }) {
        state[category].push(newprd)

        switch (category) {
            case 'smartwatch':
                localStorage.setItem('SmartWatch', JSON.stringify(state.smartwatch));
                break;
            case 'camera':
                localStorage.setItem('Camera', JSON.stringify(state.camera));
                break;
            case 'powerbank':
                localStorage.setItem('PowerBank', JSON.stringify(state.powerbank));
                break;
            case 'airpods':
                localStorage.setItem('AirPods', JSON.stringify(state.airpods));
                break;
            case 'keyboard':
                localStorage.setItem('KeyBoard', JSON.stringify(state.keyboard));
                break;
            default:
                window.alert('category no found')
        }

    },


    // REMOVE PRODUCT
    m_Removeproduct(state, {
        category,
        index
    }) {
        state[category].splice(index, 1)

        switch (category) {
            case 'smartwatch':
                localStorage.setItem('SmartWatch', JSON.stringify(state.smartwatch));
                break;
            case 'camera':
                localStorage.setItem('Camera', JSON.stringify(state.camera));
                break;
            case 'powerbank':
                localStorage.setItem('PowerBank', JSON.stringify(state.powerbank));
                break;
            case 'airpods':
                localStorage.setItem('AirPods', JSON.stringify(state.airpods));
                break;
            case 'keyboard':
                localStorage.setItem('KeyBoard', JSON.stringify(state.keyboard));
                break;
            default:
                window.alert('category no found')
        }
    },

    // UPDATE PRODUCT 
    m_UpdateProduct(state, {
        category,
        index,
        prdUpdate
    }) {

        let prdAfterupdt = state[category][index]
        prdAfterupdt.name = prdUpdate.name
        prdAfterupdt.price = prdUpdate.price
        prdAfterupdt.quantity = prdUpdate.quantity
        prdAfterupdt.description = prdUpdate.description

        switch (category) {
            case 'smartwatch':
                localStorage.setItem('SmartWatch', JSON.stringify(state.smartwatch));
                break;
            case 'camera':
                localStorage.setItem('Camera', JSON.stringify(state.camera));
                break;
            case 'powerbank':
                localStorage.setItem('PowerBank', JSON.stringify(state.powerbank));
                break;
            case 'airpods':
                localStorage.setItem('AirPods', JSON.stringify(state.airpods));
                break;
            case 'keyboard':
                localStorage.setItem('KeyBoard', JSON.stringify(state.keyboard));
                break;
            default:
                window.alert('category no found')
        }
    },

    // ADD STOCK
    m_addStock(state, {
        category,
        index,
        number
    }) {
        let prdAddStock = state[category][index]
        prdAddStock.quantity = Number(prdAddStock.quantity) + Number(number)
        // console.log(`this is module ${category} and ${index} and number${number}`)
        switch (category) {
            case 'smartwatch':
                localStorage.setItem('SmartWatch', JSON.stringify(state.smartwatch));
                break;
            case 'camera':
                localStorage.setItem('Camera', JSON.stringify(state.camera));
                break;
            case 'powerbank':
                localStorage.setItem('PowerBank', JSON.stringify(state.powerbank));
                break;
            case 'airpods':
                localStorage.setItem('AirPods', JSON.stringify(state.airpods));
                break;
            case 'keyboard':
                localStorage.setItem('KeyBoard', JSON.stringify(state.keyboard));
                break;
            default:
                window.alert('category no found')
        }
    },
    // SUBTRACT FROM STOCK
    m_SubtractFromStock(state, {
        category,
        index,
        number
    }) {
        let prdAddStock = state[category][index]
        prdAddStock.quantity = Number(prdAddStock.quantity) - Number(number)
        // console.log(`this is module ${category} and ${index} and number${number}`)
        switch (category) {
            case 'smartwatch':
                localStorage.setItem('SmartWatch', JSON.stringify(state.smartwatch));
                break;
            case 'camera':
                localStorage.setItem('Camera', JSON.stringify(state.camera));
                break;
            case 'powerbank':
                localStorage.setItem('PowerBank', JSON.stringify(state.powerbank));
                break;
            case 'airpods':
                localStorage.setItem('AirPods', JSON.stringify(state.airpods));
                break;
            case 'keyboard':
                localStorage.setItem('KeyBoard', JSON.stringify(state.keyboard));
                break;
            default:
                window.alert('category no found')
        }
    }
}

let actions = {
    // ADD PRODUCT
    ac_addproduct({
        commit
    }, {
        category,
        newprd
    }) {
        commit('m_addproduct', {
            category,
            newprd
        })

    },

    // REMOVE PRODUCT
    ac_Removeproduct({
        commit
    }, {
        category,
        index
    }) {
        commit('m_Removeproduct', {
            category,
            index
        })
    },

    // UPDATE PRODUCT 
    ac_UpdateProduct({
        commit
    }, {
        category,
        index,
        prdUpdate
    }) {
        commit('m_UpdateProduct', {
            category,
            index,
            prdUpdate
        })
    },

    // ADD STOCK
    ac_addStock({
        commit
    }, {
        category,
        index,
        quantity,
        number
    }) {
        commit('m_addStock', {
            category,
            index,
            quantity,
            number
        })
    },

    // SUBTRACT FROM STOCK
    ac_SubtractFromStock({
        commit
    }, {
        category,
        index,
        number
    }) {
        commit('m_SubtractFromStock', {
            category,
            index,
            number
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}