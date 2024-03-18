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
                        <b-form-select v-model="Product" class="w-100" id="select-product" :options="options" required>
                        </b-form-select>
                    </b-form-group>

                    <b-form-group class="col-6 mb-4 mt-4" id="input-price" label="Price:" label-for="input-1">
                        <b-form-input v-model="Price" id="input-1" type="number" placeholder="Enter price product"
                            required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group class="col-6 mb-4 mt-4" id="input-price" label="Quantity:" label-for="input-1">
                        <b-form-input v-model="Quantity" id="input-1" type="number" placeholder="Enter Quantity product"
                            required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group class="col-12 mb-4" id="input-price" label="Total:" label-for="input-1">
                        <b-form-input v-model="Total" id="input-1" type="number" placeholder="Total order" required>
                        </b-form-input>
                    </b-form-group>

                    <div>
                        <b-button class="w-100 mt-4 " variant="primary" id="btn-addprd" @click="addOrder">
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
                Customer:'',
                Phone:'',
                City:'',
                Adress:'',
                Price:'',
                Quantity:'',
                Product:''
            };
        },

        computed: {
            ...mapState('ProductsModule', {
                productModuleStates: state => state
            }),

            options(){
                let products=[]
                for(const category in this.productModuleStates){
                    this.productModuleStates[category].forEach(product=>{
                        let option={value:{category:category,order:'',nameProduct:product.name}, text:`${product.name} - ${product.price}$` }
                        products.push(option)
                    })
                }
                return products
            },

            Total(){
                let calctotal=this.Price * this.Quantity
                return calctotal
            },

            date(){

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


            
        },

        methods: {
            ...mapActions('NewOrders', ['m_addNewOrder']),
            ...mapActions('ProductsModule', ['ac_addproduct']),
            addOrder() {
                let newOrder = {

                    Customer: this.Customer,
                    phone: this.Phone,
                    city: this.City,
                    address: this.Adress,
                    product: this.Product.nameProduct,
                    price: this.Price,
                    quantity:this.Quantity,
                    total: this.Total,
                    date: this.date,

                }

                this.Product.order=newOrder
                this.ac_orderConfirmed(this.Product)
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

    #form {
        background-color: var(--couleur-primaire-1);
        border-radius: 12px;
    }
</style>