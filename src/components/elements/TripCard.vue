<template>
  <div :class="$style.root">
    <TripStatus
      v-if="trip.status != ''"
      :status="trip.status"
    />
    <header :class="$style.header">
      <div :class="$style.tripInformation">
        <div :class="$style.tripId"> {{ getIDTrip(trip)}} </div>
        <div :class="$style.tripPrice">
          {{ priceFormatter(getCountPrice(trip.services)) }}
        </div>
      </div>
      <div :class="$style.tripRoute"> {{ trip.name }} </div>
    </header>
    <div
      v-if="trip.services.length > 0"
      :class="$style.tripList"
    >
      <TripTicket
        v-for="service in trip.services"
        :key="service.ticket.id"
        :passenger="service.user"
        :route="getRoute(service.ticket)"
        :price="priceFormatter(service.ticket.price)"
      />
    </div>
    <footer :class="$style.footer">
      <AppButton
        text="Перейти к поездке ➝"
        type="text"
        @click = "routeToTrip()"
      />
    </footer>
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue';
import TripTicket from '@/components/ui/TripTicket.vue';
import TripStatus from '@/components/elements/TripStatus.vue';
import { type Trip } from '@/types/Trip';
import { type Service } from '@/types/Service';
import { type Ticket } from '@/types/Ticket';
import { dateToFormat, getStartTrip, dateReverse } from '@/helper/date-helper/index';
import { useRouter } from 'vue-router';
import { priceFormatter } from '@/helper/price';
import { EnumRouteName } from '@/router/types';

const router = useRouter();

interface Props {
  trip: Trip;
}
const props = defineProps<Props>();

const getCountPrice = (allServices: Service[]) => {
  return allServices.reduce((acc, currentValue) => {
    acc += currentValue.ticket.price;
    return acc;
  }, 0);
};
const getRoute = (ticket: Ticket) => {
  const route = `${ticket.placeFrom} ➝ ${ticket.placeTo}`;
  const date = dateToFormat(dateReverse(ticket.dateFrom), 'DD.MM');
  return `${route} ${date}`;
};
const routeToTrip = () => {
  router.push({ name: EnumRouteName.TRIP, params: { id: props.trip.id } });
};
const getIDTrip = (trip: Trip) => {
  let date = '';
  if(trip.services.length) {
    const startDate = getStartTrip(trip.services)[0].dateTime;
    date = `от ${dateToFormat(startDate, 'DD.MM.YYYY')}`;
  }
  return `#${trip.id} ${date}`;
};
</script>

<style module>
.root {
  background-color: var(--color-white);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 10px;
  margin-top: 30px;
}
.header {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
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
  border-top: 1px solid var(--color-black-10);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
}
.footer {
  border-top: 1px solid var(--color-black-10);
  padding: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
