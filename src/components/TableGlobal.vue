<template>
    <b-container class="bv-example-row" id="table-global" fluid>
  
      <!---------- TITLE AND SEARCH --------------->
  
      <b-row>
        <!----- TITLE ----->
        <b-col>
          <h1 class="title">{{ titletable }}</h1>
        </b-col>
        <b-col id="searchInput">
          <!----- SEARCH INPUT ----->
          <b-form-input id="filter-input" type="search" placeholder="Search product or ..."  @input="searchprd" >
          </b-form-input>
        </b-col>
      </b-row>
  
      <!---------- TABLE --------------->
      <b-table-simple responsive id="table-Order">
        <b-thead>
          <b-tr>
            <b-th class="border-top-0">Customer</b-th>
            <b-th class="border-top-0">Phone</b-th>
            <b-th class="border-top-0">City</b-th>
            <b-th class="border-top-0">Adress</b-th>
            <b-th class="border-top-0">Product</b-th>
            <b-th class="border-top-0">Price</b-th>
            <b-th class="border-top-0">Delivery</b-th>
            <b-th class="border-top-0">Quantity</b-th>
            <b-th class="border-top-0">Total</b-th>
            <b-th class="border-top-0" v-show="thTimepost">TimePost</b-th>
            <b-th class="border-top-0">Status</b-th>
            <b-th class="border-top-0">Action</b-th>
          </b-tr>
        </b-thead>
  
        <!----------------TBODY-------------->
  
        <b-tbody ref="myTable">
          <b-tr v-for="(order,index) in rowsOrders" :key="order.id" :id="`order${index}`">
  
            <b-td v-for="information in order" :key="information">{{ information }}</b-td>
  
            <!----------------STATUS-------------->
  
            <b-td>
              <b-form-select @change="changeBackSelect(index)" @input="ShowPopup(index)" ref="select" id="select"
                :options="options" class="mb-3" size="sm">
              </b-form-select>
            </b-td>
  
            <!----------------ACTION-------------->
  
            <b-td>
              <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
                <template #button-content>
                  <i class='bx bx-dots-horizontal-rounded'></i>
                </template>
                <b-dropdown-item href="#" @click="sendorder(index)">Send</b-dropdown-item>
                <b-dropdown-item href="#" @click="removeorder(index)">Remove</b-dropdown-item>
              </b-dropdown>
            </b-td>
  
          </b-tr>
        </b-tbody>
  
      </b-table-simple>
  
       <!---------- SHOW POPUP --------------->
       <b-modal  id="modal-footer-sm" title=" Add TimePost orders" button-size="sm" 
              ok-title="Sende" cancel-title="Cancel" 
            
              >
  
              <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group label="TimePost" label-for="name-input" invalid-feedback="Name is required">
                  <b-form-input id="input-timepost" v-model="valuePopup" placeholder="Monday at 26PM in californie"
                    :state="stateInput" @input="checkvalueState" required>
                  </b-form-input>
                </b-form-group>
              </form>
  
        </b-modal>
      <!---------- PAGINATION --------------->
      <div class="pagination">
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
      props: ['titletable', 'orders', 'options','thTimepost','ShowStatus'],
      data() {
        return {
          currentPage: 1,
          // FOR METHOdS NEXT AND PREV IN TABLE
          start: 0,
          end: 10,
          valuePopup:'',
          indexPopup: '',
          stateInput: null,
          visibelPopup:true,
          testinput:''
  
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
      },
  
      methods: {
        // EMITE EVENY CLICK IN SEND FOR PUSH ORDER
        sendorder(index){
          this.$emit('send-order',index,this.valuePopup)
        },
  
        // EMIT EVENT FOR REMOVE ORDER
        removeorder(index){
          this.$emit('remove-order',index)
        },
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
  
          let elem = this.$refs.select[index].$el
          // SHOW AND HIDE POPUP
          elem.value === 'Postponed' ? this.$bvModal.show('modal-footer-sm'):''
          // CHANGE BACKGROUND / COLOR / BORDER FOR OPTIONS   
          elem.style.cssText = elem.value === 'Confirmed' || elem.value === 'Delivered' || elem.value === 'Shipped' ?
            'background: #2196531a; color: #219653; border-color: #219653;' :
            elem.value === 'Canceled' || elem.value === 'Return' ?
            'background: #ff63471a; color: #FF6347; border-color: #FF6347;' :
            elem.value === 'Postponed' || elem.value === 'Progress' ?
            'background: #0b4ab71a; color: #0b4ab6; border-color: #0b4ab6;' : ''
  
        },
  
  
        ShowPopup(index){
          this.$emit('Show-Popup',index)
        },
  
  
        // addValueTimePost(event) {
  
        //   // push value in td==> textcontent
        //   if (this.valuePopup !== '') {
        //     tdTimePost.textContent = this.valuePopup
        //   } 
        //   else {
        //     this.$refs.select[this.indexPopup].$el.value = null
        //     this.$refs.select[this.indexPopup].$emit('input', null);
        //     event.preventDefault()
        //   }
        //   // initialize value input
        //   this.valuePopup = ''
  
        // },
  
        // CHECK IF INPUT IS FIELD OR NO
        checkvalueState(value) {
          value !== '' ? this.stateInput = true : this.stateInput = false
        }
  
      },
  
      mounted(){
        console.log(this.valuePopup)
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
  
    .table th {
      border-top: none;
    }
  
    #select {
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