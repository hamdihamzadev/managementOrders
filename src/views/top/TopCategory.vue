<template>
    <div class="p-3" id="top-category">
        <div class="d-flex justify-content-between mt-5 mb-5">
            <h5>Top Category</h5>
            <b-form-select v-model="month" :options="options" id="select-mois" @change="ordersMonth"></b-form-select>
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
        <p class="text-center" v-show="items.length===0" ><strong>No orders in this month</strong></p>

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
                options: [
                    { value: '1', text: 'January' },
                    { value: '2', text: 'February' },
                    { value: '3', text: 'March' },
                    { value: '4', text: 'April' },
                    { value: '5', text: 'May' },
                    { value: '6', text: 'June' },
                    { value: '7', text: 'July' },
                    { value: '8', text: 'August' },
                    { value: '9', text: 'September' },
                    { value: '10', text: 'October' },
                    { value: '11', text: 'November' },
                    { value: '12', text: 'December' }
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
                month: '1',
                max: 100,
                sortBy: 'Orders',
                sortDesc: true,
                respo: ""
            }


        },

        computed: {

            // STORE NEW ORDERS
            ...mapState('DelivredOrders', {
                storeOrdersDelivred: state => state
            }),

            items() {
                let allCategory = []
                for (const category in this.ordersMonth) {

                    if (this.ordersMonth[category].length >= 2) {
                        let numbesOrders = this.ordersMonth[category].length

                        let objectCategory = {
                            Name: category,
                            Orders: numbesOrders,
                            Percentage: Math.round(numbesOrders / this.numbOrders * 100),
                            Revenue: `${this.ordersMonth[category].reduce((accu, order) => {
                            return accu + order.total
                        }, 0)} $`
                        }

                        allCategory.push(objectCategory)

                    }
                }

                return allCategory
            },

            ordersMonth() {
                let orders = {}
                for(const categoryKey in this.storeOrdersDelivred){
                    let filterOrder=this.storeOrdersDelivred[categoryKey].filter(order=>{
                        return order.date.split('/')[1]===this.month
                    })
                    Object.defineProperty(orders,categoryKey,{
                        value:filterOrder,
                        writable:true,
                        enumerable: true,
                        configurable: true
                    })
                }
                return orders
            },

            numbOrders(){
               let orders= Object.values(this.ordersMonth).reduce((accu,table)=>{
                return accu+table.length
                },0)
               return orders
            },

            selectCurrentMonth(){
                let newdate= new Date()
                let month=(newdate.getMonth() + 1).toString()
                return month
            }

        },

        mounted(){
            this.month=this.selectCurrentMonth
        }
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