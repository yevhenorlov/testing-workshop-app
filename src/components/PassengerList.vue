<script lang="ts">
export default {
  name: 'PassengerList',
  props: ['passengers']
}
</script>

<template>
  <ul class="mb-8 grid gap-8 border-2 border-dashed p-8">
    <li class="mb-2 grid grid-cols-4 gap-16 underline">
      <div>PASSENGER</div>
      <div>HEIGHT (CM)</div>
      <div>MASS (KG)</div>
    </li>
    <li v-for="passenger in passengers" :key="passenger.name" class="grid grid-cols-4 gap-16">
      <div>{{ passenger.name }}</div>
      <div>{{ passenger.height }}</div>
      <div>{{ passenger.mass }}</div>
      <button @click="$emit('remove', passenger.name)" class="text-red-500 hover:text-white">
        x
      </button>
    </li>
  </ul>
</template>
