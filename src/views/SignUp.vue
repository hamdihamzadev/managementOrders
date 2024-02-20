<template>

    <div class="row h-100 ">
        <img src="../assets/Rectangle 56.png" alt="" class="object-fit-cover  col-5 h-100">

        <div class="col-7 d-flex flex-column justify-content-center" px-4>

            <div class="text-center">
                <strong id="welcome">Create Your Account Today !</strong>
                <p id="subtitle-welcome">Join us now to unlock exclusive benefits and personalized experiences</p>
            </div>

            <b-form @submit="onSubmit" id="form-login">

                <div class="row">

                    <b-form-group  class="col-6">
                        <label id="custom-labelel">Name</label>
                        <b-form-input :state="validationName" id="Name" v-model="name" type="text"
                            placeholder="Enter Name" required></b-form-input>
                    </b-form-group>

                    <b-form-group  class="col-6">
                        <label id="custom-labelel">Age</label>
                        <b-form-input :state="validationAge" id="Age" v-model="age" type="number"
                            placeholder="Enter Age" required></b-form-input>
                    </b-form-group>
                </div>

                <label id="custom-labelel">Email</label>
                <b-form-group >
                    <b-form-input :state="validationemail" id="email" v-model="email" type="email"
                        placeholder="Enter email" required></b-form-input>
                        <b-form-invalid-feedback v-show="emailUsed">This email already has used</b-form-invalid-feedback>
                </b-form-group>

                <label id="custom-labelel">Password</label>
                <b-form-group >
                    <b-form-input :state="validationpassword" type="password" id="password" v-model="password"
                        placeholder="Enter password" required></b-form-input>
                </b-form-group>

                <b-button type="submit" variant="light" class="fw-bold w-100" id="button">Create account</b-button>
                <p class="text-center mt-3">Already have an account? <a href="" @click="clickSignin">Sign in</a>.</p>

            </b-form>
        </div>
    </div>

</template>

<script>
import { mapState,mapActions } from 'vuex';
    export default {
        name: 'SignUp',
        data() {
            return {
                email: '',
                password: '',
                age: '',
                name: '',
                validationemail: true,
                validationpassword: true,
                validationName: true,
                validationAge: true,
                emailUsed:false
            }
        },


        computed: {

            ...mapState('UsersModule', {
                users: 'users'
            }),

        },


        methods: {
            ...mapActions('UsersModule',['ac_addUser']),

            onSubmit(event) {
                event.preventDefault()

                let regexEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
                let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+/;
                let ageRegex = /^(1[89]|[2-9]\d|\d{3,})$/
                let nameRegex = /^[A-Za-z]{2,}$/

                this.validationemail = regexEmail.test(this.email)
                this.validationpassword = passwordRegex.test(this.password)
                this.validationAge = ageRegex.test(this.age)
                this.validationName = nameRegex.test(this.name)

                if (this.validationemail && this.password && this.validationAge && this.validationName) {
                    let verifEmailUsed=this.users.some(user=> user.email===this.email)
                    if(verifEmailUsed===false || this.users.length===0 ){
                        let newUser = {
                        name: this.name,
                        age: this.age,
                        email: this.email,
                        password: this.password,
                    }
                    this.ac_addUser(newUser)
                    this.$router.push('/') 
                    }
                    else if(verifEmailUsed===true){
                        this.emailUsed=true
                    }
 
                }
            },

            clickSignin(){
                this.$router.push('/Login')
            },
          
            getUers(){

                let usersLocal=JSON.parse(localStorage.getItem('Users'))
                this.usersLocal.length>this.users.length ? usersLocal.forEach(user=>{this.ac_addUser(user)}) :''

            }
        },

        mounted(){
            this.getUers()
        }

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
        margin-bottom: 7px;
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