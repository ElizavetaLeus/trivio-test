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
import { type User } from '@/utils/UtilUser';
import UtilUser from '@/utils/UtilUser';

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
  const userId = selectElement.value;
  emits('change', userId);
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
}
</style>
