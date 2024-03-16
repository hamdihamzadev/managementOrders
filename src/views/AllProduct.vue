<template>
    <section class="allproduts">
        <b-container>
            <div class="row">
                <h1 class="col text-center fw-bolder">All products</h1>
            </div>
            <div class="d-flex justify-content-between mt-5">
                <!----- SEARCH INPUT ----->
                <SearchTable />
                <!----- add prduct ----->
                <AddProduct ref="componentAddprd" />
            </div>
            <p class="mb-0 mt-5 cursor" @click="deleteprdselectd">
                <b-icon icon="trash"></b-icon> Delete ({{NbrPrdDelete}})
            </p>

            <!----- TABLE PRODUCT ----->
            <b-table striped hover :items="items" :fields="fields" class="mt-2" sort-icon-left id="my-table"
                :per-page="perPage" :current-page="currentPage">

                <template #cell(Checked)="dataSelected">
                    <b-form-checkbox id="checkbox-1" name="checkbox-1" value="accepted" unchecked-value="not_accepted"
                        @change="selectBox($event,dataSelected.item,dataSelected.index)">
                    </b-form-checkbox>
                </template>
                <template #cell(Action)="data">
                    <select class="form-select" aria-label="Select an action" v-model="Choose"
                        @change="handleActionChange($event,data.item,data.index)">
                        <option selected>Choose...</option>
                        <option value="edit">Edit</option>
                        <option value="delete">Delete</option>
                    </select>
                </template>
            </b-table>

            <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table">
            </b-pagination>

        </b-container>

    </section>
</template>

<script>
    import AddProduct from '../views/products/AddProducts.vue'
    import SearchTable from '../components/SearchTable.vue'
    import {
        mapState,
        mapActions
    } from 'vuex'


    export default {
        name: 'AllProducts',
        components: {
            AddProduct,
            SearchTable
        },
        data() {
            return {
                fields: ['Checked', 'Name', 'Price', 'Category', 'Quantity', 'Action'],
                Choose: 'Choose...',
                nameInput: '',
                perPage: 10,
                currentPage: 1,
                NbrPrdDelete: 0,
                allPrdDelete: [],

            }

        },

        computed: {
            ...mapState('ProductsModule', {
                productModuleStates: state => state
            }),

            items() {
                let items = []
                for (const Namecategory in this.productModuleStates) {
                    this.productModuleStates[Namecategory].forEach(prd => {
                        let objprd = {
                            Name: prd.name,
                            Price: prd.price,
                            Category: Namecategory,
                            Quantity: prd.quantity,
                            ref:prd.ref
                        }
                        items.push(objprd)
                    })
                }
                items.sort((prdA,prdB)=>{return prdA.ref-prdB.ref})
                return items
            },

            rows() {
                return this.items.length
            }


        },

        methods: {
            ...mapActions('ProductsModule', ['ac_addproduct', 'ac_Removeproduct']),

            getAllprdinLocal() {

                let allProductsLocal = JSON.parse(localStorage.getItem('All Products'))
                let numbersProductlocal= Object.values(allProductsLocal).reduce((accu,table)=>{
                    return accu+table.length
                },0)
                let numbersProductStore= Object.values(this.productModuleStates).reduce((accu,table)=>{
                    return accu+table.length
                },0)

                if (allProductsLocal && numbersProductlocal>numbersProductStore){
                    for(const Namecategory in allProductsLocal){
                        allProductsLocal[Namecategory].forEach(product=>{
                            this.ac_addproduct({category:Namecategory,product:product})
                        })
                    }
                }
            },

            handleActionChange(event, item) {
                if (event.target.value === 'delete') {
                    this.productModuleStates[item.Category].forEach((prd, index) => {
                        if (prd.name === item.Name && prd.price === item.Price && prd.quantity === item
                            .Quantity) {
                            this.ac_Removeproduct({
                                category: item.Category,
                                index: index
                            })
                            this.Choose = 'Choose...'
                        }
                    })
                } else if (event.target.value === 'edit') {
                    this.$bvModal.show('modalAddproduct')
                    this.productModuleStates[item.Category].forEach((prd, index) => {
                        if (prd.name === item.Name && prd.price === item.Price && prd.quantity === item
                            .Quantity) {
                            this.$refs.componentAddprd.editeProduct(prd, item.Category, index)
                            this.Choose = 'Choose...'

                        }
                    })
                }
            },

            selectBox(event, item) {

                if (event === 'accepted') {
                    this.NbrPrdDelete = this.NbrPrdDelete + 1
                    this.allPrdDelete.push(item)
                } else if (event === 'not_accepted') {
                    this.NbrPrdDelete = this.NbrPrdDelete - 1
                    this.allPrdDelete.forEach((prd, index) => {
                        prd.Name === item.Name && prd.Price === item.Price && prd.Quantity === item.Quantity ?
                            this.allPrdDelete.splice(index, 1) : ''
                    })
                }

            },

            deleteprdselectd() {
                // array ==> objrct index and category ==> 
                let textConirmation = this.NbrPrdDelete === 1 ? 'Are you sure you want to delete this product ?' :
                    'Are you sure you want to delete these products ?'
                let allprdremove = []
                this.allPrdDelete.forEach(item => {
                    this.productModuleStates[item.Category].forEach((prd, index) => {
                        if (prd.name === item.Name && prd.price === item.Price && prd.quantity === item
                            .Quantity) {
                            let prddelete = {
                                Category: item.Category,
                                index: index
                            }
                            allprdremove.push(prddelete)
                            allprdremove[0].Category
                        }

                    })
                })

                if (confirm(textConirmation) === true) {
                    allprdremove.forEach(product => {
                        this.ac_Removeproduct({
                            category: product.Category,
                            index: product.index
                        })
                    })
                }


                // RESTE ALL CHECKBOX
                let allSelectBox = Array.from(this.$el.querySelectorAll('#checkbox-1'))
                allSelectBox.forEach(selc => {
                    selc.checked = false
                })
                // RESTE NUMBERS PRDOCUT SELECTED IN 0
                this.NbrPrdDelete = 0
            }
        },

        mounted() {
            this.getAllprdinLocal()
            let items=[]
            Object.values(this.productModuleStates).forEach(table => {
                table.length > 0 ? table.forEach(product => {
                    items.push(product)
                }) : ''
            })

            console.log(items)
        }
    }
</script>


<style>
    .allproduts {
        margin-top: 23px;
    }

    #btn-addprd {
        width: 18%;
        height: 37px;
        color: white;
        border: none;
        border-radius: 6px;
        width: 16%;
        height: 37px;
        display: flex;
        align-items: center;
        justify-content: center;

    }

    .cursor {
        cursor: pointer;
    }
</style>