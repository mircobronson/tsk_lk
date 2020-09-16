<template>

    <!-- <select v-model="selectedMonth">
        <option v-for="month in months" v-bind:value="month.month" v-bind:key="month.month" >{{month.month}} </option>
    </select> -->
<v-card>
  <v-btn color="primary" @click="PaySelected"><v-icon>mdi-credit-card-outline</v-icon>Оплатить выбранные строки</v-btn>
  <v-card-actions>

     <v-select
          :items="months.data"
          item-text="name"
          item-value="id"
          label="Месяц начислений"
          prepend-icon="mdi-calendar"
        ></v-select>

</v-card-actions>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="CALCULATIONS"
    :single-select="singleSelect"
    item-key="id"
    show-select
    class="elevation-1"

  >
    <template v-slot:top>

        <v-spacer></v-spacer>

   </template>

  </v-data-table>

</v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
export default {
  /* eslint-disable */
  data () {
    return {
      singleSelect: false,
      selected: [],
      selectedMonth: '',
      headers: [
        {
          text: 'Период начисления',
          align: 'start',
          sortable: false,
          value: 'period_name'
        },
        { text: 'Услуга', value: 'service_name' },
        { text: 'Операция', value: 'operation_name' },
        { text: 'Количество', value: 'quantity' },
        { text: 'Сумма', value: 'total' }
      ],
      months: []
    }
  },
  computed: {
    ...mapGetters([
      'CALCULATIONS'
    ])
  },
  mounted () {
    this.GET_CALCULATION()
    axios
      .get('http://192.168.1.50:3001/months')
      .then(response => (this.months = response))
    // axios
    // 690050130040
    //  .get('http://192.168.1.50:3001/calculations?pa_uid=eq.93f87953-2aab-11e9-a236-0cc47adb9e09')
    //  .then(response => (this.calculations = response))
  },
  methods: {
    ...mapActions([
      'GET_CALCULATION'
    ]),
    PaySelected () {
      // this.$v.$touch();
      // this.$router.push("/lkapp");
    }
  }
}
</script>
