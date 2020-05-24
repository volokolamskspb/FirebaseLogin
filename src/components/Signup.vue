<template>
    <div class="vue-tempalte">
        <v-form   
        ref="form"
        :lazy-validation="lazy"
        v-model="valid">
             <v-row>
              <v-col cols="12" sm="12">
                <v-text-field 
                  label="Имя"
                  required
                  v-model="name" :rules="nameRules"/>
                </v-col>
                <v-col cols="12" sm="12">
                <v-text-field 
                  label="E-mail"
                  type="email"
                  required
                  v-model="email" 
                  :rules="emailRules" />
                </v-col>
                <v-col cols="12" sm="12">
                <v-text-field 
                  label="Пароль" 
                  type="passowrd"
                  required
                  v-model="password" 
                  :rules="passwordRules"/>
                </v-col>
               <v-col cols="12" sm="12">
                <v-btn @click="userRegistration" class="btn btn-dark btn-lg btn-block" :disabled="!valid">
                   Регистрация
                </v-btn>
              </v-col>
              <v-col cols="12" sm="12">
              <p class="forgot-password text-right">
                  Уже зарегистрированы? 
                  <router-link :to="{name: 'login'}">Войти</router-link>
              </p>
            </v-col>
                 </v-row>
        </v-form>

    </div>
</template>


<script>
import firebase from "firebase";


export default {
    data: () => ({
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Имя должно быть не более 10 букв',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail не валиден',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/.test(v) || 'Пароль должен состоять из букв верхнего и нижнего регистра, цифр и быть не менее 6 и не более 10 символов',
      ],
      valid: true,
      lazy: false,
    }),
    mounted() {
      this.$refs.form.validate();
    },
    methods: {
    userRegistration() {
      this.$refs.form.validate()
      if(!this.valid) return;
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then((res) => {
        res.user
          .updateProfile({
            displayName: this.name
          })
          .then(() => {              
            res.user.sendEmailVerification()
              .then((res) => {
                console.log(res)
                this.$router.push('/login')
              })
              .catch((error) => {
                console.log(error.message);
              });
          });
      })
      .catch((error) => {
         console.log(error.message);
      });
    }
  }
};
</script>

