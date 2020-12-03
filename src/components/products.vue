<template>
<v-container>
  <v-card>
    <v-app-bar
      color="deep-purple accent-4"
    >
     <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        v-show="rSearching"
        label="Busca productos"
        prepend-icon="mdi-window-close"
        @click:prepend="searching"
        @change="searchProducts"
        dark
      >
      </v-text-field>
      <v-btn icon>
        <v-icon color="white" @click="searching">mdi-magnify</v-icon>
      </v-btn>
  </v-app-bar>
    <!-- <h1>Aqui van los productos</h1> -->
    <v-row>
      <v-col
        v-for="product in products"
        :key="product.nombre"
      >
        <productCard
          :name="product.nombre"
          :imgURL="product.imgURL"
          :description="product.descripcion"
          :stock="product.stock"
          :rate="product.Rate"
          :price="product.precio"
        >
        </productCard>
      </v-col>
    </v-row>
  </v-card>
</v-container>
</template>

<script>
import productCard from './product'
import axios from 'axios'
export default {
    name:'Products',
    data: () => ({
      products:[],
      search:'',
      allProducts:[],
      rSearching:false,
    }),
    components:{
      productCard
    },
    methods:{
      getProducts(){
        axios.get("https://7bdqs9pwc4.execute-api.us-east-1.amazonaws.com/default/getproducts")
        .then(response=>{
          console.log(response.data)
          this.allProducts = response.data.productos
          this.products = this.allProducts
        })
      },
      searchProducts(){
        let results = []
        this.allProducts.forEach(product => {
          if(product.nombre.toUpperCase().includes(this.search.toUpperCase())){
            results.push(product)
          }
        });
        this.products = results
      },
      searching(){
        if(this.rSearching){
          this.rSearching = false
          this.search = ''
          this.products = this.allProducts
        }else{
          this.rSearching = true
        }
      }
    },
    mounted: function(){
      this.getProducts()
    }
}
</script>

<style>

</style>