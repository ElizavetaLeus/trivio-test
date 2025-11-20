<template>
  <input
    type="date"
    :id="id"
    :class="$style.calendar"
  />
</template>

<script setup lang="ts">
interface Props {
  id: string,
}
defineProps<Props>();
</script>

<style module>
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
