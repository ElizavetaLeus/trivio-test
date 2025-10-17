<template>
  <div :class="$style.passengerCard">
    {{ getPassengerName() }}
  </div>
</template>

<script setup lang="ts">
import UtilUser from '@/utils/UtilUser';
import { type User } from '@/types/User';

interface Props {
  passenger: User;
}
const props = defineProps<Props>();

const getPassengerName = () => {
  return UtilUser.getShortName(props.passenger);
};
</script>

<style module>
.passengerCard {
  height: 30px;
  width: 128px;
  padding: 8px 20px;
  background-color: var(--color-white);
  color: var(--color-black);
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  line-height: 1;
}
</style>
