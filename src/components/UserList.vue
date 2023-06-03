<script lang="ts">
export default {
  name: 'UserList',
  props: ['users']
}
</script>

<template>
  <ul class="grid gap-8">
    <li class="mb-2 grid grid-cols-3 gap-16 underline">
      <div>PASSENGER</div>
      <div>HEIGHT (CM)</div>
      <div>MASS (KG)</div>
    </li>
    <li v-for="user in users" :key="user.name" class="grid grid-cols-3 gap-16">
      <div>{{ user.name }}</div>
      <div>{{ user.height }}</div>
      <div>{{ user.mass }}</div>
    </li>
  </ul>
</template>
