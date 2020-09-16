<template>
<v-card>
    <v-card-title align="center"> Обращение/заявка </v-card-title>
    <v-select
          :items="typeRequest"
          label="Тип обращения"
        ></v-select>
    <v-card-text>
        <v-text-field
                  :counter="100"
                  label="Обращение"
                  required
                ></v-text-field>
    <v-btn><v-icon>mdi-file-multiple</v-icon>Прикрепить файлы</v-btn>
    </v-card-text>

    <v-btn><v-icon>mdi-email-send-outline</v-icon>Отправить</v-btn>
</v-card>
</template>

<script>
export default {
  data: () => ({
    typeRequest: ['Изменение числа проживающих', 'Изменение собственника', 'Приостановка начислений', 'Заявление на предоставление квитаниции']
  })
}
</script>

<style>

</style>
