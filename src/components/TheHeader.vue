<template>
  <header :class="$style.header">
    <div :class="$style.navigation">
      <RouterLink to="/">
        <AppVector :vector="vectors.logo" />
      </RouterLink>
      <div :class="$style.createTrip">
        <AppIcon :icon="icons.baggage" />
        <button :class="$style.button">
          Создать поездку
        </button>
      </div>
    </div>
    <div :class="$style.userLogo">AA</div>
  </header>
</template>

<script setup lang="ts">
import AppVector from '@/components/ui/AppVector.vue';
import vectors from '@/assets/vectors/vectors.ts';
import AppIcon from '@/components/ui/AppIcon.vue';
import icons from '@/assets/icons/icons.ts';
</script>

<style module>
.header {
  display: flex;
  align-items: center;
  padding-inline: 20px;
  justify-content: space-between;
  background: var(--color-white);
}
.navigation {
  display: flex;
  gap: 24px;
}
.createTrip {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-inline-start: 20px;
  color: var(--color-primary);
}
.button {
  all: unset;
  cursor: pointer;
  font-size: 14px;
  line-height: 14px;
  color: var(--color-primary);
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
