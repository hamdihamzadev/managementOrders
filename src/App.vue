<template>
  <div id="app" class="container-flui d-flex">
    <div :class="{'invisible':toggelaside}" v-if="showLogin">
      <SideBar />
    </div>
    <div class="head-cont" :class="{'fullWidth':toggelaside}" >
      <HeaDer @toggel-header="toggelheader" v-if="showLogin" />
      <router-view />
    </div>
  </div>
</template>

<script>
  import SideBar from './components/app/SideBar.vue'
  import HeaDer from './components/app/HeaDer.vue'

  export default {
    name: 'App',
    components: {
      SideBar,
      HeaDer
    },
    data() {
      return {
        toggelaside: false,
      }
    },

    computed:{
      showLogin(){
      return  this.$route.path==='/Login' || this.$route.path==='/Signup'  ? false : true
      }
    },

    mounted(){
      
      let headCont=document.querySelector('.head-cont')
      this.$route.path==='/Login' ? headCont.style.marginLeft ='0px' :''
      this.$route.path==='/Signup' ? headCont.style.marginLeft ='0px' :''
      
    },

    methods: {
      toggelheader() {
        this.toggelaside = !this.toggelaside
      },
   
    },

 
  }
</script>



<style lang="scss">
  #app {
    background-color: #02021e;
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: white;
    overflow-x: hidden;

    .head-cont {
      width: 100%;
      margin-left: 14%;
      transition: 0.3s;
      height: 100vh;

      .dashbord,
      .neworders,
      .confirmedorders,
      .shipped,
      .delivred,
      .return,
      .postpond,
      #topStatistics {
        margin: 47px 0px;

      }

      .namepage {
        margin-bottom: 30px;
      }
    }

    .fullWidth {
      margin-left: 0px;
    }

    .invisible {
      display: none;
    }
  }
</style>