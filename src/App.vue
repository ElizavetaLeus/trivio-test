<template>
  <div :class="$style.app">
    <TheHeader />
    <RouterView />

  </div>
</template>

<script setup lang="ts">

import TheHeader from "@/components/TheHeader.vue";
</script>

<style module>
.app {
  background-color: var(--color-gray-light);
}
</style>
