<template>
  <div :class="$style.drawerContent">
    <AppSelectComponent
      :passengers="passengers"
      @change="selectPassenger($event)"
    />
    <PassengerCard
      v-for="passenger in selectedPassengers"
      :key="passenger.id"
      :passenger="passenger"
    />
  </div>
</template>

<script setup lang="ts">
import AppSelectComponent from '@/components/ui/AppSelectComponent.vue';
import { computed, ref } from 'vue';
import { type User } from '@/utils/UtilUser';
import HTTP from '@/helper/http';
import PassengerCard from '@/components/elements/PassengerCard.vue';

const http = new HTTP();

const passengers = ref<User[]>([]);
const selectedPassengers = ref <User[]>([]);

const fetchUser = async () => {
  const response = await http.get<User[]>('/users');
  if (response.data) {
    passengers.value = response.data;
  }
};

const passengerListCache = computed(() => {
  const initialValue: Record<string, User> = {};

  return passengers.value.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, initialValue);
});

const selectPassenger = (id: string) => {
  selectedPassengers.value.push(passengerListCache.value[id]);
};
fetchUser();
</script>

<style module>
.drawerContent {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}
</style>
