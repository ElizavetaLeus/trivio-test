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
import { useTripStore } from '@/stores/tripStore';
import { onUnmounted } from 'vue';

const drawer = useDrawerCreateTrip();
const tripStore = useTripStore();

onUnmounted( () => {
  tripStore.$reset();
  tripStore.$dispose();
});
</script>

<style module>
.app {
  background-color: var(--color-gray-light);
  height: 100vh;
}
</style>
