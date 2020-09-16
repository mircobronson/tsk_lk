import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import auth from './auth'

Vue.use(Vuex)

// test value
// like calculations?pa_uid=eq.93f87953-2aab-11e9-a236-0cc47adb9e09'
const urlAPI = 'http://192.168.1.50:3001/'
const TestPa = '93f87953-2aab-11e9-a236-0cc47adb9e09'
const TestDevice = 'e7c845bb-a9ec-11e9-a243-0cc47adb9e09'

const store = () =>
  new Vuex.Store({
    state: {
      error: null,
      calculations: [],
      devices: [],
      deviceReadings: []
    },
    mutations: {
      setError (state, error) {
        state.error = error
      },
      clearError (state) {
        state.error = null
      },
      SET_CALCULATIONS_TO_STATE: (state, calculations) => {
        state.calculations = calculations
      },
      SET_DEVICES_TO_STATE: (state, devices) => {
        state.devices = devices
      },
      SET_DEVICESREADINGS_TO_STATE: (state, deviceReadings) => {
        state.deviceReadings = deviceReadings
      }
    },
    actions: {
      GET_CALCULATION ({ commit }) {
        return axios(urlAPI + 'calculations?pa_uid=eq.' + TestPa, {
          method: 'GET'
        })
          .then((calculations) => {
            commit('SET_CALCULATIONS_TO_STATE', calculations.data)
            return calculations
          })
          .catch((error) => {
            console.log(error)
            return error
          })
      },
      GET_DEVICES ({ commit }) {
        return axios(urlAPI + 'mdevices?pa_uid=eq.' + TestDevice, {
          method: 'GET'
        })
          .then((devices) => {
            commit('SET_DEVICES_TO_STATE', devices.data)
            return devices
          })
          .catch((error) => {
            console.log(error)
            return error
          })
      },
      GET_DEVICESREADINGS ({ commit }) {
        return axios(urlAPI + 'mdevice_readings?pa_uid=eq.' + TestDevice, {
          method: 'GET'
        })
          .then((deviceReadings) => {
            commit('SET_DEVICESREADINGS_TO_STATE', deviceReadings.data)
            return deviceReadings
          })
          .catch((error) => {
            console.log(error)
            return error
          })
      }
    },
    getters: {
      error: s => s.error,
      CALCULATIONS (state) {
        return state.calculations
      },
      DEVICES (state) {
        return state.devices
      },
      DEVICESREADINGS (state) {
        return state.deviceReadings
      }
    },
    modules: {
      auth
    }
  })

export default store
