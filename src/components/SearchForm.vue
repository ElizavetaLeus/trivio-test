<template>
  <UserSelect
    :options="options"
    :grid-count-column="3"
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
    <AppDatePicker />
    <AppDatePicker />
    <AppButton
      text="Найти"
      :class="$style.buttonSearch"
      @click="openModal()"
    />
  </div>
</template>
<script setup lang="ts">
import UserSelect from '@/components/elements/UserSelect.vue';
import AppDatePicker from '@/components/ui/AppDatePicker.vue';
import CitiesSelect from '@/components/elements/CitiesSelect.vue';
import AppButton from '@/components/ui/AppButton.vue';
import type { User } from '@/types/User';
import { type Ticket } from '@/types/Ticket';

interface Props {
  cities: string[];
  options: User[],
  aviaVariants: Ticket[],
}
interface Emits {
  (event: 'open'): void;
}
const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const openModal = () => {
  emits('open');
};
</script>

<style module>
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
.buttonSearch {
  grid-column: 4;
  margin-top: 10px;
}
</style>
