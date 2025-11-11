<template>
  <div :class="$style.root">
    <UserSelect :gridCountColumn="3"/>
  </div>
</template>

<script setup lang="ts">
import UserSelect from '@/components/elements/UserSelect.vue';
</script>

<style module>
.root {
  margin-top: 50px;
}
</style>
