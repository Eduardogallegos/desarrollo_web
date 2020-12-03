<template>
<div>
<v-card
    class="mx-auto"
    width="100%"
    height="350"
    tile
  >
    <v-img
      height="100%"
      src="https://picsum.photos/id/237/1200/1050"
    >
      <v-row
        align="end"
        class="fill-height"
      >
        <v-col
          align-self="end"
          class="pa-0"
          cols="12"
        >
          <v-avatar
            class="profile"
            color="grey"
            size="164"
          >
            <v-img :src="photo"></v-img>
          </v-avatar>
        </v-col>
      </v-row>
    </v-img>
    <v-card-text>
      <v-simple-table>
        <tbody>
          <tr v-for="(value, key) in cust_info" :key="key">
            <th>{{key}}</th>
            <td>{{value}}</td>
            <td><v-btn @click="editItem(key, value)"><v-icon>mdi-account-edit</v-icon></v-btn></td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card-text>
    <v-card-actions>
      <!-- <v-btn :to="{path:'/historial'}"> 
        <v-icon>mdi-history</v-icon>
          Ver historico de compras
      </v-btn> -->
      <v-btn
        :to="{path:'/'}"
      >
        <v-icon>mdi-logout</v-icon>
        Cerrar sesion 
      </v-btn>
    </v-card-actions>
    </v-card>
    <v-dialog v-model="edit" >
      <v-card>
        <v-card-title>Editando {{keyToEdit}}</v-card-title>
        <v-card-actions>
          <v-col md="2"></v-col>
          <v-col md="6">
            <v-text-field
              v-model="newInput"
              :label="keyToEdit"
              prepend-icon="mdi-window-close"
              @click:prepend="newInput = ''"
              :rules="rules"
            >
            </v-text-field>
          </v-col>
          <v-col md="2"></v-col>
          <v-col md="4">
            <v-btn @click="edit = false">Cancelar</v-btn>
            <v-btn color="success">Cambiar</v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name:'profile',
  data:()=>({
    cust_info:{
      'Nombre':'',
      'Apellido Paterno':'',
      'Apellido Materno':'',
      'Telefono':''
    },
    photo:'https://randomuser.me/api/portraits/lego/3.jpg',
    edit:false,
    keyToEdit: '',
    newInput:'',
    rules: [
        value => !!value || 'Required.',
      ],
  }),
  methods:{
    editItem(key, value) {
      this.edit=true
      this.keyToEdit = key
      this.newInput = value
    },
    getUserInfo(){
      this.usermail = this.$cookie.get('username')
      let token = this.$cookie.get('token')
      let body = {
        username: this.usermail,
        token: token
      }
      let ctx = this;
      axios.post('https://7bdqs9pwc4.execute-api.us-east-1.amazonaws.com/default/custinfo', body)
      .then (response => {
        ctx.cust_info.Nombre = response.data.cust_info.nombre
        ctx.cust_info['Apellido Paterno'] = response.data.cust_info.apellidoP
        ctx.cust_info['Apellido Materno'] = response.data.cust_info.apellidoM
        ctx.cust_info.Telefono = response.data.cust_info.telefono
        console.log(response.data.cust_info)
      }).catch(error => {
        alert('No se pudo obtener informacion del usuario')
        console/location(error)
      })
    }
  },
  mounted:function(){
    this.getUserInfo()
  }
}
</script>

<style>

</style>