<template>

  <div class="row h-100 ">
    <img src="../assets/Rectangle 56.png" alt="" class="object-fit-cover  col-5 h-100">

    <div id="container-img" class="col-7 d-flex flex-column justify-content-center" px-4>

      <img src="../assets/logo-white 1.png" alt="" class="d-block mx-auto " id="logo">
      <div class="text-center">
        <strong id="welcome">Welcome to our platform!</strong>
        <p id="subtitle-welcome">Log in to access your account and start exploring</p>
      </div>

      <b-form @submit="onSubmit" id="form-login">

        <label id="custom-labelel">Email</label>
        <b-form-group id="input-group-1">
          <b-form-input :state="validationemail" id="email" v-model="email" type="email" placeholder="Enter email"
            required></b-form-input>
        </b-form-group>

        <label id="custom-labelel">Password</label>
        <b-form-group id="input-group-2">
          <b-form-input :state="validationpassword" type="password" id="password" v-model="password"
            placeholder="Enter password" required></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="light" class="fw-bold w-100" id="button">Login</b-button>
        <p class="text-center mt-3">Not registered yet? <a href="" @click="clickSignup">Sign up here</a></p>

      </b-form>

    </div>
  </div>

</template>

<script>
  import {
    mapActions,
    mapState
  } from 'vuex'
  export default {
    name: 'LoginUser',
    data() {
      return {
        email: '',
        password: '',
        validationemail: true,
        validationpassword: true
      }
    },

    computed: {

      ...mapState('UsersModule', {
        users: 'users'
      }),

    },

    mounted() {
      this.getUers()
      console.log(this.users)
    },

    methods: {
      ...mapActions('UsersModule',['ac_addUser']),

      onSubmit(event) {
        event.preventDefault()
        
        this.users.forEach(user => {
          user.email === this.email ? this.validationemail = true : this.validationemail = false
          user.password === this.password ? this.validationpassword = true : this.validationpassword = false
          this.validationemail === true && this.validationpassword === true ? this.$router.push('/') : ''

        })
      },

      getUers() {
        let usersLocal = JSON.parse(localStorage.getItem('Users'))
        usersLocal && usersLocal.length > this.users.length ? usersLocal.forEach(user => {this.ac_addUser(user)}) : ''
      },

      clickSignup() {
        this.$router.push('/Signup')
      }
    },



  }
</script>



<style scoped>
  #welcome {
    font-size: 22px;
  }

  #subtitle-welcome {
    font-size: 14px;
    color: #969696;
    margin-top: 4px;
  }

  #logo {
    position: absolute;
    top: 41px;
    transform: translate(167%, 66%);
  }

  #form-login {
    margin-inline: 24%;
    margin-top: 26px;
  }

  #Name,
  #Age,
  #email,
  #password {
    background: transparent;
    border: 1px solid #969696;
    height: 46px;
    margin-bottom: 21px;
    display: block;
    color: white;
    border-radius: 6px;
    padding-left: 15px;
  }





  #email::placeholder {
    color: #969696;
  }

  #password::placeholder {
    color: #969696;
  }

  #Age::placeholder {
    color: #969696;
  }

  #Name::placeholder {
    color: #969696;
  }




  #Name:focus {
    color: #ffffff;
    box-shadow: none;
    border-color: white;
  }

  #Age:focus {
    color: #ffffff;
    box-shadow: none;
    border-color: white;
  }

  #email:focus {
    color: #ffffff;
    box-shadow: none;
    border-color: white;
  }

  #password:focus {
    color: #ffffff;
    box-shadow: none;
    border-color: white;
  }


  #button {

    margin-top: 35px;
    color: #02021E;
    height: 46px;

  }

  #custom-labelel {
    background: #02021e;
    position: relative;
    top: 8px;
    width: AUTO;
    text-align: center;
    left: 11px;
    font-size: 13px;
    display: inline-block;
    padding: 0px 4px;
  }
</style>