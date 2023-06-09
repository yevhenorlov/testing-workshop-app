<script lang="ts">
import PreflightCheck from '@/components/PreflightCheck.vue'
import AddPassenger from '@/components/AddPassenger.vue'
import PassengerList from '@/components/PassengerList.vue'
import { fetchPassengers } from '@/api'
/* import { mockFetchPassengers as fetchPassengers } from '@/utils/mocks' */
import type { Passenger } from '@/types'
import { CEILING_HEIGHT, CARRYING_CAPACITY } from '@/constants'
import i18n from '@/mixins/i18n'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: { AddPassenger, PreflightCheck, PassengerList },
  data(): {
    isLoading: boolean
    isLaunched: boolean
    passengers: Passenger[]
  } {
    return {
      isLoading: true,
      isLaunched: false,
      passengers: []
    }
  },
  mixins: [i18n],
  watch: {
    passengers(passengers) {
      console.log({ passengers })
    },
    totalMass(totalMass) {
      console.log({ totalMass })
    },
    maxHeight(maxHeight) {
      console.log({ maxHeight })
    }
  },
  methods: {
    async getPassengers() {
      try {
        this.isLoading = true
        const { data } = await fetchPassengers()
        const passengers = data.results
        this.passengers = this.preparePassengers(passengers)
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
    },
    handleLaunch() {
      this.isLaunched = true
    },
    handleAddPassenger(passenger: Passenger) {
      const newPassengers = [...this.passengers, passenger]
      this.passengers = newPassengers
    },
    handleRemovePassenger(id: Passenger['name']) {
      this.passengers = this.passengers.filter(({ name }) => name !== id)
    }
  },
  computed: {
    totalMass() {
      return this.passengers.reduce((total, { mass }) => (total += Number(mass)), 0)
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
  <div v-if="isLaunched" class="flex h-screen w-full items-center justify-center bg-black">
    <video autoplay muted class="w-[1000px]" title="hyperspace">
      <source src="/public/hyperspace.mp4" type="video/mp4" />
    </video>
  </div>
  <div
    v-else
    class="flex h-full min-h-screen w-screen min-w-[1000px] flex-col items-center justify-center"
  >
    <h1 class="mb-4 text-3xl">{{ $t('main.title') }}</h1>
    <p class="mb-16 w-[700px]">{{ $t('main.description') }}</p>
    <div v-if="isLoading">{{ $t('general.loading') }}</div>
    <div v-else>
      <add-passenger @input="handleAddPassenger" />
      <passenger-list class="mb-8" :passengers="passengers" @remove="handleRemovePassenger" />
      <preflight-check :total-mass="totalMass" :max-height="maxHeight" @launch="handleLaunch" />
    </div>
  </div>
</template>
