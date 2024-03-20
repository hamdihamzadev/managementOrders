<template>
    <section class="addOrder pb-5">

        <b-container>
            <h1 class="text-center mb-3"> <strong>Add new order</strong> </h1>
            <form id="form" class="p-4">
                <div class="row">
                    <b-form-group class="col-6 mb-4" id="input-name" label="Customer:" label-for="input-1">
                        <b-form-input v-model="Customer" id="input-1" type="text"
                            placeholder="Exemple : Mohammed bakhti" required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group class="col-6 mb-4" id="input-price" label="Phone:" label-for="input-1">
                        <b-form-input v-model="Phone" id="input-1" type="number" placeholder="06 55 22 88 55" required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group class="col-6 mb-4" id="input-quantity" label="City:" label-for="input-4">
                        <b-form-input v-model="City" id="input-4" type="text" placeholder="Casablanca - rabat ..."
                            required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group class="col-6 mb-4" id="input-quantity" label="Adress:" label-for="input-4">
                        <b-form-input v-model="Adress" id="input-4" type="text"
                            placeholder="Exemple : blv hassan rue 18 n55" required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group class="col-12 mb-4" id="select-product" label="Product:" label-for="selectCategory">
                        <b-form-select v-model="ProductSelected" class="w-100" id="select-product" :options="options"
                            required>
                        </b-form-select>
                        
                    </b-form-group>
                    <p class="text-danger" v-show="stockout" >This product is out of stock</p>

                    <b-form-group class="col-6 mb-4 mt-4" id="input-price" label="Price:" label-for="input-1">
                        <b-form-input v-model="Price" id="input-1" type="number" placeholder="Enter price product"
                            disabled required>
                        </b-form-input>
                    </b-form-group>
                    <b-form-group class="col-6 mb-4 mt-4"  label="Quantity:" label-for="input-1">
                        <b-form-spinbutton  id="sb-quantity" v-model="Quantity" min="1" :max="ProductSelected.quantity"  style="height: 37px;"></b-form-spinbutton>
                    </b-form-group>
                   

                    <b-form-group class="col-12 mb-4" id="input-price" label="Total:" label-for="input-1">
                        <b-form-input v-model="Total" id="input-1" type="number" placeholder="Total order" required>
                        </b-form-input>
                    </b-form-group>

                    <div>
                        <b-button class="w-100 mt-4 " variant="primary" id="btn-addprd" @click="addOrder"
                            :disabled="stockout">
                            <b-icon icon="plus" font-scale="2"></b-icon>Add Order
                        </b-button>
                    </div>

                </div>

            </form>
        </b-container>

    </section>
</template>

<script>
    import {
        mapActions,
        mapState
    } from 'vuex';

    export default {
        name: 'AddOrder',
        data() {
            return {
                Customer: '',
                Phone: '',
                City: '',
                Adress: '',
                Quantity: 1,
                ProductSelected: '',
            };
        },

        computed: {
            ...mapState('ProductsModule', {
                productModuleStates: state => state
            }),

            options() {
                let products = [{
                    value: '',
                    text: 'Select Product...'
                }]
                for (const category in this.productModuleStates) {
                    this.productModuleStates[category].forEach(product => {
                        let option = {
                            value: {
                                category: category,
                                order: '',
                                name: product.name,
                                price: product.price,
                                date: product.date,
                                quantity: product.quantity
                            },
                            text: `${product.name} - ${product.price}$ - (${product.quantity})`
                        }
                        products.push(option)
                    })
                }

                return products
            },

            Price() {
                let priceProduct = this.ProductSelected.price
                return priceProduct
            },

            Total() {
                let calctotal = this.Price * this.Quantity
                return calctotal
            },

            date() {

                let newdate = new Date();
                let year = newdate.getFullYear().toString()
                let month = (newdate.getMonth() + 1).toString()
                let day = newdate.getDate()
                let hour = newdate.getHours().toString()
                let munite = newdate.getMinutes().toString()
                let seconde = newdate.getSeconds().toString()

                let date = `${year}-${month}-${day} ${hour}:${munite}:${seconde}`
                return date
            },


            stockout(){
                if (this.ProductSelected.quantity === 0  ) {
                    return true
                } else {
                    
                    return false
                }
            },

            disabledQuantity(){

                if( this.Quantity>=this.ProductSelected.quantity){
                    return true
                }else{
                    return false
                }
            }

        },

        methods: {
            ...mapActions('NewOrders', ['ac_addNewOrder']),
            ...mapActions('ProductsModule', ['ac_SubtractQuantity']),
            ...mapActions('allOrder', ['ac_addInAllOrder']),
            addOrder() {

                if (this.Customer !== '' && this.Phone !== '' && this.City !== '' && this.Adress !== '' && this
                    .Price !== '' && this.Quantity !== '' && this.Total !== '' && this.ProductSelected !== '') {
                    let Neworder = {
                        Customer: this.Customer,
                        phone: this.Phone,
                        city: this.City,
                        address: this.Adress,
                        product: this.ProductSelected.name,
                        price: this.Price,
                        quantity: this.Quantity,
                        total: this.Total,
                        date: this.date,
                    }

                    this.ProductSelected.order = Neworder

                    this.ac_addNewOrder({
                        category: this.ProductSelected.category,
                        order: this.ProductSelected.order
                    })

                    this.ac_addInAllOrder({
                        status: 'new',
                        order: this.ProductSelected.order
                    })

                    this.ac_SubtractQuantity({
                        category: this.ProductSelected.category,
                        date: this.ProductSelected.date,
                        number: this.Quantity
                    })

                    // RESET VALUES
                    this.reset()

                }

            },

            reset() {
                this.Customer = this.Phone = this.City = this.Adress = this.Price  = this.Total = this
                    .ProductSelected = ''
                     this.Quantity=1
            },

        },


    }
</script>

<style scoped>
    #btn-addorder {
        background-color: var(--couleur-primaire-4);
    }

    #select-product {
        height: 37px;
        border-radius: 0.375rem;
    }

    #sb-quantity{
        height: 37px;
        border-radius: 0.375rem;
    }

    #form {
        background-color: var(--couleur-primaire-1);
        border-radius: 12px;
    }
</style>