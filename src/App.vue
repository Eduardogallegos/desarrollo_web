<template>
  <v-app>
    <header>
      <v-system-bar color="deep-purple darken-3"></v-system-bar>
    </header>
    <v-main>
      <v-row>
        <v-col
          md="2"
        >
          <SideMenu 
            v-if="logged"
            :name="username"
            :email="usermail"
          ></SideMenu>
        </v-col>
        <v-col
          sm="6"
          md="8"
        >
          <router-view/>
        </v-col>
        <v-col md="2" >
          <div id="logo" @click="toHome">
            <v-img
              width="180" 
              src="@/assets/logo.png"
            ></v-img>
          </div>
        </v-col>
      </v-row>
    </v-main>

    <v-footer>
      <Footer/>
    </v-footer>
  </v-app>
</template>

<script>
import SideMenu from './components/side_menu'
import Footer from './components/footer'
import axios from 'axios'

export default {
  name: 'App',

  components: {
    SideMenu,
    Footer
  },

  data: () => ({
    logged:false,
    username:'',
    usermail:''
  }),
  methods:{
    toHome(){
      this.$router.push({ path: '/productos' })
    },
    hideMenu(path){
      let not_logged_paths = ['/', '/log-in', '/sign-in']
      if (!not_logged_paths.includes(path)){
        this.logged=true
        this.check_name()
      }else{
        this.logged=false
      }
    },
    check_name(){
      if(this.username === '' && this.usermail === ''){
        this.usermail = this.$cookie.get('username')
        let token = this.$cookie.get('token')
        let body = {
          username: this.usermail,
          token: token
        }
        let ctx = this;
        axios.post('https://7bdqs9pwc4.execute-api.us-east-1.amazonaws.com/default/custinfo', body)
        .then (response => {
          ctx.username = response.data.cust_info.nombre + ' ' + response.data.cust_info.apellidoP
        }).catch(error => {
          alert('No se pudo obtener informacion del usuario')
          console.log(error)
        })
      }
    }
  },
  mounted:function(){
    this.hideMenu(this.$router.currentRoute.path) 
  },
  watch:{
    $route (to, from){
      console.log(from.query)
      this.hideMenu(to.fullPath)
    }
  }
};
</script>
