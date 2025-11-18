<template>
  <div :class="$style.root">
    <UserSelect
      :options="passengers"
      :gridCountColumn="3"
    />
    <div :class="$style.filters">
      <CitiesSelect
        :cities="cities"
        :text="'Город вылета'"
        :class="$style.citySelect"
      />
      <CitiesSelect
        :cities="cities"
        :text="'Город прилета'"
        :class="$style.citySelect"
      />
      <input
        type="date"
        id="calendar-input"
        value="Туда"
        :class="$style.calendar"
      />
      <input
        type="date"
        id="calendar-input"
        value="Туда"
        :class="$style.calendar"
      />
      <AppButton
        text="Найти"
        :class="$style.buttonSearch"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserSelect from '@/components/elements/UserSelect.vue';
import CitiesSelect from '@/components/elements/CitiesSelect.vue';
import { ref } from 'vue';
import { cityApi } from '@/api/cities';
import AppButton from '@/components/ui/AppButton.vue';
import type { User } from '@/types/User';
import { usersApi } from '@/api/users';

const cities = ref<string[]>([]);
const passengers = ref <User[]>([]);

const fetchCity = async () => {
  cities.value = await cityApi.getCities();
};
const fetchUser = async () => {
  passengers.value = await usersApi.getUsers();
};

fetchCity();
fetchUser();
</script>

<style module>
.root {
  margin-top: 50px;
}
.filters {
  background-color: var(--color-white);
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
  align-items: end;
}
.citySelect {
  grid-column: span 1;
}
.calendar {
  height: 40px;
  background-color: var(--color-gray-light);
  color: var(--color-gray);
  border-radius: 5px;
  width: 100%;
  border: none;
  padding: 10px;
  cursor: pointer;
}
.buttonSearch {
  grid-column: 4;
  margin-top: 10px;
}
</style>
