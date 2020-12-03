<template>
  <v-card>
    <v-card-title>Crea tu cuenta</v-card-title>
    <validation-observer
      ref="observer"
      v-slot="{ invalid }"
    >
      <form @submit.prevent="submit">
        <v-col md="11">
          <validation-provider
            v-slot="{ errors }"
            name="Nombre"
            :rules="{
              required:true,
              regex:'^([A-Za-z]+)$'
            }"
          >
            <v-text-field
              v-model="name"
              :error-messages="errors"
              label="Nombre"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Apellido Paterno"
            :rules="{
              required:true,
              regex:'^([A-Za-z]+)$'
            }"
          >
            <v-text-field
              v-model="flname"
              :error-messages="errors"
              label="Apellido Paterno"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Apellido Materno"
            :rules="{
              required:true,
              regex:'^([A-Za-z]+)$'
            }"
          >
            <v-text-field
              v-model="slname"
              :error-messages="errors"
              label="Apellido Materno"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Teléfono"
            :rules="{
              required: true,
              digits: 10,
              regex: '^([0-9]+)$'
            }"
          >
            <v-text-field
              v-model="phoneNumber"
              :counter="10"
              :error-messages="errors"
              label="Teléfono"
              required
            ></v-text-field>
          </validation-provider>
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
              label="Contraseña (8 caracteres. Al menos: 1 mayúscula, 1 minúscula, 1 caracter especial y 1 número)"
              :type="value ? 'password' : 'text'"
              :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="() => (value = !value)"
              required
            ></v-text-field>
          </validation-provider>
        </v-col>
        <v-card-subtitle>Fecha de nacimiento</v-card-subtitle>
        <v-row align="center">
          <v-col>
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              name="Fecha de nacimiento"
            >
              <v-date-picker
                v-model="bdate"
                :error-messages="errors"
                locale="es-419"
                elevation="10"
                scrollable
                :max="today"
                :type="'date'"
              ></v-date-picker>
            </validation-provider>   
          </v-col>
          <v-col>
            <v-btn
              class="mr-4"
              type="submit"
              :disabled="invalid"
              color="success"
            >
              Crear Cuenta
            </v-btn>
            <v-btn
              :to="{path:'/log-in'}"
              color="blue"
            >
              Iniciar sesión
            </v-btn>
          </v-col>
        </v-row>
      </form>
    </validation-observer>
  </v-card>
</template>

<script>
  import { required, digits, email, min, regex } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
  import axios from 'axios'

  setInteractionMode('eager')

  extend('digits', {
    ...digits,
    message: '{_field_} necesita tener {length} dígitos. ({_value_})',
  })

  extend('required', {
    ...required,
    message: '{_field_} no puede estar vacío',
  })

  extend('min', {
    ...min,
    message: '{_field_} debe tener al menos {length} caracteres',
  })

  extend('regex', {
    ...regex,
    message: '{_value_} no es {_field_} válido, {regex}',
  })

  extend('email', {
    ...email,
    message: 'Email debe ser válido',
  })

  export default {
    name:'signIn',
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      name: '',
      flname:'',
      slname:'',
      phoneNumber: '',
      email: '',
      pwd:'',
      bdate:null,
      value:true,
      today: new Date().toISOString().slice(0, 10),

    }),
    methods: {
      submit () {
        this.$refs.observer.validate()
        let ctx = this
        let submit_info = {
          'username': this.email,
          'password': this.pwd,
          'nombre':this.name,
          'apellidoP': this.flname,
          'apellidoM': this.slname,
          'telefono': this.phoneNumber,
          'Fnac': this.bdate
        }
        axios.post("https://7bdqs9pwc4.execute-api.us-east-1.amazonaws.com/default/creaCuentaA01745776", submit_info)
        .then(response => {
          if(response.data.result=="success"){
            this.$cookie.set('username', this.email, 1)
            alert("Bienvenid@!!")
            ctx.$router.push({ path: 'log-in' })
          }else{
            alert("Ocurrió un problema al crear tu cuenta, inténtalo nuevamente");
          }
        })
      },
    },
  }
</script>