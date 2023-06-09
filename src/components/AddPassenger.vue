<script lang="ts">
import i18n from '@/mixins/i18n'
import type { Passenger } from '@/types'

export default {
  name: 'AddPassenger',
  data() {
    return {
      name: '',
      height: '',
      mass: ''
    }
  },
  mixins: [i18n],
  emits: ['input'],
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
      this.height = ''
      this.mass = ''
      this.$refs.name.focus()
    }
  }
}
</script>

<template>
  <h3 class="mb-4 text-xl">{{ $t('addPassenger.title') }}:</h3>
  <form
    class="mb-8 grid appearance-none grid-cols-2 grid-rows-2 items-center gap-4"
    @submit.prevent="handleSubmit"
    @keyup.enter="handleSubmit"
    autocomplete="off"
  >
    <label for="name">{{ $t('addPassenger.name') }}</label>
    <input ref="name" class="input" name="name" placeholder="name" v-model="name" />
    <label for="height">{{ $t('addPassenger.height') }}</label>
    <input class="input" type="number" name="height" placeholder="height" v-model="height" />
    <label for="mass">{{ $t('addPassenger.mass') }}</label>
    <input class="input" type="number" name="mass" placeholder="mass" v-model="mass" />
  </form>
</template>
