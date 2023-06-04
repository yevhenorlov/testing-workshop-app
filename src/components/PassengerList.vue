<script lang="ts">
import i18n from '@/mixins/i18n'

export default {
  name: 'PassengerList',
  props: ['passengers'],
  mixins: [i18n]
}
</script>

<template>
  <div class="border-2 border-dashed p-8">
    <div class="mb-16 grid grid-cols-4 gap-4 underline">
      <div>{{ $t('passengerList.passenger') }}</div>
      <div>{{ $t('passengerList.height') }}</div>
      <div>{{ $t('passengerList.mass') }}</div>
    </div>
    <ul class="mb-8 grid gap-8">
      <li v-for="passenger in passengers" :key="passenger.name" class="grid grid-cols-4 gap-4">
        <div>{{ passenger.name }}</div>
        <div>{{ passenger.height }}</div>
        <div>{{ passenger.mass }}</div>
        <button @click="$emit('remove', passenger.name)" class="text-red-500 hover:text-white">
          x
        </button>
      </li>
    </ul>
  </div>
</template>
