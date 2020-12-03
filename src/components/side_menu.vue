<template>
  <v-navigation-drawer
  permanent
  expand-on-hover
  >
  <v-list>
      <v-list-item 
        class="px-2" 
        link
        :to="{'path':'/perfil'}"
      >
      <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/lego/2.jpg"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
          <v-list-item-title class="title">
          {{name}}
          </v-list-item-title>
          <v-list-item-subtitle>{{email}}</v-list-item-subtitle>
      </v-list-item-content>
      </v-list-item>
  </v-list>

  <v-divider></v-divider>

  <v-list
      nav
      dense
  >
      <v-list-item
          v-for = "item in items"
          :key = "item.title"
          :to= "item.path"
      >
      <v-list-item-icon>
          <v-icon>{{item.icon}}</v-icon>
      </v-list-item-icon>
      <v-list-item-title>{{item.title}}</v-list-item-title>
      </v-list-item>
  </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'SideMenu',
    props:['name','email'],
    data () {
      return {
        items: [
          { title: 'Productos', icon: 'mdi-shopping', path:{path: '/productos'} },
          { title: 'Carrito', icon: 'mdi-cart', path:{path: '/carrito'} },
          { title: 'Cerrar sesion', icon: 'mdi-logout', path:{path:'/'}}
        ],
      }
    },
  }
</script>