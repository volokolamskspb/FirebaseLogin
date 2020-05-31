<template>
    <div class="vue-tempalte">
        <v-form
        ref="form"
        v-model="valid"
        >
        <v-row>
            <v-col cols="12" sm="12">  
                <h3>Войти в систему</h3>
                <div v-if="error">{{error}}</div>
            </v-col>
            <v-col cols="12" sm="12">  
            <v-text-field
              v-model="email"
               type="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">  
            <v-text-field  
                label="Пароль" 
                type="password" 
                v-model="password"
                @keyup.enter="userLogin" 
                :rules="passwordRules" />
            </v-col>
            <v-col cols="12" sm="12">  
                <v-btn @click="userLogin" :disabled="!valid" class="btn btn-dark btn-lg btn-block">Войти</v-btn>

                <p class="forgot-password text-right mt-2 mb-4">
                    <router-link to="/forgot-password">Забыли пароль ?</router-link>
                </p>
                <p class="forgot-password text-right">
                    <router-link :to="{name: 'signup'}">Зарегистрироваться</router-link>
                </p>
            </v-col>
        </v-row>
        </v-form>
    </div>
</template>


<script>
import firebase from "firebase";

export default {
  data() {
    return {
      error: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      valid: true,
    };
  },

  mounted() {
    this.$refs.form.validate();
  },
  methods: {
    userLogin() {
      if(!this.valid) return;
        firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
            this.$router.push('/')
        })
        .catch((error) => {
          this.error = error.message; 
        });
    }
  }
};
</script>