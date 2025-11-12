<template>
  <div :class="$style.root">
    <UserSelect :gridCountColumn="3"/>
    <div :class="$style.filters">
      <CitiesSelect
        :cities="cities"
        :text="'Город вылета'"
      />
      <CitiesSelect
        :cities="cities"
        :text="'Город прилета'"
      />
      <input
        type="date"
        id="calendar-input"
        value="Туда"
        :class="$style.calendar"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserSelect from '@/components/elements/UserSelect.vue';
import CitiesSelect from '@/components/elements/CitiesSelect.vue';
import { ref } from 'vue';
import { cityApi } from '@/api/cities';

const cities = ref<string[]>([]);
const fetchCity = async () => {
  cities.value = await cityApi.getUsers();
};
fetchCity();
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
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
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
</style>
