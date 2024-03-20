<template>
    <div class="p-3" id="top-category">
        <div class="d-flex justify-content-between mt-5 mb-5">
            <h5>Top Category</h5>
            <b-form-select v-model="selected" :options="options" id="select-mois"></b-form-select>
        </div>
        <!---------- TABLE --------------->
        <b-table-simple responsive id="table-Order" hover class="mt-5">
            <b-thead>
                <b-tr>
                    <b-th class="border-top-0">Name</b-th>
                    <b-th class="border-top-0">Orders</b-th>
                    <b-th class="border-top-0">Percentage</b-th>
                    <b-th class="border-top-0">revenue</b-th>
                    <b-th class="border-top-0">Progress</b-th>
                </b-tr>
            </b-thead>

            <!----------------TBODY-------------->

            <b-tbody ref="myTable" id="tbody">
                <b-tr>
                    <td><i class='bx bxs-watch-alt' id="icon-category"></i>Smart watch</td>
                    <td>9836</td>
                    <td>
                        <b-progress :max="max">
                            <b-progress-bar :value="value" :label="`${((value / max) * 100)}%`">
                            </b-progress-bar>
                        </b-progress>
                    </td>
                    <td>58 989 $</td>
                    <td>+ 13%</td>
                </b-tr>
            </b-tbody>

        </b-table-simple>
    </div>
</template>

<script>
import { mapState } from 'vuex';
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
                selected: 'January',
                value: 30,
                max: 100
            }

            /**
             * get all category ===> 
             * all product ==> loop ===> push 
             * product 
             */
        },

        computed:{

            ...mapState('ProductsModule', {
                productModuleStates: state => state
            }),

            // allCategory(){
            //     let singleCategory={class:'bx bxs-watch-alt', name:'airpods', orders:3127, value:26 , revenue:'5822 $', Progress:3.15 }
            // }
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