<template>
  <v-app app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link @click.native="$router.push('/lkapp')">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Главная</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="GoCalculation">
          <v-list-item-action>
            <v-icon>mdi-calculator</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Начисления</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item link @click.native="$router.push('/device_readings')">
          <v-list-item-action>
            <v-icon>mdi-alarm-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Передать показания</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item link @click.native="$router.push('/user_request')">
          <v-list-item-action>
            <v-icon>mdi-comment-processing</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Обращения</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-bookmark-check</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Оплата</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Написать</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Личный кабинет <div v-show="USERINFO">{{USERINFO.name}} </div></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.native="GetInfo">
          <v-icon>mdi-account</v-icon>
                  </v-btn>
        <v-btn icon @click.native="LogOut">
          <v-icon>mdi-logout</v-icon>
        </v-btn>

    </v-app-bar>

    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <nuxt/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; {{ new Date().getFullYear() }} oaotsk</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'empty',
  props: {
    source: String
  },
  computed: {
    ...mapGetters([
      'USERINFO'
    ])
  },
  data: () => ({
    drawer: null
  }),
  methods: {
    async LogOut () {
      await this.$store.dispatch('LOGOUT')
      this.$router.push('/')
    },
    GetInfo () {
      this.$router.push('lkapp')
    },
    GoCalculation () {
      this.$router.push('calculation')
    }
  },
  head () {
    return {
      title: 'Кабинет',
      link: [
        { rel: 'icon', type: 'image/png', href: '/delete_ic.png' }
      ]
    }
  }
}
</script>
