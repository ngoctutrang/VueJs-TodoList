<template>
  <div class="login-form page-wrapper">
    <h2 class="login-heading">Register</h2>
    <ValidationObserver  v-slot="{ passes }">
    <form>
     
      <div class="form-control">
        <div v-for="(error, key) in errors" :key="key" class="server-error">
          {{error[0]}}
        </div>
        <label for="name">Name</label>
        <ValidationProvider rules="required|name" v-slot="{ errors }">
        <input type="text" name="name" id="name" class="login-input" v-model="name">
        <span class="error">{{ errors[0] }}</span>
         </ValidationProvider>
      </div>

      <div class="form-control">
        <label for="email">Email</label>
        
          <ValidationProvider rules="required|email" v-slot="{ errors }">
        <input type="email"  id="email" class="login-input" v-model="email"  >
        <span class="error">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <div class="form-control mb-more">
        <label for="password">Password</label>
        <ValidationProvider rules="required|password" v-slot="{ errors }">
          <input type="password" name="password" id="password" class="login-input" v-model="password">
          <span class="error">{{ errors[0] }}</span>
         </ValidationProvider>
      </div>

      <div class="form-control">
        <button type="button" class="btn-submit" @click="passes(onSubmit)">Create Account</button>
      </div>

    </form>
     </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';


import { required, email, password } from 'vee-validate/dist/rules';

// Add the required rule
extend("required", {
  ...required,
  message: "This field is required"
});

// Add the email rule
extend('email', {...email, message:'Email is invalid'});
extend('password', {validate: value => value.length>4, message:'The password is more 4 characters'});
extend('name', {validate: value => value.length>4, message:'The Name is more 4 characters'});
    export default {
      components: {
        ValidationProvider,
        ValidationObserver
      },
      data(){
          return {
            name:'',
            email:'',
            password:'',
             errors:'',
            successMessage:''
          }
        },
       
        methods:{
          onSubmit() {
            this.register();
          },
          register(){
            this.$store.dispatch('register', {
              name: this.name,
              password: this.password,
              email: this.email
            })
              .then(response => {
                this.successMessage='Registered Successfully'
                this.$router.push({ name: 'login', params:{
                  dataSuccessMessage: this.successMessage
                } })

                this.$toast.success({
                    title:this.successMessage,
                    message:'You can login'
                })

            })
            .catch(err=>{
             
              this.errors = Object.values(err.response.data.errors);
             
            })
          }
        }
    }
</script>

<style lang="scss" scoped>
.error{
  color:red;
}
</style>