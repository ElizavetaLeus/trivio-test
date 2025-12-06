<template>
  <UserSelect
    :options="options"
    defaultValue="Выберите пассажира"
    :grid-count-column="3"
    :disabled="selectedPassengers.length > 0"
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

const selectedCityFrom = ref('');
const selectedCityTo = ref('');
const selectedDateToReturn = ref('');
const selectedDateFrom = ref('');
const validAviaVariants = ref<Ticket[]>([]);
const selectedPassengers = ref<User[]>([]);

const showAviaVariants = () => {
  if (!selectedCityFrom.value || !selectedCityTo.value
      || !selectedDateFrom.value || !selectedDateToReturn.value
      || selectedPassengers.value.length === 0) {
    notification.warning('Заполните все поля');
    return false;
  }
  else {
    validAviaVariants.value = props.aviaVariants.filter((ticket) => {
      const placesFromEqual = ticket.placeFrom === selectedCityFrom.value || ticket.placeFrom === selectedCityTo.value;
      const placesToEqual = ticket.placeTo === selectedCityTo.value || ticket.placeTo === selectedCityFrom.value;
      const places = placesToEqual && placesFromEqual;

      const datesFromEqual = ticket.dateFrom === selectedDateFrom.value;
      const datesToEqual = ticket.dateTo === selectedDateToReturn.value;
      const dates = datesToEqual || datesFromEqual;

      return places && dates;
    });
  }
  emits('showTickets', validAviaVariants.value);
};
const updateSelectedCityFrom = (selectedCity: string) => {
  const[one] = props.cities.filter((city) => city === selectedCity);
  selectedCityFrom.value = one;
};
const updateSelectedCityTo = (selectedCity: string) => {
  const[one] = props.cities.filter((city) => city === selectedCity);
  selectedCityTo.value = one;
};
const updateSelectedDateTo = (selectedDate: string) => {
  selectedDateToReturn.value = DateReverse(selectedDate);
};
const updateSelectedDateFrom = (selectedDate: string) => {
  selectedDateFrom.value = DateReverse(selectedDate);
};
const selectPassengers = (passengers: User[]) => {
  selectedPassengers.value = passengers;
  emits('updatePassengerList', selectedPassengers.value);
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
