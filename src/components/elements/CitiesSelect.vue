<template>
  <div :class="$style.selectWrapper">
    <AppIcon name="airplane" />
    <select :class="$style.citiesSelect">
      <option>{{ text }}</option>
      <option
        v-for="city in cities"
        :value="city"
      >
        {{ city }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue';

interface Props {
  cities: string[];
  text: string;
}
defineProps<Props>();
</script>

<style module>
.selectWrapper {
  background-color: var(--color-gray-light);
  color: var(--color-primary);
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 10px;
  border-radius: 5px;
}
.citiesSelect {
  color: var(--color-gray);
  background-color: var(--color-gray-light);
  outline: none;
  border: none;
  width: 100%;
}
.citiesSelect:focus {
  border-color: transparent;
}
</style>
