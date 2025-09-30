<template>
  <div :class="$style.root">
    <div :class="$style.tripInformation">
      <AppIcon
        name="airplane"
        :size="14"
      />
      <div :class="$style.tripPrice"> 4 145 ₽ </div>
      <div :class="$style.tripRoute"> Санкт-Петербург ➝ Москва 24.08 </div>
    </div>
    <div :class="$style.passenger">
      {{ getPassengerName() }}
    </div>
  </div>
</template>
<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue';
import UtilUser, { type User } from '@/utils/UtilUser';

interface Props {
  passenger: User;
}
const props = defineProps<Props>();

const getPassengerName = () => {
  return UtilUser.getShortName(props.passenger);
};
</script>
<style module>
.root {
  padding: 10px;
  background-color: var(--color-gray-light);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.tripInformation{
  display: flex;
  gap: 5px;
  color: var(--color-primary);
  font-weight: 500;
  font-size: 12px;
  line-height: 1;
}
.tripRoute{
  color:var(--color-black);
}
.passenger {
  font-weight: 400;
  font-size: 12px;
  line-height: 1;
  color:var(--color-black);
}
</style>
