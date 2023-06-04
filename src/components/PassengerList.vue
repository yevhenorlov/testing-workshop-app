<script lang="ts">
export default {
  name: 'PassengerList',
  props: ['passengers']
}
</script>

<template>
  <ul class="grid gap-8">
    <li class="mb-2 grid grid-cols-3 gap-16 underline">
      <div>PASSENGER</div>
      <div>HEIGHT (CM)</div>
      <div>MASS (KG)</div>
    </li>
    <li v-for="passenger in passengers" :key="passenger.name" class="grid grid-cols-3 gap-16">
      <div>{{ passenger.name }}</div>
      <div>{{ passenger.height }}</div>
      <div>{{ passenger.mass }}</div>
    </li>
  </ul>
</template>
