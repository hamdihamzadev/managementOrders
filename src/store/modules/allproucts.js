let state = {
    smartwatch:JSON.parse(localStorage.getItem('All Products')).smartwatch,
    camera: JSON.parse(localStorage.getItem('All Products')).camera,
    powerbank: JSON.parse(localStorage.getItem('All Products')).powerbank,
    airpods: JSON.parse(localStorage.getItem('All Products')).airpods,
    keyboard: JSON.parse(localStorage.getItem('All Products')).keyboard
}


let mutations = {

    // ADD PRODUCT
    m_addproduct(state, {
        category,
        product
    }) {
        state[category].push(product)
    },


    // REMOVE PRODUCT
    m_Removeproduct(state, {
        category,
        date
    }) {
        state[category]=state[category].filter(product=>{
            return product.date!==date
        })
    },

    // EDIT PRODUCT 
    m_EditProduct(state, {
        category,
        index,
        EditedProduct
    }) {

        let prdBeforeEdit = state[category][index]
        prdBeforeEdit.name = EditedProduct.name
        prdBeforeEdit.price = EditedProduct.price
        prdBeforeEdit.quantity = EditedProduct.quantity
        prdBeforeEdit.description = EditedProduct.description
    },

    // ADD STOCK
    m_addStock(state, {
        category,
        index,
        number
    }) {
        let prdAddStock = state[category][index]
        prdAddStock.quantity = Number(prdAddStock.quantity) + Number(number)
    },
    // SUBTRACT FROM NEWORDER
    m_SubtractQuantity(state, {
        category,
        date,
        number

    }) {
        let product=state[category].find(order=>order.date===date)
        product.quantity=Number(product.quantity) - Number(number)
        
    },
    // SUBTRACT FROM STOCK
    m_SubtractFromStock(state, {
        category,
        index,
        number

    }) {
        let prdAddStock = state[category][index]
        prdAddStock.quantity = Number(prdAddStock.quantity) - Number(number)
        
    }
}

let actions = {
    // ADD PRODUCT
    ac_addproduct({
        commit,
        state
    }, {
        category,
        product
    }) {
        commit('m_addproduct', {
            category,
            product
        })
        localStorage.setItem('All Products',JSON.stringify(state));

    },

    // REMOVE PRODUCT
    ac_Removeproduct({
        commit
    }, {
        category,
        date
    }) {
        commit('m_Removeproduct', {
            category,
            date
        })
        localStorage.setItem('All Products',JSON.stringify(state));
    },

    // UPDATE PRODUCT 
    ac_EditProduct({
        commit,
        state
    }, {
        category,
        index,
        EditedProduct
    }) {
        commit('m_EditProduct', {
            category,
            index,
            EditedProduct
        })

        localStorage.setItem('All Products',JSON.stringify(state));
    },

    // ADD STOCK
    ac_addStock({
        commit,
        state
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

        localStorage.setItem('All Products',JSON.stringify(state));
    },

    // SUBTRACT FROM STOCK
    ac_SubtractQuantity({
        commit,
        state
    }, {
        category,
        date,
        number
        
    }) {
        commit('m_SubtractQuantity', {
            category,
            date,
            number
            
        })
        localStorage.setItem('All Products',JSON.stringify(state));
    },

    ac_SubtractFromStock({commit,state},{category,index,number}){
        commit('m_SubtractFromStock',{category,index,number})
        localStorage.setItem('All Products',JSON.stringify(state));
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}



