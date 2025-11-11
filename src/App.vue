<template>
  <div :class="$style.app">
    <TheHeader />
    <div :class="['container', $style.app]">
      <RouterView />
    </div>
    <AppDrawer :isOpen="drawer.isOpen.value"/>
  </div>
</template>

<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue';
import AppDrawer from '@/components/ui/AppDrawer.vue';
import useDrawerCreateTrip from '@/composables/useDrawerCreateTrip.ts';

const drawer = useDrawerCreateTrip();
</script>

<style module>
.app {
  background-color: var(--color-gray-light);
  height: 100vh;
}
</style>
