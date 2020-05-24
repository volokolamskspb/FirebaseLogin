<template>
    <div class="vue-tempalte">
      <v-row>
        <v-col cols="12" sm="12">
          <p class="text-right">Добро Пожаловать, {{user.displayName}}</p>
          <p class="text-right">{{user.email}}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
        <v-btn 
        class="btn btn-dark btn-lg btn-block"
        @click="logOut()">
            Выйти
        </v-btn>
      </v-col>
    </v-row>
    </div>
</template>

<script>
import firebase from "firebase";
import { mapState } from 'vuex';

export default {
  data() {
    return {
      
    };
  },
  computed: mapState(['user']),
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          console.log(user);
          this.$store.commit('setUser', user)
      } else {
        this.$router.push('/login')
      }
    });
  },
  methods: {
    logOut() {
      firebase.auth().signOut().then(() => {
        firebase.auth().onAuthStateChanged(() => {
          this.$router.push('/login')
        })
      })
    }
  }
};
</script>
