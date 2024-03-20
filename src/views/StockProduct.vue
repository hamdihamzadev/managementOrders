<template>
    <div class="stock">
        <b-container>
            <div class="row" id="stock-con">
                <h1 class="col text-center fw-bolder">Stock Products</h1>
                <div class="d-flex justify-content-between mt-5">
                    <!----- SEARCH INPUT ----->
                    <b-form-input id="search-input" type="search" placeholder="Search product " @input="searchprd">
                    </b-form-input>
                    <!----- FILTER INPUT ----->

                    <b-form-select size="sm" id="input-filter" :options="optionsFilter" v-model="selected">
                    </b-form-select>

                </div>
                <div class="mt-5" v-for="prd in ShowProductStock" :key="prd.id" id="stockProduct">
                    <div id="productStock" class="row d-flex align-items-center">
                        <div id="title" class="col-2">
                            <h6 class="mb-1"> {{ prd.name }} </h6>
                            <p> <strong> {{ prd.quantity }}</strong></p>
                        </div>
                        <div id="title" class="col-9">
                            <b-progress :value="prd.quantity" :max="max" show-progress class="mb-3"
                                :variant=prd.variant  >
                            </b-progress>
                        </div>
                        <div id="action" class="col-1">
                            <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret
                                v-model="drop">
                                <template #button-content>
                                    <i class='bx bx-dots-horizontal-rounded'></i>
                                </template>
                                <b-dropdown-item href="#" @click="showModalStock('add',prd.category,prd.index)"> <span
                                        id="icon-action">+</span> Add to
                                    stock
                                </b-dropdown-item>
                                <b-dropdown-item href="#" @click="showModalStock('Subtract',prd.category,prd.index)">
                                    <span id="icon-action">-</span> Subtract from stock</b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </div>
                    <hr>
                </div>

            </div>


            <b-modal id="modal-addStock" ref="modal" title="Add stock" @hidden="resetModal" @ok="addStock"
                :ok-title="BtnModal">
                <form ref="form">
                    <b-form-group label="Please add the quantity to your stock" label-for="name-input"
                        :invalid-feedback="msgInvalidInput" :state="stateInputStock">
                        <b-form-input id="name-input" v-model="InputStock" :state="stateInputStock" type="number"
                            required></b-form-input>
                    </b-form-group>
                </form>
            </b-modal>
        </b-container>
    </div>
</template>

