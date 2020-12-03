<template>
  <v-card class="mx-auto">
    <v-toolbar
      color="indigo"
      dark
    >
      <v-toolbar-title>Carrito</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-simple-table>
      <thead>
        <th></th>
        <th>Producto</th>
        <th>Precio</th>
        <th>Cantidad</th>
        <th>Fecha de compra</th>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.name">
          <td class="text-center"><v-avatar><v-img :src="item.imgURL"></v-img></v-avatar></td>
          <td class="text-center">{{item.name}}</td>
          <td class="text-center">$ {{item.price}}</td>
          <td class="text-center">{{item.cantidad}}</td>
          <td class="text-center">{{item.fecha}}</td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-card-actions>
      <v-col align-self="start">
        <v-btn block color="warning" :to="{path:'/pagar'}"><v-icon>mdi-cash-check</v-icon>Pagar</v-btn>
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name:'historial',
  data () {
      return {
       items: [
          {imgURL:'https://randomuser.me/api/portraits/lego/2.jpg', name:'Sudadera bien perrota', description:'talla chica', stock:'2', price:123, cantidad:'2'},
          {imgURL:'https://randomuser.me/api/portraits/lego/2.jpg', name:'Sudadera bien', description:'talla chica', stock:'2', price:123, cantidad:'2'},
          {imgURL:'https://randomuser.me/api/portraits/lego/2.jpg', name:'Sudadera', description:'talla chica', stock:'2', price:123, cantidad:'2'},
          {imgURL:'https://randomuser.me/api/portraits/lego/2.jpg', name:'Perrota', description:'talla chica', stock:'2', price:123, cantidad:'2'},
        ],
      }
    },
}
</script>

<style>

</style>