<template>
    <div class="p-3" id="top-category">
        <div class="d-flex justify-content-between mt-5 mb-5">
            <h5>Top Category</h5>
            <b-form-select v-model="selected" :options="options" id="select-mois"></b-form-select>
        </div>
        <p>The top categories have over <strong>200 orders</strong> for the month</p>
        <b-table striped hover :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc">
            <template #cell(Percentage)="data">
                <b-progress :max="max">
                    <b-progress-bar :value="data.item.Percentage" :label="`${data.item.Percentage}%`">
                    </b-progress-bar>
                </b-progress>
            </template>
        </b-table>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex';
    export default {
        name: 'TopCategory',
        data() {
            return {
                options: [{
                        value: 'January',
                        text: 'January'
                    },
                    {
                        value: 'February',
                        text: 'February'
                    },
                    {
                        value: 'March',
                        text: 'March'
                    },
                    {
                        value: 'April',
                        text: 'April'
                    },
                    {
                        value: 'May',
                        text: 'May'
                    },
                    {
                        value: 'June',
                        text: 'June'
                    },
                ],
                fields: [{
                        key: 'Name',
                        sortable: false
                    },
                    {
                        key: 'Orders',
                        sortable: true
                    },
                    {
                        key: 'Percentage',
                        sortable: false
                    },

                    {
                        key: 'Revenue',
                        sortable: true
                    },


                ],
                selected: 'January',
                max: 100,
                sortBy:'Orders',
                sortDesc:true
            }

            /**
             * if ===> orders >200 ===> push in objet and array
             * 
             */

        },

        computed: {

            // STORE NEW ORDERS
            ...mapState('DelivredOrders', {
                storeOrdersDelivred: state => state
            }),

            items() {
                let allCategory = []
                let allOrders=Object.values(this.storeOrdersDelivred).reduce((accu,table)=>{return accu+table.length},0)
                for (const category in this.storeOrdersDelivred) {

                    if(this.storeOrdersDelivred[category].length>=2){
                        let numbesOrders=this.storeOrdersDelivred[category].length
                        
                        let objectCategory = {
                        Name: category,
                        Orders: numbesOrders,
                        Percentage:  Math.round(numbesOrders/allOrders*100) ,
                        Revenue: `${this.storeOrdersDelivred[category].reduce((accu, order) => {
                            return accu + order.total
                        }, 0)} $`
                    }
                    allCategory.push(objectCategory)
                    
                    }
                }

                return allCategory
            }
        },

    
    }
</script>


<style scoped>
    #top-category {
        background-color: var(--couleur-primaire-1)
    }

    #select-mois {
        width: 13%;
    }

    #icon-category {
        color: #14142d;
        background: white;
        margin-right: 7px;
        padding: 3px;
        border-radius: 3px;
    }
</style>