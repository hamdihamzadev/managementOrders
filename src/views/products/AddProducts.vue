<template>
    <div>
        <!----- add prduct ----->
        <b-button class="w-100 " variant="primary" id="btn-addprd" v-b-modal.modalAddproduct>
            <b-icon icon="plus" font-scale="2"></b-icon>Add product
        </b-button>
        <!---------- SHOW POPUP --------------->

        <b-modal id="modalAddproduct" ref="modalPostpond" title="Create your product" :ok-title="okbtn" @ok="addproduct"
            @hide="onModalHide">
            <form ref="form">
                <div class="row">
                    <b-form-group class="col-6 mb-4" id="input-name" v-model="name" label="Name:" label-for="input-1">
                        <b-form-input v-model="name" id="input-1" type="text" placeholder="Enter name product" required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group class="col-6 mb-4" id="input-category" label="Category:" label-for="selectCategory">
                        <b-form-select v-model="category" class="w-100" id="selectCategory" :options="optionsCategory"
                            required>
                        </b-form-select>
                    </b-form-group>

                    <b-form-group class="col-12 mb-4" id="input-price" label="Price:" label-for="input-1">
                        <b-form-input v-model="price" id="input-1" type="number" placeholder="Enter Price product"
                            required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group class="col-12 mb-4" id="input-quantity" label="Quantity:" label-for="input-4">
                        <b-form-input v-model="quantity" id="input-4" type="number" placeholder="Enter Quantity product"
                            required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group label="Description" class="col-12">
                        <b-form-textarea v-model="description" id="textarea-auto-height"
                            placeholder="Auto height textarea" rows="3" max-rows="8"></b-form-textarea>
                    </b-form-group>

                </div>

            </form>
        </b-modal>

    </div>
</template>

<script>
    import {
        mapState,
        mapActions
    } from 'vuex';
    export default {
        name: 'AddProduct',
        data() {
            return {
                name: '',
                price: '',
                category: '',
                quantity: '',
                description: '',
                okbtn: 'Send',
                indexEditedProduct: '',
            }
        },

        computed: {
            ...mapState('ProductsModule', {
                productModuleStates: state => state
            }),

            optionsCategory() {
                let optionctgs = []
                for (const ctg in this.productModuleStates) {
                    optionctgs.push(ctg)
                }
                return optionctgs
            }
        },

        methods: {
            ...mapActions('ProductsModule', ['ac_addproduct', 'ac_EditProduct']),

            addproduct(bvModalEvent) {
                if (this.name !== '' && this.price !== '' && this.quantity !== '' && this.description !== '') {
                    this.okbtn === 'Send' ? this.addprd() : this.okbtn === 'Edit' ? (this.EditPrd(), this.okbtn =
                        'Send') : ''
                    this.name = this.price = this.quantity = this.description = ''
                    this.okbtn = 'Send'
                } else {
                    bvModalEvent.preventDefault()
                }

            },

            addprd() {

                let newdate = new Date();
                let year = newdate.getFullYear().toString()
                let month = (newdate.getMonth() + 1).toString()
                let day = newdate.getDate()
                let hour = newdate.getHours().toString()
                let munite = newdate.getMinutes().toString()
                let seconde = newdate.getSeconds().toString()

                let date = `${year}-${month}-${day} ${hour}:${munite}:${seconde}`
                let objnewprd = {
                    name: this.name,
                    price: this.price,
                    quantity: this.quantity,
                    description: this.description,
                    date: date
                }

                this.ac_addproduct({
                    category: this.category,
                    product: objnewprd
                })

            },
            EditPrd() {
                let product = {
                    name: this.name,
                    price: this.price,
                    quantity: this.quantity,
                    description: this.description
                }

                this.ac_EditProduct({
                    category: this.category,
                    index: this.indexEditedProduct,
                    EditedProduct: product
                })

            },

            onModalHide() {
                this.okbtn = 'Send'
                this.name = this.price = this.quantity = this.description = ''
            },

            editeProduct(prd, catg, index) {

                this.indexEditedProduct = index
                this.name = prd.name
                this.price = prd.price
                this.quantity = prd.quantity
                this.description = prd.description
                this.category = catg
                this.okbtn = 'Edit'

            }
        },
    }
</script>

<style scoped>
    #selectCategory {
        height: 37px;
    }
</style>