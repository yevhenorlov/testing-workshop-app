<script lang="ts">
import LimitStatus from './LimitStatus.vue'
import { CEILING_HEIGHT, CARRYING_CAPACITY } from '../constants'

export default {
  name: 'PreflightCheck',
  props: ['totalMass', 'maxHeight'],
  components: { LimitStatus },
  computed: {
    isMassWithinLimit() {
      return this.totalMass < CARRYING_CAPACITY
    },
    isHeightWithinLimit() {
      return this.maxHeight < CEILING_HEIGHT
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-4 pt-8 border-t-2">
    <div class="flex justify-between">
      <span>total mass:</span>
      <span> {{ totalMass }}kg</span>
    </div>
    <div class="flex justify-between">
      <span>tallest person height:</span>
      <span> {{ maxHeight }}cm</span>
    </div>
    <div class="flex justify-between">
      <span>mass within limit:</span>
      <limit-status :predicate="isMassWithinLimit" />
    </div>
    <div class="flex justify-between">
      <span>height within limit:</span>
      <limit-status :predicate="isHeightWithinLimit" />
    </div>
  </div>
</template>