<script>
    import {
        mapState,
        mapActions
    } from 'vuex'


    export default {
        name: 'StockProduct',
        data() {
            return {
                max: 100,
                valuepo:50,
                selected: 'All products',
                msgInvalidInput: '',
                optionsFilter: [{
                        value: 'All products',
                        text: 'All products'
                    },

                    {
                        value: 'Suffisant',
                        text: 'Suffisant'
                    },
                    {
                        value: 'Acceptable',
                        text: 'Acceptable'
                    },
                    {
                        value: 'Faible',
                        text: 'Faible'
                    },
                    {
                        value: 'Épuisé',
                        text: 'Épuisé'
                    },

                ],
                stateInputStock: null,
                InputStock: '',
                categoryPrdStock: '',
                indexPrdStock: '',
                Send: 'Add Stock',
                ActionDropdown: ''
            }
        },

        computed: {

            ...mapState('ProductsModule', {
                productModuleStates: state => state
            }),
            ...mapState('allOrder', {
                storeAllNewOrders: state => state.new
            }),

            getProductStock() {

                let allProducts = []
                for (const key in this.productModuleStates) {
                    this.productModuleStates[key].forEach((product, index) => {

                        // CALC PROGRSSE STOCK
                        let productObject = {
                            name: product.name,
                            quantity: product.quantity,
                            index: index,
                            category: key,
                            variant: this.getProgressVariant(product.quantity)
                        }

                        allProducts.push(productObject)
                    })
                }
                return allProducts
           
            },


            ShowProductStock() {
                let result
                switch (this.selected) {
                    case 'Suffisant':
                        result = this.getProductStock.filter(product => {
                            return Math.round(product.quantity) >= 75
                        })
                        break;

                    case 'Acceptable':
                        result = this.getProductStock.filter(product => {
                            return Math.round(product.quantity) >= 45 && Math.round(product
                                .quantity) < 75
                        })
                        break;

                    case 'Faible':
                        result = this.getProductStock.filter(product => {
                            return Math.round(product.quantity) >= 10 && Math.round(product
                                .quantity) < 45
                        })
                        break;

                    case 'Épuisé':
                        result = this.getProductStock.filter(product => {
                            return Math.round(product.quantity) < 10
                        })
                        break;
                    default:
                        result = this.getProductStock

                }
                return result
            },

            BtnModal() {
                if (this.ActionDropdown === 'add') {
                    return 'Add'
                } else {
                    return 'Subtract'
                }
            }
        },

        methods: {
            ...mapActions('ProductsModule', ['ac_addproduct', 'ac_addStock', 'ac_SubtractFromStock']),
    
            showModalStock(action, category, index) {
                this.$bvModal.show('modal-addStock')
                this.categoryPrdStock = category
                this.indexPrdStock = index
                this.ActionDropdown = action
            },

            addStock(event) {

                if (this.InputStock.includes(',') || this.InputStock.includes('.') || this.InputStock.includes('+') ||
                    this.InputStock.includes('-')) {
                    event.preventDefault()
                    this.stateInputStock = false
                    this.msgInvalidInput = 'Please enter a valid whole number without +-.,*/ '
                } else if (this.InputStock.length === 0) {
                    event.preventDefault()
                    this.stateInputStock = false
                    this.msgInvalidInput = 'This field is required'

                } else if (this.ActionDropdown === 'add') {

                    this.ac_addStock({
                        category: this.categoryPrdStock,
                        index: this.indexPrdStock,
                        number: this.InputStock
                    })
                    this.InputStock = ''
                    this.stateInputStock = null

                } else {
                    this.ac_SubtractFromStock({
                        category: this.categoryPrdStock,
                        index: this.indexPrdStock,
                        number: this.InputStock
                    })
                    this.InputStock = ''
                    this.stateInputStock = null
                }

            },

            getProgressVariant(valueProgres) {
                if (valueProgres >= 90) {
                    return 'success';
                } else if (valueProgres >= 70) {
                    return 'primary';
                } else if (valueProgres >= 50) {
                    return 'warning';
                } else {
                    return 'danger';
                }
            },

            searchprd(value) {
                let Products = Array.from(this.$el.querySelectorAll('#stockProduct'))
                Products.forEach(prd => {
                    let nameProduct = Array.from(Array.from(prd.children)[0].children)[0].firstChild.textContent
                        .toLowerCase()
                    prd.style.display = nameProduct.includes(value.toLowerCase()) ? '' : 'none'
                })
            }
        },

      


    }
</script>

<style scoped>

    .stock {
        padding-top: 23px;
        padding-bottom: 23px;
    }

    #stock-con {
        background: #14142d;
        margin-inline: 3px;
        border-radius: 24px;
        padding-inline: 20px;
        padding-top: 39px;
        padding-bottom: 39px;
       
    }

    #action {
        position: relative;
    }

    .dropdown {
        position: absolute;
        right: -6px;
        top: -29px;
    }

    #input-filter {
        width: 18%;
        height: 37px;
        background: var(--couleur-primaire-4);
        color: white;
        border: none;
        border-radius: 6px;
        width: 16%;
        height: 32px;
    }

    #search-input {
        width: 20%;
        height: 37px;
        background: transparent;
        border-color: var(--couleur-primaire-2);
    }

    #search-input::placeholder {
        color: var(--couleur-primaire-2);
    }

    #search-input:focus {
        color: white;
        box-shadow: none;
        border-color: var(--couleur-primaire-3);
    }

    hr {
        width: calc(100% - 24px);
        margin: auto;
        border: 1px solid #365cf5;
        border-radius: 26px;
    }

    .success {
        background-color: green;
    }

    .warning {
        background-color: yellow;
    }

    #icon-action {
        font-size: 20px;
        margin-right: 8px;
    }
</style>