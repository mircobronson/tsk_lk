<template>

    <!-- <select v-model="selectedMonth">
        <option v-for="month in months" v-bind:value="month.month" v-bind:key="month.month" >{{month.month}} </option>
    </select> -->
<v-card>
  <v-btn color="primary" icon @click="PaySelected"> <v-icon right >mdi-money</v-icon> Оплатить выбранные строки</v-btn>
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
    :items="calculations.data"
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
import axios from 'axios'
export default {
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
      months: [],
      calculations: []
    }
  },
  mounted () {
    axios
      .get('http://192.168.1.50:3001/months')
      .then(response => (this.months = response))
    axios
      .get('http://192.168.1.50:3001/calculations')
      .then(response => (this.calculations = response))
  },
  methods: {
    PaySelected () {
      // this.$v.$touch();
      // this.$router.push("/lkapp");
    }
  }
}
</script>
