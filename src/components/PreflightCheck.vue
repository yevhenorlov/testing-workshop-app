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
    CARRYING_CAPACITY() {
      return CARRYING_CAPACITY
    },
    CEILING_HEIGHT() {
      return CEILING_HEIGHT
    },
    isMassWithinLimit() {
      return this.totalMass < CARRYING_CAPACITY
    },
    isHeightWithinLimit() {
      return this.maxHeight < CEILING_HEIGHT
    },
    isWithinLimits() {
      return this.isMassWithinLimit && this.isHeightWithinLimit
    }
  }
}
</script>

<template>
  <div class="mt-8 flex flex-col gap-4">
    <div class="flex justify-between">
      <span>{{ $t('preflightCheck.totalMass') }}:</span>
      <span data-testid="currentTotalMass"> {{ totalMass }}/{{ CARRYING_CAPACITY }}kg</span>
    </div>
    <div class="flex justify-between">
      <span>{{ $t('preflightCheck.maxHeight') }}:</span>
      <span data-testid="currentMaxHeight"> {{ maxHeight }}/{{ CEILING_HEIGHT }}cm</span>
    </div>
    <div class="flex justify-between">
      <span>{{ $t('preflightCheck.massWithinLimit') }}:</span>
      <limit-status :predicate="isMassWithinLimit" data-testid="massLimitStatus" />
    </div>
    <div class="flex justify-between">
      <span>{{ $t('preflightCheck.heightWithinLimit') }}:</span>
      <limit-status :predicate="isHeightWithinLimit" data-testid="heightLimitStatus" />
    </div>
    <button
      class="mt-8 appearance-none border-2 border-green-500 bg-transparent p-4 text-white hover:bg-green-500 disabled:cursor-not-allowed disabled:border-red-500 disabled:text-gray-600 disabled:hover:bg-transparent"
      :disabled="!isWithinLimits"
      @click="$emit('launch')"
    >
      {{ $t('preflightCheck.launch') }}
    </button>
  </div>
</template>
