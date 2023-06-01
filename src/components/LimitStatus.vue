<script lang="ts">
export default {
  name: 'LimitStatus',
  props: {
    predicate: {
      type: Boolean,
      requred: true
    }
  }
}
</script>

<template>
  <span v-if="predicate" class="text-green-700">YES</span>
  <span v-else class="text-red-700">NO</span>
</template>
