<script lang="ts">
import PreflightCheck from '@/components/PreflightCheck.vue'
import PassengerList from '@/components/PassengerList.vue'
import { fetchPassengers } from '@/api'
import type { Passenger } from '@/types'
import { CEILING_HEIGHT, CARRYING_CAPACITY } from '@/constants'
import i18n from '@/mixins/i18n'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: { PreflightCheck, PassengerList },
  data(): { isLoading: boolean; passengers: Passenger[] } {
    return {
      isLoading: true,
      passengers: []
    }
  },
  mixins: [i18n],
  methods: {
    async getPassengers() {
      try {
        this.isLoading = true
        const { data } = await fetchPassengers()
        const passengers = data.results
        this.passengers = this.preparePassengers(passengers)
        console.log(this.passengers)
      } catch (err) {
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },
    preparePassengers(passengers: Passenger[]) {
      return passengers
        .filter((passenger) => passenger.mass !== 'unknown')
        .map((passenger) => ({
          ...passenger,
          mass: passenger.mass.replace(',', '') // "1,234" => "1234"
        }))
    }
  },
  computed: {
    totalMass() {
      const res = this.passengers.reduce((total, { mass }) => (total += Number(mass)), 0)
      console.log(res)
      return res
    },
    maxHeight() {
      return this.passengers.reduce(
        (max, { height }) => (max > Number(height) ? max : Number(height)),
        0
      )
    },
    heightLimit() {
      return CEILING_HEIGHT
    },
    massLimit() {
      return CARRYING_CAPACITY
    }
  },
  async mounted() {
    this.getPassengers()
  }
})
</script>

<template>
  <div
    class="flex h-screen w-screen flex-col items-center justify-center bg-gray-900 text-gray-100"
  >
    <h1 class="mb-4 text-3xl">{{ $t('main.title') }}</h1>
    <div class="mb-16">
      <p class="w-[700px]">{{ $t('main.description') }}</p>
    </div>
    <div v-if="isLoading">{{ $t('general.loading') }}</div>
    <div v-else>
      <passenger-list class="mb-8" :passengers="passengers" />
      <preflight-check :total-mass="totalMass" :max-height="maxHeight" />
    </div>
  </div>
</template>
