import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import firebase from "firebase";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../components/Signup.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../components/ForgotPassword.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../components/Home.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged((user) => {
      if (user && !store.state.user.displayName) {
        store.commit('setUser', user)
      } else if(to.name == 'home') {
        next({ name: 'login' })
      }
  });
  next()
})

export default router

