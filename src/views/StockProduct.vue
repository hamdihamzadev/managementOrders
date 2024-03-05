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
                <div class="mt-5" v-for="prd in ShowProductStock" :key="prd.id">
                    <div id="productStock" class="row d-flex align-items-center">
                        <div id="title" class="col-2">
                            <h6 class="mb-1"> {{ prd.name }} </h6>
                            <p> <strong>{{ prd.currentQuantity }}</strong> available</p>
                        </div>
                        <div id="title" class="col-9">
                            <b-progress :value="prd.QuantityInPercentage" :max="max" show-progress class="mb-3"
                                :variant=prd.variant :label="`${prd.QuantityInPercentage}%`">
                            </b-progress>
                        </div>
                        <div id="action" class="col-1">
                            <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
                                <template #button-content>
                                    <i class='bx bx-dots-horizontal-rounded'></i>
                                </template>
                                <b-dropdown-item href="#" @click="showModalStock(prd.category,prd.index)">Add stock
                                </b-dropdown-item>
                                <b-dropdown-item href="#">Remove product</b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </div>
                    <hr>
                </div>

            </div>


            <b-modal id="modal-addStock" ref="modal" title="Add stock" @hidden="resetModal" @ok="addStock"
                :ok-title="Send">
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
import CardNeworders from './NewOrders/CardNeworders.vue'

    export default {
        name: 'StockProduct',
        data() {
            return {
                max: 100,
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
                Send: 'Add Stock'
            }
        },

        computed: {
            ...mapState('ProductModule', {
                productModuleStates: state => state
            }),

            getProductStock() {

                let allProducts = []
                for (const key in this.productModuleStates) {
                    this.productModuleStates[key].forEach((product, index) => {

                        // CALC PROGRSSE STOCK
                        let currentQuantity = product.quantity - 40
                        let QuantityInPercentage = (product.quantity - 40) / product.quantity * 100
                        let productObject = {
                            name: product.name,
                            currentQuantity,
                            QuantityInPercentage,
                            index: index,
                            category: key,
                            quantity: product.quantity,
                            variant: this.getProgressVariant(QuantityInPercentage)
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
                            return Math.round(product.QuantityInPercentage) >= 75
                        })
                        break;

                    case 'Acceptable':
                        result = this.getProductStock.filter(product => {
                            return Math.round(product.QuantityInPercentage) >= 45
                        })
                        break;

                    case 'Faible':
                        result = this.getProductStock.filter(product => {
                            return Math.round(product.QuantityInPercentage) >= 10
                        })
                        break;

                    case 'Épuisé':
                        result = this.getProductStock.filter(product => {
                            return Math.round(product.QuantityInPercentage) < 10
                        })
                        break;
                    default:
                        result = this.getProductStock

                }
                return result
            }

        },

        methods: {
            ...mapActions('ProductModule', ['ac_addproduct', 'ac_addStock']),
            testarray() {
                console.log(this.stockProduct)
            },

            getAllprdinLocal() {

                // PRODUCTS SMART WATCH
                let smartwatchSave = JSON.parse(localStorage.getItem('SmartWatch'))
                let StateSmartWatch = this.productModuleStates.smartwatch
                smartwatchSave && smartwatchSave.length > StateSmartWatch.length ? smartwatchSave.forEach(prd => {
                    this.ac_addproduct({
                        category: 'smartwatch',
                        newprd: prd
                    })
                }) : ''

                // // PRODUCTS CAMERA
                let CameraSave = JSON.parse(localStorage.getItem('Camera'))
                let StateCamera = this.productModuleStates.camera
                CameraSave && CameraSave.length > StateCamera.length ? CameraSave.forEach(prd => {
                    this.ac_addproduct({
                        category: 'camera',
                        newprd: prd
                    })
                }) : ''

                // // PRODUCTS POWER BANK
                let PowerbankSave = JSON.parse(localStorage.getItem('PowerBank'))
                let StatePowerbank = this.productModuleStates.powerbank
                PowerbankSave && PowerbankSave.length > StatePowerbank.length ? PowerbankSave.forEach(prd => {
                    this.ac_addproduct({
                        category: 'powerbank',
                        newprd: prd
                    })
                }) : ''

                // // PRODUCTS AIRPODS
                let AirPodsSave = JSON.parse(localStorage.getItem('AirPods'))
                let StateAirPods = this.productModuleStates.airpods
                AirPodsSave && AirPodsSave.length > StateAirPods.length ? AirPodsSave.forEach(prd => {
                    this.ac_addproduct({
                        category: 'airpods',
                        newprd: prd
                    })
                }) : ''


                // // PRODUCTS KEYBOARD
                let KeyBoardSave = JSON.parse(localStorage.getItem('KeyBoard'))
                let StateKeyBoard = this.productModuleStates.keyboard
                KeyBoardSave && KeyBoardSave.length > StateKeyBoard.length ? KeyBoardSave.forEach(prd => {
                    this.ac_addproduct({
                        category: 'keyboard',
                        newprd: prd
                    })
                }) : ''

            },

            showModalStock(category, index) {
                this.$bvModal.show('modal-addStock')
                this.categoryPrdStock = category
                this.indexPrdStock = index
            },

            addStock() {

                if(this.InputStock.includes(',') || this.InputStock.includes('.') || this.InputStock.includes('+') || this.InputStock.includes('-')){
                    console.log('yes')
                }else{
                    console.log('no')
                    console.log(this.InputStock)
                    
                }

        

                // if (this.InputStock.length === 0) {
                //     event.preventDefault()
                //     this.stateInputStock = false
                //     this.msgInvalidInput = 'This field is required'

                // } else if (String(this.indexPrdStock).includes(',') ) {
                //     event.preventDefault()
                //     this.stateInputStock = false
                //     this.msgInvalidInput = 'Please enter a valid whole number without +-.,*/ '
                // } else {

                //     this.ac_addStock({
                //         category: this.categoryPrdStock,
                //         index: this.indexPrdStock,
                //         number: this.InputStock
                //     })
                //     // this.InputStock = ''
                //     this.stateInputStock = null
                // }

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


        },



        mounted() {
            this.getAllprdinLocal()

        }
    }
</script>

<style scoped>
    #stock-con {
        background: #14142d;
        margin-inline: 3px;
        border-radius: 24px;
        padding-inline: 20px;
        padding-top: 39px;
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
</style>