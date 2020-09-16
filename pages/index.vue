<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Личный кабинет</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model.trim="email"
                  :error-messages="emailErrors"
                  :counter="100"
                  label="email"
                  required
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                ></v-text-field>
                <v-text-field
                  v-model.trim="password"
                  :error-messages="passwordErrors"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  label="Пароль"
                  required
                  @input="$v.password.$touch()"
                  @blur="$v.password.$touch()"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <!-- <v-btn class="mr-4" @click="submit">submit</v-btn> -->
              <!-- <v-btn @click="clear">clear</v-btn> -->
              <v-btn color="primary" @click="Login">Войти</v-btn>
              <v-btn color="primary" @click="Signup">Регистрация</v-btn>

            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { email, required, maxLength } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  layout: 'empty',
  head: {
    title: 'Вход в кабинет ТСК'
  },
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required, maxLength: maxLength(100) }
  },
  data: () => ({
    email: '',
    password: '',
    showPassword: false
  }),
  computed: {
    ...mapGetters([
      'USERINFO'
    ]),
    /* eslint-disable */
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("e-mail должен быть правильно заполнен");
      !this.$v.email.required && errors.push("поле обязательно");
      return errors;
    },
     passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
        !this.$v.password.required && errors.push("Не заполнен пароль.");
      return errors;
    }
  },
  methods: {
    async Login() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        //console.log('submit!')
      } else {
        const formData = {
          email: this.email,
          password: this.password
        };
        try {
          await this.$store.dispatch('LOGIN',{formData})
          this.$router.push("/lkapp")
        } catch (error) {}
      }
    },
    Signup() {
      this.$v.$touch();
      this.$router.push("/registration");
    },
    clear() {
      this.$v.$reset();
      this.email = "";
      this.password = "";
    },
  },
};
</script>

