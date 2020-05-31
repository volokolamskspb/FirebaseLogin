import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as firebase from 'firebase';
import { default as firebaseConfig }  from '../firebase.js'
import '@/assets/css/main.css'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
