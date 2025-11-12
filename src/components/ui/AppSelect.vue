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
  background-color: var(--color-white);
  color: var(--color-gray);
  border: none;
  outline: none;
  border-radius: 5px;
  padding: 10px 15px;
  width: 100%;
  max-height: 40px;
}
.selectContainer:focus {
  border-color: transparent;
}
</style>
