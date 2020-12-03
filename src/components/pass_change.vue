<template>
  <v-card>
    <v-card-title>Cambia tu contraseña</v-card-title>
    <validation-observer
      ref="observer"
      v-slot="{ invalid }"
    >
      <form @submit.prevent="submit">
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
          :rules="{
            required:true,
            min:8,
            regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*?[#?!@$%^&*-.,_]).*$'
          }"
        >
          <v-text-field
            v-model="pwd"
            :error-messages="errors"
            label="Nueva contraseña"
            :type="value ? 'password' : 'text'"
            :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="() => (value = !value)"
            required
          ></v-text-field>
        </validation-provider>
        <v-btn
          class="mr-4"
          type="submit"
          :disabled="invalid"
        >
          submit
        </v-btn>
        <v-btn @click="clear">
          clear
        </v-btn>
      </form>
    </validation-observer>
  </v-card>
</template>

<script>
  import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
  import axios from 'axios'

  setInteractionMode('eager')

  extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
  })

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('regex', {
    ...regex,
    message: '{_field_} {_value_} does not match {regex}',
  })

  extend('email', {
    ...email,
    message: 'Email must be valid',
  })

  export default {
    name:'changePassword',
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      email: '',
      pwd:'',
      value:true,
    }),

    methods: {
      submit () {
        this.$refs.observer.validate()
        let info = {mail:this.email, str:'password', value:this.pwd}
        let ctx = this
        axios.post('https://7bdqs9pwc4.execute-api.us-east-1.amazonaws.com/default/updateinfo',info)
        .then(response =>{
          if(response.data.update == 'success'){
            alert('Contraseña actualizada')
            ctx.$router.push({ path: 'log-in' })
          }
        })
        .catch(error=>{
          alert('Algo salió mal, intenta nuevamente')
          console.log(error)
        })
      },
      clear () {
        this.name = ''
        this.phoneNumber = ''
        this.email = ''
        this.select = null
        this.checkbox = null
        this.$refs.observer.reset()
      },
    },
  }
</script>