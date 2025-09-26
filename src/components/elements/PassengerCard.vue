<template>
  <div :class="$style.passengerCard">
    <div :class="$style.passengerCardContent">
      {{ getPassengerName() }}
    </div>
    <div :class="$style.deletePassenger">
      <AppIcon
        name="cross"
        :class="$style.icon"
        :size="10"
      />
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
</script>s

<style module>
.passengerCard {
  padding-top: 8px;
  position: relative;
}
.passengerCardContent {

  height: 40px;
  padding-inline: 15px;
  background-color: var(--color-white);
  color: var(--color-black);
  border-radius: 5px;
  display: flex;
  align-items: center;
}
.deletePassenger {
  --size: 16px;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background-color: var(--color-gray);
  color: var(--color-white);
  position: absolute;
  top: 0;
  right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
