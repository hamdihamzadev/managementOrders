<template>
    <div class="p-3" id="top-category">

        <div class="d-flex justify-content-between mt-5 mb-5">
            <h6 class="text-center" id="para-filter">
                The top categories have over <strong>{{ numberOrdersFilter }} orders</strong> for the month
            </h6>
            <div class="position-relative">
                <div class="d-flex justify-content-between gap-2">
                    <b-button id="btn-filter" v-b-tooltip.hover title="Change number orders" @click="showFilter" >
                        <b-icon icon="filter" aria-hidden="true"></b-icon> Filter
                    </b-button>

                    <div class="d-flex align-items-center rounded gap-2 " id="container-month">
                        <b-icon icon="calendar-date" aria-hidden="true"></b-icon>
                        <b-form-select class="rounded" v-model="month" :options="options" id="select-mois"
                            @change="ordersMonth"></b-form-select>

                    </div>
                </div>
                <div id="container-form" class="position-absolute z-3" v-show="formFilter">
                    <b-form >
                        <p class="mb-2" id="para-form" >Change number orders to filter</p>
                        <div class="d-flex mb-4" id="group-search">
                            <div id="select-filter" class="d-flex align-items-center justify-content-center  ">
                                <b-icon icon="bag" aria-hidden="true" id="icon-bag"></b-icon>
                            </div>
                            <b-form-input id="input-filter" type="number" placeholder="200 orders" v-model="numberInput" :state="stateInput">
                            </b-form-input>
                        </div>

                        <b-button type="submit" variant="primary" class="me-1"  size="sm" id="btn-changeFilter" @click="changeNumber">Change</b-button>
                        <b-button type="reset"   size="sm"  variant="outline-danger" @click="hideForm" >Close</b-button>

                    </b-form>
                </div>
            </div>




        </div>


        <b-table striped hover :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc">
            <template #cell(Percentage)="data">
                <b-progress :max="max">
                    <b-progress-bar :value="data.item.Percentage" :label="`${data.item.Percentage}%`">
                    </b-progress-bar>
                </b-progress>
            </template>
        </b-table>
        <p class="text-center" v-show="items.length===0"><strong>No orders in this month</strong></p>

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
                        value: '1',
                        text: 'January'
                    },
                    {
                        value: '2',
                        text: 'February'
                    },
                    {
                        value: '3',
                        text: 'March'
                    },
                    {
                        value: '4',
                        text: 'April'
                    },
                    {
                        value: '5',
                        text: 'May'
                    },
                    {
                        value: '6',
                        text: 'June'
                    },
                    {
                        value: '7',
                        text: 'July'
                    },
                    {
                        value: '8',
                        text: 'August'
                    },
                    {
                        value: '9',
                        text: 'September'
                    },
                    {
                        value: '10',
                        text: 'October'
                    },
                    {
                        value: '11',
                        text: 'November'
                    },
                    {
                        value: '12',
                        text: 'December'
                    }
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
                respo: "",
                formFilter:false,
                numberInput:1,
                numberOrdersFilter:1,
                stateInput:null


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

                    if (this.ordersMonth[category].length >= this.numberOrdersFilter) {
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
                for (const categoryKey in this.storeOrdersDelivred) {
                    let filterOrder = this.storeOrdersDelivred[categoryKey].filter(order => {
                        return order.date.split('/')[1] === this.month
                    })
                    Object.defineProperty(orders, categoryKey, {
                        value: filterOrder,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    })
                }
                return orders
            },

            numbOrders() {
                let orders = Object.values(this.ordersMonth).reduce((accu, table) => {
                    return accu + table.length
                }, 0)
                return orders
            },

            selectCurrentMonth() {
                let newdate = new Date()
                let month = (newdate.getMonth() + 1).toString()
                return month
            },

        

        },

        methods:{
            showFilter(){
               this.formFilter= !this.formFilter
            },

            hideForm(){
                this.formFilter=false
            },

            changeNumber(event){
                event.preventDefault()
                if(this.numberInput!==''){
                    this.stateInput=null
                    this.numberOrdersFilter=this.numberInput
                    this.hideForm()
                    
                }else{
                    this.stateInput=false
                }
                
            }
        },

        mounted() {
            this.month = this.selectCurrentMonth
        }
    }
</script>


<style scoped>
    #para-filter {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }

    #para-filter::before {
        content: "";
        display: block;
        width: 4px;
        height: 17px;
        background: #ffffff;
        border-radius: 10px;
    }

    #btn-filter {
        background: #3c5df5;
        border: none;
    }

    #container-month {
        background: #3c5df5;
        padding-inline: 7px;
    }

    #select-mois {
        background: #3c5df5;
        color: white;
        border: none;
    }

    #top-category {
        background-color: var(--couleur-primaire-1)
    }

    #icon-category {
        color: #14142d;
        background: white;
        margin-right: 7px;
        padding: 3px;
        border-radius: 3px;
    }

    /** filter */
    #input-filter {
        width: 70%;
        border-radius: 0 0.375rem 0.375rem 0;
        border-color: #3a5aec;
        background-color: transparent;
        color: #3a5aec;
    }

    #input-filter::placeholder {
        color: #3a5aec;
    }

    #select-filter {
        width: 27%;
        border-radius: 0.375rem 0 0 0.375rem;
        border-color: #6c757d;
        background-color: #3a5aec;
    color: white;
    }

    #input-filter:focus {
        box-shadow: none;
        color: #3a5aec;
      
    }
    #icon-bag {
        font-size: 22px;
       
    }

    #container-form {
        background: #eaeaea;
    margin-top: 11px;
    padding: 10px 18px;
    width: 300px;
    left: -62px;
    border-radius: 8px;
    box-shadow: 0px 15px 63px 14px rgba(0,0,0,0.33);
-webkit-box-shadow: 0px 15px 63px 14px rgba(0,0,0,0.33);
-moz-box-shadow: 0px 15px 63px 14px rgba(0,0,0,0.33);
    }

    #btn-changeFilter {
        background-color: #3a5aec;
    }

    #para-form{
        color:#3a5aec;
        font-weight: 700;
    }
</style>