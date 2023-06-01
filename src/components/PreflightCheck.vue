<script lang="ts">
import LimitStatus from './LimitStatus.vue'

export default {
  name: 'PreflightCheck',
  props: ['totalMass', 'maxHeight'],
  components: { LimitStatus },
  computed: {
    isMassWithinLimit() {
      const MASS_LIMIT = 700
      return this.totalMass < MASS_LIMIT
    },
    isHeightWithinLimit() {
      const CEILING_HEIGHT = 210
      return this.maxHeight < CEILING_HEIGHT
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-4 pt-8 border-t-2">
    <div>total mass: {{ totalMass }}kg</div>
    <div>tallest person height: {{ maxHeight }}cm</div>
    <div>mass within limit: <limit-status :predicate="isMassWithinLimit" /></div>
    <div>height within limit: <limit-status :predicate="isHeightWithinLimit" /></div>
  </div>
</template>
