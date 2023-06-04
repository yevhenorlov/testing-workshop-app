<script lang="ts">
import i18n from '@/mixins/i18n'

export default {
  name: 'LimitStatus',
  mixins: [i18n],
  props: {
    predicate: {
      type: Boolean,
      requred: true
    }
  }
}
</script>

<template>
  <span v-if="predicate" class="text-green-700">{{ $t('general.yes') }}</span>
  <span v-else class="text-red-700"> {{ $t('general.no') }}</span>
</template>
