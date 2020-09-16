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
                  v-model="name"
                  :error-messages="nameErrors"
                  :counter="100"
                  label="Имя"
                  required
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                ></v-text-field>
                 <v-text-field
                  v-model="password"
                  :error-messages="passwordErrors"
                  :counter="100"
                  label="Пароль"
                  required
                  @input="$v.password.$touch()"
                  @blur="$v.password.$touch()"
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  :error-messages="emailErrors"
                  label="E-mail"
                  required
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                ></v-text-field>
                 <v-select
                  v-model="select"
                  :items="items"
                  :error-messages="selectErrors"
                  label="Вид потребителя"
                  required
                  @change="$v.select.$touch()"
                  @blur="$v.select.$touch()"
                ></v-select>
                <v-checkbox
                  v-model="checkbox"
                  :error-messages="checkboxErrors"
                  label="Согласен с условиями использования сервиса "
                  required
                  @change="$v.checkbox.$touch()"
                  @blur="$v.checkbox.$touch()"
                ></v-checkbox>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <!-- <v-btn class="mr-4" @click="submit">submit</v-btn> -->
              <!-- <v-btn @click="clear">clear</v-btn> -->
              <!--<v-btn color="primary" @click="Login">Войти</v-btn>-->
              <v-btn color="primary" @click="SignUp">Зарегистрироваться</v-btn>

            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

export default {
  layout: 'empty',
  head: {
    title: 'Регистрация в кабинет ТСК'
  },
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(100) },
    password: { required, minLength: minLength(5) },
    email: { required, email },
    select: { required },
    checkbox: {
      checked (val) {
        return val
      }
    }
  },
  data: () => ({
    name: '',
    password: '',
    email: '',
    select: null,
    items: ['Физическое лицо', 'Юридическое лицо', 'Индивидуальный предприниматель'],
    checkbox: false
  }),
  computed: {
    checkboxErrors () {
      const errors = []
      /* eslint-disable */
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("Вы должны согласится с условиями");
      /* eslint-disable */
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Поле обязательно к заполнению");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Имя должно быть короче 100 символов");
      !this.$v.name.required && errors.push("поле обязательно");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Пароль должен быть длиннее 5 символов");
      !this.$v.password.required && errors.push("поле обязательно");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("e-mail должен быть правильно заполнен");
      !this.$v.email.required && errors.push("поле обязательно");
      return errors;
    },
  },
  methods: {
    async SignUp() {
      this.$v.$touch();
      if (this.$v.$invalid) {
         //console.log('reg!')
      } else {
        const formData = {
          name: this.name,
          email: this.email,
          password: this.password
        };
        try {
          await this.$store.dispatch('SIGNUP',{formData})
          this.$router.push("/")
        } catch (error) {}
      }
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = false;
    },
  },
};
</script>

