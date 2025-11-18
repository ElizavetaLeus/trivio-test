<template>
  <div :class="$style.selectWrapper">
    <div :class="$style.iconWrapper">
      <AppIcon name="airplane" />
    </div>
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
  color: var(--color-primary);
  position: relative;
}
.iconWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  pointer-events: none;
}
.citiesSelect {
  color: var(--color-gray);
  background-color: var(--color-gray-light);
  outline: none;
  border: none;
  width: 100%;
  padding: 10px 10px 10px 40px;
  border-radius: 5px;
  height: 40px;
}
.citiesSelect:focus {
  border-color: transparent;
}
</style>
