<template>
  <div :class="$style.root">
    <div :class="$style.tripInformation">
      <AppIcon
        name="airplane"
        :size="14"
      />
      <div :class="$style.tripPrice"> {{ price }} </div>
      <div :class="$style.tripRoute"> {{ route }} </div>
    </div>
    <div :class="$style.passenger">
      {{ getPassengerName() }}
    </div>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue';
import UtilUser from '@/utils/UtilUser';
import { type User } from '@/types/User';

interface Props {
  passenger: User;
  route: string;
  price: string;
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
  border-radius: 5px;
}
.tripInformation {
  display: flex;
  gap: 5px;
  color: var(--color-primary);
  font-weight: 500;
  font-size: 12px;
  line-height: 1;
  align-items: center;
}
.tripRoute {
  color:var(--color-black);
}
.passenger {
  font-weight: 400;
  font-size: 12px;
  line-height: 1;
  color:var(--color-black);
}
</style>
