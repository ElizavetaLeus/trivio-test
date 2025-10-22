<template>
  <select
    :class="$style.selectContainer"
    name=""
    @change="handleOptionChange($event)"
  >
    <option value="">
      Выберите сотрудников
    </option>
    <option
      v-for="passenger in passengers"
      :key="passenger.id"
      :value="passenger.id"
    >
      {{ UtilUser.getShortName(passenger) }}
    </option>
  </select>
</template>

<script setup lang="ts">
import UtilUser from '@/utils/UtilUser';
import { type User } from '@/types/User';

interface Props {
  passengers: User[];
}

interface Emits {
  (event: 'change', userId: string): void;
}

defineProps<Props>();

const emits = defineEmits<Emits>();

const handleOptionChange = (event: Event) => {
  const selectElement = event.target as HTMLSelectElement;
  const passengerId = selectElement.value;
  emits('change', passengerId);
};
</script>

<style module>
.selectContainer {
  padding: 10px 15px;
  background-color: var(--color-white);
  border: none;
  border-radius: 5px;
  width: 100%;
  color: var(--color-gray);
  outline: none;
}
.selectContainer:focus {
  border-color: transparent;
}
</style>
