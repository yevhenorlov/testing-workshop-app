<script lang="ts">
import PreflightCheck from './components/PreflightCheck.vue'
import UserList from './components/UserList.vue'
import { fetchUsers } from './api'
import type { User } from './types'
import { CEILING_HEIGHT, CARRYING_CAPACITY } from './constants'

export default {
  name: 'App',
  components: { PreflightCheck, UserList },
  data(): { isLoading: boolean; users: User[] } {
    return {
      isLoading: true,
      users: []
    }
  },
  methods: {
    async getUsers() {
      try {
        this.isLoading = true
        const { data } = await fetchUsers()
        const users = data.results
        console.log(users)
        this.users = this.prepareUsers(users)
      } catch (err) {
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },
    prepareUsers(users: User[]) {
      return users
        .filter((user) => user.mass !== 'unknown')
        .map((user) => ({
          ...user,
          mass: user.mass.replace(',', '') // "1,234" => "1234"
        }))
    }
  },
  computed: {
    totalMass() {
      return this.users.reduce((total, { mass }) => (total += Number(mass)), 0)
    },
    maxHeight() {
      return this.users.reduce(
        (max, { height }) => (max > Number(height) ? max : Number(height)),
        0
      )
    },
    heightLimit() {
      return CEILING_HEIGHT
    },
    massLimit() {
      return CARRYING_CAPACITY
    },
  },
  async mounted() {
    this.getUsers()
    console.log(await fetchUsers())
  }
}
</script>

<template>
  <div class="flex bg-gray-900 text-gray-100 flex flex-col w-screen h-screen justify-center items-center">
    <h1 class="text-3xl mb-4">Boarding in progress</h1>
    <div class="mb-16">
      <p>Millenium Falcon has limited carrying capacity
        ({{ massLimit }}kg) AND low ceilings ({{ heightLimit }}cm).</p>
      <p>Make sure the ship can carry everyone before take off.</p>
    </div>
    <div v-if="isLoading">Loading data...</div>
    <div v-else>
      <user-list class="mb-8" :users="users" />
      <preflight-check :total-mass="totalMass" :max-height="maxHeight" />
    </div>
  </div>
</template>
