<template>
  <header :class="$style.header">
    <RouterLink to="/">
      <AppVector :vector="vectors.logo" />
    </RouterLink>
    <div :class="$style.navigation">
      <div
        v-if="isShownOnTripPage"
        :class="$style.completeTrip"
      >
        <AppIcon name="airplane" />
        <AppButton
          text="завершить поездку"
          type="default"
          size="small"
          :class="$style.button"
        />
      </div>
      <div
        v-if="isShownOnTripListPage"
        :class="$style.createTrip"
        @click="openDrawer()"
      >
        <AppIcon name="baggage" />
        <AppButton
          text="Создать поездку"
          type="text"
          :class="$style.button"
        />
      </div>
    </div>
    <div :class="$style.userLogo">AA</div>
  </header>
</template>

<script setup lang="ts">
import AppVector from '@/components/ui/AppVector.vue';
import vectors from '@/assets/vectors/vectors.ts';
import AppIcon from '@/components/ui/AppIcon.vue';
import AppButton from '@/components/ui/AppButton.vue';
import useDrawerCreateTrip from '@/composables/useDrawerCreateTrip';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { EnumRouteName } from '@/router/types';

const drawer = useDrawerCreateTrip();
const route = useRoute();

const openDrawer = () => {
  drawer.openDrawer();
};

const isShownOnTripPage = computed(() => {
  return route.name === EnumRouteName.TRIP;
});
const isShownOnTripListPage = computed(() => {
  return route.name === EnumRouteName.HOME;
});
</script>

<style module>
.header {
  display: flex;
  align-items: center;
  padding-inline: 20px;
  padding-block: 10px;
  justify-content: space-between;
  background: var(--color-white);
}
.navigation {
  display: flex;
  gap: 20px;
}
.createTrip {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-inline-start: 20px;
  color: var(--color-primary);
}
.completeTrip {
  color: var(--color-primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.button {
  font-size: 14px;
  line-height: 14px;
}
.userLogo {
  --size: 36px;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
  color: var(--color-white);
  font-size: 14px;
}
</style>
