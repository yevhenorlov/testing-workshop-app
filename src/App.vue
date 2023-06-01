<script lang="ts">
import PreflightCheck from './components/PreflightCheck.vue'
import UserList from './components/UserList.vue'
import { fetchUsers } from './api'
import type { User } from './types'

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
    }
  },
  async mounted() {
    this.getUsers()
    console.log(await fetchUsers())
  }
}
</script>

<template>
  <div class="flex bg-gray-900 text-gray-100 w-screen h-screen justify-center items-center">
    <div v-if="isLoading">Loading data...</div>
    <div v-else>
      <user-list class="mb-8" :users="users" />
      <preflight-check :total-mass="totalMass" :max-height="maxHeight" />
    </div>
  </div>
</template>
