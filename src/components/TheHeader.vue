<template>
  <header :class="$style.header">
    <RouterLink to="/">
      <AppVector :vector="vectors.logo" />
    </RouterLink>
    <div :class="$style.navigation">

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

      <div
        v-if="isShownOnTripPage"
        :class="$style.completeTrip"
      >
        <div
          :class="$style.airplane"
          @click="goToSearchPage"
        >
          <AppIcon name="airplane" />
        </div>
        <AppButton
          v-if="tripStore.isShownButtonCloseTrip"
          text="завершить поездку"
          type="default"
          size="small"
          :class="$style.button"
          :max-width="189"
          @click="tripStore.completeTrip()"
        />
      </div>

      <div v-if="isShownOnSearchPagePage">
        <AppButton
          text="вернуться в поездку"
          type="default"
          size="small"
          :max-width="196"
          :class="[$style.button, $style.goToTripButton]"
          @click="goToTripPage()"
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
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { EnumRouteName } from '@/router/types';
import { useTripStore } from '@/stores/tripStore';

const drawer = useDrawerCreateTrip();
const route = useRoute();
const tripStore = useTripStore();
const router = useRouter();

const isShownOnTripPage = computed(() => {
  return route.name === EnumRouteName.TRIP;
});
const isShownOnTripListPage = computed(() => {
  return route.name === EnumRouteName.HOME;
});
const isShownOnSearchPagePage = computed(() => {
  return route.name === EnumRouteName.SEARCH;
});

const openDrawer = () => {
  drawer.openDrawer();
};
const goToSearchPage = () => {
  router.push({ name: EnumRouteName.SEARCH });
};
const goToTripPage = () => {
  const orderId = String(route.query.orderId);
  router.push({
    name: EnumRouteName.TRIP,
    params: { id: orderId },
  });
};
</script>

<style module>
.header {
  display: flex;
  align-items: center;
  padding-inline: 94px;
  padding-block: 10px;
  justify-content: space-between;
  background: var(--color-white);
  height: 64px;
  position: relative;
  z-index: 20;
}
.navigation {
  display: flex;
  gap: 20px;
  width: 100%;
  height: 100%;
  align-items: center;
}
.createTrip {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-inline-start: 24px;
  color: var(--color-primary);
  cursor: pointer;
}
.completeTrip {
  color: var(--color-primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-inline: 20px 50px;
}
.airplane {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background-color: var(--color-gray-light);
  color: var(--color-primary);
}
.button {
  font-size: 14px;
  line-height: 1;
  font-weight: 400;
}
.goToTripButton {
  background-color: var(--color-gray-light);
  color: var(--color-black);
  margin-inline: 20px;
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
