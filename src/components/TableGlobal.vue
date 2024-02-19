<template>
  <b-container class="bv-example-row" id="table-global" fluid>

    <!---------- TITLE AND SEARCH --------------->

    <b-row class="mb-5">
      <!----- TITLE ----->
      <b-col>
        <h1 class="title">{{ titletable }}</h1>
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
          <b-th variant="danger" class="border-top-0">Customer</b-th>
          <b-th class="border-top-0">Phone</b-th>
          <b-th class="border-top-0">City</b-th>
          <b-th class="border-top-0">Adress</b-th>
          <b-th class="border-top-0">Product</b-th>
          <b-th class="border-top-0">Price</b-th>
          <b-th class="border-top-0">Delivery</b-th>
          <b-th class="border-top-0">Quantity</b-th>
          <b-th class="border-top-0">Total</b-th>
          <b-th class="border-top-0" v-show="thTimepost">TimePost</b-th>
          <b-th class="border-top-0" v-if="showStatu">Status</b-th>
          <b-th class="border-top-0">Action</b-th>
        </b-tr>
      </b-thead>

      <!----------------TBODY-------------->

      <b-tbody ref="myTable" id="tbody">
        <b-tr v-for="(order,index) in rowsOrders" :key="order.id" :id="`order${index}`">

          <b-td v-for="information in order" :key="information">{{ information }}</b-td>

          <!----------------STATUS-------------->

          <b-td v-if="showStatu" >
            <b-form-select @change="changeBackSelect(index)" ref="select" :id="`select${index}`" :options="options"
              class="mb-3 <selectstatus>" size="sm" v-model="statusValues[index]" 
                 >
            </b-form-select>
          </b-td>

          <!----------------ACTION-------------->

          <b-td>
            <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
              <template #button-content>
                <i class='bx bx-dots-horizontal-rounded'></i>
              </template>
              <b-dropdown-item href="#" @click="sendorder(index)" v-if="showActionSend">Send</b-dropdown-item>
              <b-dropdown-item href="#" @click="removeorder(index)">Remove</b-dropdown-item>
            </b-dropdown>
          </b-td>

        </b-tr>
      </b-tbody>

    </b-table-simple>

    <h6 v-if="rowsOrders.length===0" class="text-center">{{ sentenceorders }}</h6>

    <!---------- SHOW POPUP --------------->

    <b-modal id="modalPostpond" ref="modalPostpond" title="Submit Your Name" @ok="handleOk">
      <form ref="form">
        <b-form-group label="Name" label-for="name-input" invalid-feedback="Name is required">
          <b-form-input id="name-input" ref="inputPopup" :value="valuePopup" @input="onInputpopup"
            :state="stateInputPopup" required>
          </b-form-input>
        </b-form-group>
      </form>
    </b-modal>

    <!---------- PAGINATION --------------->
    <div class="pagination" v-show="totalPages>=1">
      <b-button pill size="sm" variant="outline-primary" @click="previouslist"><i class='bx bx-chevron-left'></i>
        Previous</b-button>
      {{ currentPage }} of {{ totalPages }}
      <b-button pill size="sm" variant="outline-primary" @click="nextlist"> Next <i class='bx bx-chevron-right'></i>
      </b-button>
    </div>


  </b-container>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    name: "TableGlobal",
    props: ['titletable', 'orders', 'options', 'thTimepost', 'valuePopup', 'sentenceorders'],

    data() {
      return {
        // FOR METHOdS NEXT AND PREV IN TABLE
        currentPage: 1,
        start: 0,
        end: 10,
        statusValues: [],
        // FOR Popup
        stateInputPopup: null,
    
      }
    },
 
    computed: {
      ...mapState('NewOrders', {
        TodayOrders: 'Orders Confirmed'
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
      }
    },


    methods: {
      // EMITE EVENY CLICK IN SEND FOR PUSH ORDER
      sendorder(index) {
        this.$emit('send-order', index)

      },

      // EMIT EVENT FOR REMOVE ORDER
      removeorder(index) {
        this.$emit('remove-order', index)
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
        // CHANGE BACKGROUND / COLOR / BORDER FOR OPTIONS   
        elem.style.cssText = elem.value === 'Confirmed' || elem.value === 'Delivered' || elem.value === 'Shipped' ?
          'background: #2196531a; color: #219653; border-color: #219653;' :
          elem.value === 'Canceled' || elem.value === 'Return' ?
          'background: #ff63471a; color: #FF6347; border-color: #FF6347;' :
          elem.value === 'Postponed' || elem.value === 'Progress' ?
          'background: #0b4ab71a; color: #0b4ab6; border-color: #0b4ab6;' : ''
          elem.value ==='' ? 'background: #6c757d;  border-color: #0b4ab6;' : ''
      },



      // SEND OK popup
      handleOk(bvModalEvent) {

        let inputPopup = this.$refs.inputPopup.$el.value
        inputPopup === '' ? (bvModalEvent.preventDefault(), this.stateInputPopup = false) : this.stateInputPopup = null

      },

      onInputpopup(val) {
        this.$emit('input', val)
      }

    },

    mounted(){

      this.$route.path==='/Orders/Confirmed' ? this.statusValues=JSON.parse(localStorage.getItem('statusConfirmed')) || [] :null
      this.$route.path==='/Orders/Shipped' ? this.statusValues=JSON.parse(localStorage.getItem('statusShipped')) || [] :null
      this.$route.path==='/Orders/InProgress' ? this.statusValues=JSON.parse(localStorage.getItem('statusProgress')) || [] :null
      this.$route.path==='/Orders/PostPond' ? this.statusValues=JSON.parse(localStorage.getItem('statusPostponed')) || [] :null
      
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


  .selectstatus {
    border-radius: 13.25rem;
    font-weight: 700;
    font-size: 14px;
    height: 34px;
    border-radius: 13.25rem;
    padding: 0.375rem 0.75rem 0.375rem 0.75rem;
    width: auto;
  }


  select option[value='Confirmed'],
  option[value='Delivered'],
  option[value='Shipped'] {
    background-color: #90EE90;
    font-size: 13px;

  }

  select option[value='Canceled'],
  option[value='Return'] {
    background-color: #FF6347;
    font-size: 13px;
  }

  select option[value='Postponed'],
  option[value='Progress'] {
    background-color: #0b4ab6;
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
</style>