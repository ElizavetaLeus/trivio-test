<template>
  <UserSelect
    :options="options"
    :grid-count-column="3"
    @updatePassengerList="selectPassengers($event)"
  />
  <div :class="$style.filters">
    <CitiesSelect
      :cities="cities"
      text="Город вылета"
      :class="$style.citySelect"
      @change="updateSelectedCityFrom($event)"
    />
    <CitiesSelect
      :cities="cities"
      text="Город прилета"
      :class="$style.citySelect"
      @change="updateSelectedCityTo($event)"
    />
    <AppDatePicker @change="updateSelectedDateFrom($event)"/>
    <AppDatePicker @change="updateSelectedDateTo($event)"/>
    <AppButton
      text="Найти"
      :class="$style.buttonSearch"
      @click="showAviaVariants()"
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
import { ref } from 'vue';
import DateReverse from '@/helper/date-helper/date-reverse';
import { notification } from '@/libs/notification';

interface Props {
  cities: string[];
  options: User[],
  aviaVariants: Ticket[],
}
interface Emits {
  (event: 'showTickets', aviaVariants: Ticket[]): void;
  (event: 'updatePassengerList', updateSelectedPassengers: User[]): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const selectedCityFrom = ref<string>('');
const selectedCityTo = ref<string>('');
const selectedDateToReturn = ref<string>('');
const selectedDateFrom = ref<string>('');
const validAviaVariants = ref<Ticket[]>([]);

const showAviaVariants = () => {
  if (!selectedCityFrom.value || !selectedCityTo.value || !selectedDateFrom.value || !selectedDateToReturn.value) {
    notification.warning('Заполните все поля');
    return false;
  }
  else {
    validAviaVariants.value = props.aviaVariants.filter((ticket) => {
      return (ticket.placeFrom === selectedCityFrom.value &&
      ticket.placeTo === selectedCityTo.value &&
        ticket.dateFrom === selectedDateFrom.value) ||
        (ticket.placeTo === selectedCityFrom.value &&
          ticket.placeFrom === selectedCityTo.value &&
          ticket.dateFrom === selectedDateToReturn.value);
    });
  }
  emits('showTickets', validAviaVariants.value);
};
const updateSelectedCityFrom = (selectedCity: string) => {
  selectedCityFrom.value = props.cities.filter((city) => city === selectedCity)[0];
};
const updateSelectedCityTo = (selectedCity: string) => {
  selectedCityTo.value = props.cities.filter((city) => city === selectedCity)[0];
};
const updateSelectedDateTo = (selectedDate: string) => {
  selectedDateToReturn.value = DateReverse(selectedDate);
};
const updateSelectedDateFrom = (selectedDate: string) => {
  selectedDateFrom.value = DateReverse(selectedDate);
};
const selectPassengers = (selectedPassengers: User[]) => {
  emits('updatePassengerList', selectedPassengers);
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
