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
        <th></th>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.name">
          <td class="text-center"><v-avatar><v-img :src="item.imgURL"></v-img></v-avatar></td>
          <td class="text-center">{{item.name}}</td>
          <td class="text-center">$ {{item.price}}</td>
          <td class="text-center">{{item.cantidad}}</td>
          <td class="text-center">
            <v-btn @click="add(item)" class="mx-2" fab dark small color="success"><v-icon>mdi-plus</v-icon></v-btn>
            <v-btn @click="substract(item)"  class="mx-2" fab dark small color="error"><v-icon>mdi-minus</v-icon></v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-card-actions>
      <v-col md="2"><v-card-title class="justify-center" >Total: ${{total}}</v-card-title></v-col>
      <v-col align-self="start">
        <v-btn block color="warning" @click="pagar" ><v-icon>mdi-cash-check</v-icon>Pagar</v-btn>
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name:'cart',
  data () {
      return {
        productNames: ['Chamarra Santa','Pecera Cascada','Muñeco de Nieve','Ugly Sweater','Rascador para gato','Plato de Bambú','Correa Azul','Arnés para perro'],
        items: [],
        total:0,
      }
    },
    methods:{
      get_products(){
        this.productNames.forEach(element => {
          if(this.$cookie.get(element) != null){
            let productValue = JSON.parse(this.$cookie.get(element))
            productValue["cantidad"] = 1
            this.items.push(productValue)
          }
        });
        this.getTotal()
      },
      getTotal(){
        let ttl = 0
        this.items.forEach(element => {
          ttl += (element.cantidad * element.price)
          console.log(element)
        });
        this.total = ttl
      },
      add(item){
        if(item.cantidad < item.stock){
          item.cantidad ++
          this.getTotal()
        }else{
          alert('Ya no hay mas productos en stock')
        }
      },
      substract(item){
        if(item.cantidad > 1){
          item.cantidad --
        }else if (item.cantidad == 1){
          let index = this.items.indexOf(item)
          if(index > -1){
            this.items.splice(index,1)
          }
        }
        this.getTotal()
      },
      pagar(){
        this.items.forEach(element => {
          let product = JSON.stringify({name: element.name, description: element.description, imgURL: element.imgURL, stock: element.stock, price:element.price, cantidad:element.cantidad})
          this.$cookie.set(element.name, product, 1)
        });
        this.$cookie.set('total', this.total, 1)
        this.$router.push({path: 'pagar'})
      }
    },
    mounted: function(){
      this.get_products()
    }
}
</script>

<style>

</style>