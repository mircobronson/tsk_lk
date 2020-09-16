import firebase from 'firebase/app'
import axios from 'axios'

const urlAPI = 'http://192.168.1.50:3001/'

export default {
  state: {
    userInfo: {
      name: '',
      email: '',
      password: '',
      token: '',
      uid: '',
      personal_account: []
    }
  },
  mutations: {
    SET_USERINFO_TO_STATE: (state, user) => {
      state.userInfo.name = user.email
      state.userInfo.email = user.email
      state.userInfo.uid = user.uid
    },
    SET_USERS_TO_STATE: (state, users) => {
      state.users = users
    },
    REGISTER: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },
  actions: {
    // user login + set settings to store
    async LOGIN ({ dispatch, commit }, data) {
      try {
        await firebase.auth().signInWithEmailAndPassword(data.formData.email, data.formData.password)
        const user = firebase.auth().currentUser
        if (user != null) {
          commit('SET_USERINFO_TO_STATE', user)
          // await dispatch('SET_USER_PAI', user)
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    // user signup + set settings to store + set settings to PAI
    async SIGNUP ({ dispatch, commit }, data) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(data.formData.email, data.formData.password)
        // const uid = await dispatch('getUid')
        const user = firebase.auth().currentUser
        if (user != null) {
          // commit('SET_USER_PAI', user)
          commit('SET_USERINFO_TO_STATE', user)
          await dispatch('SET_USER_PAI', user)
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    // set settings to PAI
    async SET_USER_PAI ({ dispatch, commit }, userdata) {
      let username = ''
      if (userdata.name == null) {
        username = userdata.email
      } else {
        username = userdata.name
      }

      await axios(urlAPI + 'users', {
        method: 'post',
        data: {
          name: username,
          uid: userdata.uid,
          email: userdata.email
        }
      })
    },
    getUid () {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async LOGOUT () {
      await firebase.auth().signOut()
    }
  },
  getters: {
    USERINFO (state) {
      return state.userInfo
    }
  }
}
