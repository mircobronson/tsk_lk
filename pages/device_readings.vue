<template>
<v-card>

 <v-col
          v-for="(device, id) in devices.data"
          :key="id"
          cols="12"
                  >
         <v-card>
          <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                <v-card-title
                  class="headline"
                  v-text="device.name"
                >
                 <v-icon large  left >mdi-alarm-plus</v-icon>
                </v-card-title>
                        <v-card-subtitle>{{device.service_name}}</v-card-subtitle>
                 <!-- <v-card-text> {{device.service_name}} </v-card-text>-->
            <v-text-field
                  v-model.trim="read"
                  :error-messages="readErrors"
                  :counter="10"
                  label="Показание"
                  required
                  @input="$v.read.$touch()"
                  @blur="$v.read.$touch()"
                ></v-text-field>
               <!-- <v-card-subtitle v-text="device.name"></v-card-subtitle> -->
              </div>
             </div>

          </v-card>
   </v-col>
  <v-card-actions>

</v-card-actions>
<v-btn color="primary" icon @click="SayReadings"> <v-icon left >mdi-money</v-icon> Передать</v-btn>
</v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  head: {
    title: 'Вход в кабинет ТСК'
  },
  mixins: [validationMixin],
  validations: {
    read: { required, maxLength: maxLength(10) },
    select: { required },
    checkbox: {
      checked (val) {
        return val
      }
    }
  },
  data () {
    return {
      singleSelect: true,
      selected: [],
      selectedDevice: '',
      devices: [],
      device_readings: []
    }
  },
  computed: {
    /* eslint-disable */
    readErrors () {
      const errors = [];
      if (!this.$v.read.$dirty) return errors;
      !this.$v.read.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.read.required && errors.push("Значение не заполнено.");
      return errors;
    },
   },
  mounted () {
    axios
      .get('http://192.168.1.50:3001/devices')
      .then(response => (this.devices = response))
    axios
      .get('http://192.168.1.50:3001/device_readings')
      .then(response => (this.device_readings = response))
  },
  methods: {
    SayReadings () {
      // this.$v.$touch();
      // this.$router.push("/lkapp");
    }
  }
}
</script>
