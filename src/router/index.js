import Vue from 'vue'
import Router from 'vue-router';
import VueCookie from 'vue-cookie'
import products from '@/components/products';
import profile from '@/components/profile';
import cart from '@/components/cart'
import index from '@/components/init'
import signIn from '@/components/sign_in'
import logIn from '@/components/log_in'
import changePassword from '@/components/pass_change'
import pay from '@/components/pay'
import validateAccount from '@/components/validate_account'
// import historial from '@/components/historial'

Vue.use(Router);
Vue.use(VueCookie);

const routes = [
    {
        path:'/', 
        name:'Index',
        component:index
    },
    {
        path:'/sign-in', 
        name:'Sign in',
        component:signIn
    },
    {
        path:'/log-in', 
        name:'Log in',
        component:logIn
    },
    {
        path:'/change-password', 
        name:'change password',
        component:changePassword
    },
    {
        path:'/validate-account', 
        name:'Validate account',
        component:validateAccount
    },
    {
        path:'/pagar', 
        name:'Payment',
        component:pay
    },
    // {
    //     path:'/historial', 
    //     name:'historial',
    //     component:historial
    // },
    {
        path:'/productos', 
        name:'productos',
        component:products
    },
    {
        path:'/perfil',
        name:'perfil',
        component:profile
    },
    {
        path:'/carrito',
        name:'carrito',
        component:cart
    }
];

export default new Router({
  routes:routes,
  mode:'history'
});