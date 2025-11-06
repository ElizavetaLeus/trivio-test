<template>
  <AppSelect
    :passengers="passengers"
    :class="[$style.select, isSelectInvalid && $style.selectInvalid, ]"
    :style="styleList"
    @change="selectPassenger($event)"
  />
  <PassengerCard
    v-for="passenger in selectedPassengers"
    :key="passenger.id"
    :passenger="passenger"
    @delete="deletePassenger($event)"
  />
</template>
<script setup lang="ts">
import AppSelect from '@/components/ui/AppSelect.vue';
import PassengerCard from '@/components/elements/PassengerCard.vue';
import { computed, ref } from 'vue';
import type { User } from '@/types/User';
import { usersApi } from '@/api/users';

interface Props {
  isSelectInvalid?: boolean;
  maxWidth?: number,
}
interface Emits {
  (event: 'updatePassengerList', selectedPassengers: User[]): void;
}
const emits = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
  isSelectInvalid: false,
  maxWidth: 0,
});

const passengers = ref<User[]>([]);
const selectedPassengers = ref <User[]>([]);

const fetchUser = async () => {
  passengers.value = await usersApi.getUsers();
};
const deletePassenger = (id: string) => {
  selectedPassengers.value = selectedPassengers.value.filter((passenger) => passenger.id !== id);
  updateSelectedPassengers();
};
const passengerListCache = computed(() => {
  const initialValue: Record<string, User> = {};

  return passengers.value.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, initialValue);
});
const styleList = computed(() => {
  return {
    '--max-width': props.maxWidth > 0 ? `${props.maxWidth}px` : '100%',
  };
});
const selectPassenger = (id: string) => {
  selectedPassengers.value.push(passengerListCache.value[id]);
  updateSelectedPassengers();
};
const updateSelectedPassengers = () => {
  emits('updatePassengerList', selectedPassengers.value);
};

fetchUser();
</script>

<style module>
.select {
  border: 1px solid transparent;
  max-width: var(--max-width, 100%);
}
.selectInvalid {
  border-color: var(--color-red);
}
</style>
