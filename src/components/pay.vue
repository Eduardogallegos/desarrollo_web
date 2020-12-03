<template>
<v-card>
  <v-card-title> Total a pagar: ${{total}}</v-card-title>
  <validation-observer
    ref="observer"
    v-slot="{ invalid }"
  >
    <form @submit.prevent="submit">
      <v-col md="11">
        <validation-provider
          v-slot="{ errors }"
          name="Tarjeta"
          :rules="{
            required: true,
            max: 16,
            min:16,
            regex: '^([0-9]+)$'
          }"
        >
          <v-text-field
            v-model="card"
            :counter="16"
            :error-messages="errors"
            label="Número de tarjeta"
            required
          ></v-text-field>
        </validation-provider>
        <v-row>
          <v-col md="3">
            <validation-provider
              v-slot="{ errors }"
              name="Expiracion"
              :rules="{
                required: true,
                digits: 4,
                regex: '^([0-9]+)$'
              }"
            >
              <v-text-field
                v-model="expdate"
                :counter="4"
                :error-messages="errors"
                label="Fecha de expiracion"
                required
              ></v-text-field>
            </validation-provider>
          </v-col>
          <v-col md="3">
            <validation-provider
              v-slot="{ errors }"
              name="CVV"
              :rules="{
                required: true,
                digits: 3,
                regex: '^([0-9]+)$'
              }"
            >
              <v-text-field
                v-model="cvv"
                :counter="3"
                :error-messages="errors"
                label="CVV"
                type="password"
                required
              ></v-text-field>
            </validation-provider>
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-btn
        @click="pay"
          class="mr-4"
          type="submit"
          :disabled="invalid"
          color="success"
        >
          Pagar
        </v-btn>
      </v-col>
    </form>
  </validation-observer>
</v-card>
</template>

<script>
  import { required, digits, min, max, regex } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

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

  extend('max', {
    ...max,
    message: '{_field_} debe tener maximo {length} caracteres',
  })

  extend('regex', {
    ...regex,
    message: '{_value_} no es {_field_} válido, {regex}',
  })


  export default {
    name:'pay',
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      productNames: ['Chamarra Santa','Pecera Cascada','Muñeco de Nieve','Ugly Sweater','Rascador para gato','Plato de Bambú','Correa Azul','Arnés para perro','total'],
      total:0,
      card:'',
      expdate:'',
      cvv:''
    }),

    methods: {
      submit () {
        this.$refs.observer.validate()
      },
      getTotal(){
        if(this.$cookie.get('total') != null){
          this.total = this.$cookie.get('total')
        }
      },
      pay(){
        this.productNames.forEach(element => {
          if(this.$cookie.get(element) != null){
            this.$cookie.delete(element)
          }
        });
      }
    },
    mounted: function(){
      this.getTotal()
    }
  }
</script>