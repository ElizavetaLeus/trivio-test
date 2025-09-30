<template>
  <div :class="$style.root">
    <header :class="$style.header">
      <div :class="$style.tripInformation">
        <div :class="$style.tripId"> {{ dateToFormat(getStartTrip, 'DD.MM.YYYY') }} </div>
        <div :class="$style.tripPrice"></div>
      </div>
      <div :class="$style.tripRoute"> </div>
    </header>
    <AppButton
      text="Перейти к поездке ➝"
      type="text"
    />
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue';
import { getStartTrip, dateToFormat } from '@/assets/helper/date-helper';

</script>

<style module>
.root {
  display: flex;
  flex-direction: column;
}
.header {
  border-bottom: 1px solid var(--color-black-10);
  display: flex;
  flex-direction: column;
}
.tripInformation {
  display: flex;
  justify-content: space-between;
  color: var(--color-primary);
  font-size: 12px;
  line-height: 1;
}
.tripId {
  color: var(--color-gray);
  font-weight: 500;
}
.tripPrice {
  font-weight: 700;
}
</style>
