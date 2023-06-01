<script lang="ts">
export default {
  name: 'UserList',
  props: ['users']
}
</script>

<template>
  <ul class="grid gap-8">
    <li class="grid grid-cols-3 gap-8 underline mb-2">
      <div>name</div>
      <div>height</div>
      <div>mass</div>
    </li>
    <li v-for="user in users" :key="user.name" class="grid grid-cols-3 gap-8">
      <div>{{ user.name }}</div>
      <div>{{ user.height }}cm</div>
      <div>{{ user.mass }}kg</div>
    </li>
  </ul>
</template>
