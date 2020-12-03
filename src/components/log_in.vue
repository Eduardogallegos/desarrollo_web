<template>
  <v-card>
    <v-card-title>Cambia tu contraseña</v-card-title>
    <validation-observer
      ref="observer"
      v-slot="{ invalid }"
    >
      <form @submit.prevent="submit">
        <v-col md="11">
          <validation-provider
            v-slot="{ errors }"
            name="email"
            rules="required|email"
          >
            <v-text-field
              v-model="email"
              :error-messages="errors"
              label="E-mail"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Contraseña"
            rules="required"
          >
            <v-text-field
              v-model="pwd"
              :error-messages="errors"
              label="Contraseña"
              :type="value ? 'password' : 'text'"
              :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="() => (value = !value)"
              required
            ></v-text-field>
          </validation-provider>
        </v-col>
        <v-btn
          class="mr-4"
          type="submit"
          :disabled="invalid"
          color="success"
        >
          Iniciar sesión
        </v-btn>
        <v-btn 
          :to="{path:'/sign-in'}"
          color="blue"
        >
          Crear cuenta
        </v-btn>
        <v-btn 
          :to="{path:'/change-password'}"
          text
          color="indigo"
        >
          Recuperar contraseña
        </v-btn>
      </form>
    </validation-observer>
  </v-card>
</template>

<script>
  import { required, email} from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
  import axios from 'axios';

  setInteractionMode('eager')

  extend('required', {
    ...required,
    message: '{_field_} no puede estar vacío',
  })

  extend('email', {
    ...email,
    message: 'Email inválido',
  })

  export default {
    name:'logIn',
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      email: '',
      value: true,
      pwd:'',
    }),

    methods: {
      submit () {
        let ctx = this;
        this.$refs.observer.validate()
        let token_req = {"username":this.email}
        axios.post("https://7bdqs9pwc4.execute-api.us-east-1.amazonaws.com/default/generatejwt", token_req)
        .then(respnse=>{
          let token = respnse.data
          const article = { "mail":ctx.email, "password":ctx.pwd, "token": token };
          axios.post("https://7bdqs9pwc4.execute-api.us-east-1.amazonaws.com/default/validacuenta", article)
          .then (response => {
            // JSON responses are automatically parsed.
            if(response.data.login=="success"){
              ctx.$cookie.set('username', ctx.email, 1)
              ctx.$cookie.set('token', token, 1)
              ctx.$router.push({ path: 'productos' })
            }else{
              alert("El email o la contraseña son incorrectos.");
            }
          })
          .catch(e => {
            alert('Error intentando iniciar sesion')
            console.log(e)
          })
        })
        .catch(e => {
          alert('Error intentando iniciar sesion')
          console.log(e)
        })
      }
    },
  }
</script>