<template>
  <div :class="$style.root">
    <TripStatus
      v-if="trip.status != ''"
      :status="trip.status"
    />
    <header :class="[$style.header, $style.container]">
      <div :class="$style.tripInformation">
        <div :class="$style.tripId"> {{ getIDTrip(trip) }} </div>
        <div :class="$style.tripPrice">
          {{ formatPrice(getCountPrice(trip)) }}
        </div>
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
import {
  getStartTrip,
  dateToFormat,
  dateReverse,
  type Trip,
  type Service,
  type Ticket,
} from '@/helper/date-helper';
import AppTrip from '@/components/ui/AppTrip.vue';
import TripStatus from '@/components/elements/TripStatus.vue';

interface Props {
  trip: Trip;
}
defineProps<Props>();
const getIDTrip = (trip: Trip) => {
  return `#${trip.id} от ${dateToFormat(getStartTrip(trip)[0].dateTime, 'DD.MM.YYYY')}`;
};
const getCountPrice = (trip: Trip) => {
  const allServices = trip.services;
  return allServices.map((service: Service) => {
    return service.ticket.price;
  }).reduce((acc, curr) => acc + curr, 0);
};
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
};
const getRoute = (ticket: Ticket) => {
  return `${ticket.placeFrom} ➝ ${ticket.placeTo} ${dateToFormat(dateReverse(ticket.dateFrom), 'DD.MM')}`;
};
</script>

<style module>
.container {
  padding: 30px 20px;
}
.root {
  background-color: var(--color-white);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
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
