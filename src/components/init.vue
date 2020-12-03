<template>
  <div>
    <v-card width="1200">
      <v-row align="center">
        <v-col md="6" align-self="center">
          <v-card-title class="mytitle">Bienvenido a Pexco</v-card-title>
          <v-card-text class="">La tienda online donde consentirás a tu mascota</v-card-text>
        </v-col>
        <v-col md="6">
          <v-img
            width="200" 
            src="@/assets/logo.png"
          ></v-img>
        </v-col>
      </v-row>
      <v-card-actions class="justify-center">
        <v-btn
          color="blue"
          :to="{path:'/log-in'}"
        >
          login
        </v-btn>
        <v-btn
          color="success"
          :to="{path:'/sign-in'}"
        >
            signin
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
 name:'index',
 methods:{
    deleteCookies(){
      let cookies = ['Chamarra Santa','Pecera Cascada','Muñeco de Nieve','Ugly Sweater','Rascador para gato','Plato de Bambú','Correa Azul','Arnés para perro','total']
      cookies.forEach(element => {
        if(this.$cookie.get(element) != null){
          this.$cookie.delete(element)
        }
      });
    }
 },
  mounted:function(){
    this.deleteCookies()
  }
}
</script>

<style>
.mytitle{
  font-size: 50px;
  color:rgb(73, 73, 218);
}
</style>