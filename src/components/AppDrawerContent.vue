<template>
  <div :class="$style.content">
    <InputTransparent
      :class="$style.inputText"
      :value="inputValue"
      placeholder="Введите название поездки"
      @input="setInputValue($event)"
    />
    <div :class="$style.selectContent">
      <AppSelectComponent
        :passengers="passengers"
        @change="selectPassenger($event)"
      />
      <PassengerCard
        v-for="passenger in selectedPassengers"
        :key="passenger.id"
        :passenger="passenger"
        @delete="deletePassenger($event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppSelectComponent from '@/components/ui/AppSelectComponent.vue';
import { computed, ref } from 'vue';
import PassengerCard from '@/components/elements/PassengerCard.vue';
import { type User } from '@/types/User';
import InputTransparent from '@/components/elements/InputTransparent.vue';
import { usersApi } from '@/api/users';

const passengers = ref<User[]>([]);
const selectedPassengers = ref <User[]>([]);
const inputValue = ref('');

const fetchUser = async () => {
  passengers.value = await usersApi.getUsers();
};
const setInputValue = (value: string) => {
  inputValue.value = value;
  console.log(value);
};
const deletePassenger = (id: string) => {
  selectedPassengers.value = selectedPassengers.value.filter((passenger) => passenger.id !== id);
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
.content {
  background-color: var(--color-gray-light);
  height: calc(100% - 122px);
  padding-inline: 20px;
  overflow-y: auto;
}
.inputText {
  font-weight: 700;
  line-height: 1px;
  background-color: var(--color-gray-light);
  text-align: center;
  margin-top: 20px;
  padding: 7px;
}
.inputText:focus {
  outline: none;
  border-bottom-color: var(--color-primary);
}
.selectContent {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}
</style>
