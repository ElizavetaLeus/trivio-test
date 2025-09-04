<template>
  <div :class="$style.app">
    <TheHeader />
    <RouterView />
<AppDrawer />
  </div>
</template>

<script setup lang="ts">

import TheHeader from "@/components/TheHeader.vue";
import AppDrawer from "@/components/ui/AppDrawer.vue";
</script>

<style module>
.app {
  background-color: var(--color-gray-light);
  height: 100vh;
}
</style>
