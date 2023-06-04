<script lang="ts">
import LimitStatus from './LimitStatus.vue'
import { CEILING_HEIGHT, CARRYING_CAPACITY } from '@/constants'
import i18n from '@/mixins/i18n'

export default {
  name: 'PreflightCheck',
  props: ['totalMass', 'maxHeight'],
  components: { LimitStatus },
  mixins: [i18n],
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
  <div class="flex flex-col gap-4 border-t-2 pt-8">
    <div class="flex justify-between">
      <span>{{ $t('preflightCheck.totalMass.label') }}:</span>
      <span> {{ totalMass }}kg</span>
    </div>
    <div class="flex justify-between">
      <span>{{ $t('preflightCheck.maxHeight.label') }}:</span>
      <span> {{ maxHeight }}cm</span>
    </div>
    <div class="flex justify-between">
      <span>{{ $t('preflightCheck.massWithinLimit.label') }}:</span>
      <limit-status :predicate="isMassWithinLimit" />
    </div>
    <div class="flex justify-between">
      <span>{{ $t('preflightCheck.heightWithinLimit.label') }}:</span>
      <limit-status :predicate="isHeightWithinLimit" />
    </div>
  </div>
</template>
