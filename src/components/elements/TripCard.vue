<template>
  <div :class="$style.root">
    <header :class="$style.header">
      <div :class="$style.tripInformation">
        <div :class="$style.tripId"> {{ dateToFormat(getStartTrip, 'DD.MM.YYYY') }} </div>
        <div :class="$style.tripPrice"></div>
      </div>
      <div :class="$style.tripRoute"> Поездка в анапу </div>
    </header>
    <AppButton
      text="Перейти к поездке ➝"
      type="text"
    />
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue';
import { getStartTrip, dateToFormat } from '@/assets/helper/date-helper';
import { type User } from '@/utils/UtilUser';

type passengers = Array<User>;
interface Ticket {
  id: number,
  provider: string,
  placeFrom: string,
  placeTo: string,
  dateFrom: string,
  dateTo: string,
  timeFrom: string,
  timerTo: string,
  iataFrom: string,
  iataTo: string,
  price: number,
}
interface Service {
  user: User,
  ticket: Ticket,
}
interface Trip {
  id: number,
  name: string,
  price: number,
  passengers: User[],
  services: Service[],
  status: string,
}

const trip: Trip =
  {
    id: 2,
    name: 'Поездка в Москву',
    price: 10600,
    passengers: [
      {
        id: 3,
        first_name: 'Попов',
        second_name: 'Михаил',
        last_name: 'Андреевич',
      },
    ],
    services: [
      {
        user: {
          id: 3,
          first_name: 'Попов',
          second_name: 'Михаил',
          last_name: 'Андреевич',
        },
        ticket: {
          id: 3,
          provider: 'Pobeda',
          placeFrom: 'Казань',
          placeTo: 'Москва',
          dateFrom: '27-08-2025',
          dateTo: '27-08-2025',
          timeFrom: '07:12',
          timerTo: '09:05',
          iataFrom: 'KZN',
          iataTo: 'DME',
          price: 5100,
        },
      },
      {
        user: {
          id: 3,
          first_name: 'Попов',
          second_name: 'Михаил',
          last_name: 'Андреевич',
        },
        ticket: {
          id: 4,
          provider: 'Pobeda',
          placeFrom: 'Казань',
          placeTo: 'Москва',
          dateFrom: '29-08-2025',
          dateTo: '29-08-2025',
          timeFrom: '07:15',
          timerTo: '09:13',
          iataFrom: 'KZN',
          iataTo: 'DME',
          price: 5500,
        },
      },
    ],
    status: 'ended',
  };
</script>

<style module>
.root {
  background-color: var(--color-white);
  border-radius: 10px;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
}
.header {
  border-bottom: 1px solid var(--color-black-10);
  display: flex;
  flex-direction: column;
}
.tripInformation {
  display: flex;
  justify-content: space-between;
  color: var(--color-primary);
  font-size: 12px;
  line-height: 1;
}
.tripId {
  color: var(--color-gray);
  font-weight: 500;
}
.tripPrice {
  font-weight: 700;
}
</style>
