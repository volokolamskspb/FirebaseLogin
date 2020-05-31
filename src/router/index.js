import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import firebase from "firebase";
import Signup from '../components/Signup.vue'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import ForgotPassword from '../components/ForgotPassword.vue'
import NotFound from '../components/NotFound.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  { 
    path: '*', 
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('setLoading', true)
  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        store.commit('setUser', user)
        if(to.name == 'login' || to.name == 'signup'){
          next({ name: 'home' })
        }
      }
      else if(to.name == 'home') {
        next({ name: 'login' })
      }
  });
  next()
  setTimeout(() => store.commit('setLoading', false), 500)
})

export default router

