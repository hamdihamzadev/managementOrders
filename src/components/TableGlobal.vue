<template>
  <b-container class="bv-example-row" id="table-global" fluid>

    <!---------- TITLE AND SEARCH --------------->

    <b-row class="mb-5">
      <!----- TITLE ----->
      <b-col>
        <h1 class="title">Orders</h1>
      </b-col>
      <b-col id="searchInput" v-if="rowsOrders.length!==0">
        <!----- SEARCH INPUT ----->
        <b-form-input id="filter-input" type="search" placeholder="Search product or ..." @input="searchprd">
        </b-form-input>

      </b-col>
    </b-row>

    <!---------- TABLE --------------->
    <b-table-simple responsive id="table-Order" hover>
      <b-thead>
        <b-tr>
          <b-th class="border-top-0">Customer</b-th>
          <b-th class="border-top-0">Phone</b-th>
          <b-th class="border-top-0">City</b-th>
          <b-th class="border-top-0">Adress</b-th>
          <b-th class="border-top-0">Product</b-th>
          <b-th class="border-top-0">Price</b-th>
          <b-th class="border-top-0">Quantity</b-th>
          <b-th class="border-top-0">Total</b-th>
          <b-th class="border-top-0" v-show="thTimepost">TimePost</b-th>
          <b-th class="border-top-0" v-if="showStatu">Status</b-th>
          <b-th class="border-top-0">Action</b-th>
        </b-tr>
      </b-thead>

      <!----------------TBODY-------------->

      <b-tbody ref="myTable" id="tbody">
        <b-tr v-for="(order,index) in orders" :key="order.id" :id="`order${index}`">

          <b-td>{{ order.Customer }}</b-td>
          <b-td>{{ order.phone }}</b-td>
          <b-td>{{ order.city }}</b-td>
          <b-td>{{ order.address }}</b-td>
          <b-td>{{ order.product }}</b-td>
          <b-td>{{ order.price }}</b-td>
          <b-td>{{ order.quantity }}</b-td>
          <b-td>{{ order.total }}</b-td>
          <b-td v-show="thTimepost">{{ order.Timepost }}</b-td>

          <!----------------STATUS-------------->

          <b-td v-if="showStatu">
            <select @change="changeBackSelect(index)" :id="`select${index}`" v-model="statusValues[index]" ref="select"
              :style="bgStatus(index)">
              <option style="background-color: white; color:black"  class="bg-white" v-for="(option , index) in options" :key="index" :value="option.value">{{option.text}}</option>
            </select>
          </b-td>

          <!----------------ACTION-------------->

          <b-td>
            <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
              <template #button-content >
                <i class='bx bx-dots-horizontal-rounded'></i>
              </template>
              <b-dropdown-item href="#" @click="sendorder(order.ref,index)" v-if="showActionSend" >Send</b-dropdown-item>
              <b-dropdown-item href="#" @click="removeorder(order.ref,index)">Remove</b-dropdown-item>
            </b-dropdown>
          </b-td>

        </b-tr>
      </b-tbody>

    </b-table-simple>

    <!-- <h6 v-if="rowsOrders.length===0" class="text-center">{{ sentenceorders }}</h6> -->

    <!---------- SHOW POPUP --------------->

    <b-modal id="modalPostpond" ref="modalPostpond" title="Submit Your Name" @ok="handleOk" :ok-title="'Send'">
      <form ref="form">
        <b-form-group label="Name" label-for="name-input" invalid-feedback="Name is required">
          <b-form-input id="name-input" ref="inputPopup" :value="valuePopup" @input="onInputpopup"
            :state="stateInputPopup" required>
          </b-form-input>
        </b-form-group>
      </form>
    </b-modal>



  </b-container>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'
  export default {
    name: "TableGlobal",
    props: ['orders', 'options', 'thTimepost', 'valuePopup', 'sentenceorders'],

    data() {
      return {
        // FOR METHOdS NEXT AND PREV IN TABLE
        statusValues: [],
        // FOR Popup
        stateInputPopup: null,

      }
    },

    computed: {
      ...mapState('NewOrders', {
        TodayOrders: 'Orders Confirmed'
      }),

      ...mapState('allOrder', {
        storeAllOrder: state => state
      }),

      totalPages() {
        return this.orders.length / 10
      },
      rowsOrders() {
        return this.orders.slice(this.start, this.end)
      },


      showStatu() {
        return this.$route.path === '/Orders/Return' || this.$route.path === '/Orders/Deliverd' || this.$route.path ===
          '/Orders/Canceld' ? false : true
      },
      showActionSend() {
        return this.$route.path === '/Orders/Return' || this.$route.path === '/Orders/Deliverd' || this.$route.path ===
          '/Orders/Canceld' ? false : true
      },




    },

    methods: {

      bgStatus(index) {
       let val= this.statusValues[index]
       switch (val){
        case 'Confirmed' :
        case 'Delivered' :
        case 'Shipped' :
          return 'background: rgba(33, 150, 83, 0.1); color: #219653 ; border-color: #219653;';
        case 'Canceled':
        case 'Return':
          return 'background: rgb(192 20 47 / 15%); color: #c0142f; border-color: #c0142f;';
        case 'Progress' :  
          return 'background: rgba(242, 153, 74, 0.1); color: #f2994a; border-color: #f2994a;';
        case 'Not treat' :  
          return 'background: rgba(155, 81, 224, 0.1); color: #9b51e0; border-color: #9b51e0;';
        case 'Postponed' :  
          return 'background: rgba(54, 92, 245, 0.1); color: #365CF5;border-color: #365CF5;';
           
       }
       

        
      },

      // EMITE EVENY CLICK IN SEND FOR PUSH ORDER
      sendorder(ref, index) {
        this.$emit('send-order', {
          ref,
          index
        })

      },

      // EMIT EVENT FOR REMOVE ORDER
      removeorder(ref, index) {
        this.$emit('remove-order', {
          ref,
          index
        })
      },

      //--------------------------------------------------------------------------------

      // METHODS FOR PAGINATION IN TABLE 
      nextlist() {
        this.end < this.orders.length ? (this.start += 10, this.end += 10, this.currentPage++) : null;
      },

      previouslist() {
        this.end > 10 ? (this.start -= 10, this.end -= 10, this.currentPage -= 1) : null
      },


      //------------ SEARCH PRODUCT IN TABLE ------------
      searchprd(val) {

        // GET VALUE IN INPUT
        let value = val.toLowerCase()
        // GET ALL TR - AND LOOP FOR EVERY TR
        let alltr = Array.from(this.$el.querySelector('tbody').children)
        alltr.forEach(tr => {

          let isVisible = Array.from(tr.children).some(td => {
            // CHECK EVERY TD.TEXTCONTENT
            let tdtext = td.textContent.toLowerCase();
            return tdtext.includes(value);
          });

          tr.style.display = isVisible ? '' : 'none';

        })
      },


      // STYLING SELECT IN CHANGE 
      changeBackSelect(index) {

        this.$emit('save-status')
        let elem = this.$refs.select[index].$el
        // SHOW AND HIDE POPUP
        elem.value === 'Postponed' ? this.$root.$bvModal.show('modalPostpond') : ''
      },



      // SEND OK popup
      handleOk(bvModalEvent) {

        let inputPopup = this.$refs.inputPopup.$el.value
        inputPopup === '' ? (bvModalEvent.preventDefault(), this.stateInputPopup = false) : this.stateInputPopup = null

      },

      onInputpopup(val) {
        this.$emit('input', val)
      },

      // GET FUNCTION ACTIONS IN VUEX ALL ORDERS
      ...mapActions('allOrder', ['ac_addInAllOrder']),
      getAllOrders() {
        let OrdersLocal = JSON.parse(localStorage.getItem('allOrder'))

        let numbersOrderLocal = Object.values(OrdersLocal).reduce((acc, tableCtg) => {
          return acc + tableCtg.length;
        }, 0);

        let numbersOrderStore = Object.values(this.storeAllOrder).reduce((acc, tableCtg) => {
          return acc + tableCtg.length;
        }, 0);

        if (OrdersLocal && numbersOrderLocal > numbersOrderStore) {
          for (const statusOrder in OrdersLocal) {
            OrdersLocal[statusOrder].forEach(order => {
              this.ac_addInAllOrder({
                status: statusOrder,
                order: order
              })
            })
          }
        }

      },

    },

    mounted() {

      // GET ALL STATUS  
      this.$route.path === '/Orders/Confirmed' ? this.statusValues = JSON.parse(localStorage.getItem(
        'statusConfirmed')) || [] : null
      this.$route.path === '/Orders/Shipped' ? this.statusValues = JSON.parse(localStorage.getItem('statusShipped')) ||
        [] : null
      this.$route.path === '/Orders/InProgress' ? this.statusValues = JSON.parse(localStorage.getItem(
        'statusProgress')) || [] : null
      this.$route.path === '/Orders/PostPond' ? this.statusValues = JSON.parse(localStorage.getItem(
        'statusPostponed')) || [] : null
      this.$route.path === '/Orders/NewOrders' ? this.statusValues = JSON.parse(localStorage.getItem(
        'statusNeworders')) || [] : null

      // GET ALL ORDERS 
      this.getAllOrders()

    }

  }
