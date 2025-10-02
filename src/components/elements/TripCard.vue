<template>
  <div :class="$style.root">
    <header :class="[$style.header, $style.container]">
      <div :class="$style.tripInformation">
        <div :class="$style.tripId"> {{ getIDTrip(trip) }} </div>
        <div :class="$style.tripPrice">{{ formatPrice(getCountPrice(trip)) }}</div>
      </div>
      <div :class="$style.tripRoute"> {{ trip.name }} </div>
    </header>
    <div :class="[$style.container, $style.tripList]">
      <AppTrip
        v-for="service in trip.services"
        :key="service.ticket.id"
        :passenger="service.user"
        :route="getRoute(service.ticket)"
        :price="formatPrice(service.ticket.price)"
      />
    </div>
    <footer :class="[$style.footer, $style.container]">
      <AppButton
        text="Перейти к поездке ➝"
        type="text"
      />
    </footer>
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue';
import { getStartTrip, dateToFormat } from '@/assets/helper/date-helper';
import { type User } from '@/utils/UtilUser';
import AppTrip from '@/components/ui/AppTrip.vue';

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
  passengers: passengers,
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
const getIDTrip = (trip: Trip) => {
  return `#${trip.id} от ${dateToFormat(getStartTrip(), 'DD.MM.YYYY')}`;
};
const getCountPrice = (trip: Trip) => {
  const allServices = trip.services;
  const price = allServices.map((service: Service) => {
    return service.ticket.price;
  }).reduce((acc, curr) => acc + curr, 0);

  return price;
};
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
};
const getRoute = (ticket: Ticket) => {
  return `${ticket.placeFrom} ➝ ${ticket.placeTo} ${dateToFormat(getStartTrip(), 'DD.MM')}`;
};
</script>

<style module>
.container {
  padding: 20px 30px;
}
.root {
  background-color: var(--color-white);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}
.header {
  border-bottom: 1px solid var(--color-black-10);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 20px;
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
.tripRoute {
  font-weight: 500;
  font-size: 14px;
  line-height: 1;
}
.tripList {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.footer {
  border-top: 1px solid var(--color-black-10);
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
