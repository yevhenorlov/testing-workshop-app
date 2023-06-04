<script lang="ts">
import type { Passenger } from '@/types'

export default {
  name: 'AddPassenger',
  data() {
    return {
      name: '',
      height: 0,
      mass: 0
    }
  },
  computed: {
    passenger(): Passenger {
      return {
        name: this.name,
        height: String(this.height),
        mass: String(this.mass)
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('input', this.passenger)
      this.name = ''
      this.height = 0
      this.mass = 0
      this.$refs.name.focus()
    }
  }
}
</script>

<template>
  <h3 class="mb-4 text-xl">Add a passenger:</h3>
  <form
    class="mb-8 grid appearance-none grid-cols-2 grid-rows-2 items-center gap-4"
    @submit.prevent="handleSubmit"
    @keyup.enter="handleSubmit"
  >
    <label for="name">Name</label>
    <input ref="name" class="input" name="name" placeholder="name" v-model="name" />
    <label for="height">Height</label>
    <input class="input" type="number" name="height" placeholder="height" v-model="height" />
    <label for="mass">Mass</label>
    <input class="input" type="number" name="mass" placeholder="mass" v-model="mass" />
  </form>
</template>
