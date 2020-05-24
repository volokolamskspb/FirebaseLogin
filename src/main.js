import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as firebase from 'firebase';

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyAIOx1Ad0PsHyD92Qwozv3rlre9zrnwMk0",
    authDomain: "vueregister.firebaseapp.com",
    databaseURL: "https://vueregister.firebaseio.com",
    projectId: "vueregister",
    storageBucket: "vueregister.appspot.com",
    messagingSenderId: "379432126527",
    appId: "1:379432126527:web:776f3154d7ee7e802b908a"
}

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