</script>


<style>
  #table-global {
    background: var(--couleur-primaire-1);
    padding: 41px 26px;
    border-radius: 12px;
  }


  #filter-input {
    background: transparent;
    height: 40px;
    color: white;
    border: 1px solid #6c757d;
  }

  #searchInput {
    margin-left: 676px;
  }

  #table-Order th {
    border-top: none;
    background-color: var(--couleur-primaire-1);
    color: var(--couleur-primaire-3);
  }

  #tbody td {
    background-color: var(--couleur-primaire-1);
    color: var(--couleur-primaire-3);
  }

  #select-sts .valuopton :hover {
    background-color: #cb0303
  }


  .selectstatus {
    border-radius: 13.25rem;
    font-weight: 700;
    font-size: 14px;
    height: 34px;
    border-radius: 13.25rem;
    padding: 0.375rem 0.75rem 0.375rem 0.75rem;
    width: auto;
  }


  .select {
    font-size: 13px;
  }



  #modal-1___BV_modal_backdrop_ {
    background-color: #00000026;
  }


  .popup {
    display: none;
  }

  #modal-footer-sm___BV_modal_footer_ :first-child {
    background-color: #cb0303;
    border: none;
  }

  #modal-footer-sm___BV_modal_footer_ :last-child {
    background-color: #04a820;
  }


  .bg-green {
    background: rgba(33, 150, 83, 0.1);
    color: #219653;
    font-size: 13px;
  }

  .Canceled {
    background-color: #FF6347;
    font-size: 13px;
  }

  .white {
    background-color: white;
    font-size: 13px;
  }
</style>


<b-form-select :options="options">
</b-form-select>