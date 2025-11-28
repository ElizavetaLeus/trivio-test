<template>
  <div :class="$style.root">
    <div :class="$style.routeInformation">
      <div :class="$style.routeTrip">
        <AppIcon
          name="airplane"
          :size="16"
        />
        <div :class="$style.routeTripContent">
          {{ service.ticket.placeFrom }} ➝ {{ service.ticket.placeTo }}
        </div>
      </div>
      <div :class="$style.carrier">
        Перевозчик: {{ service.ticket.provider }}
      </div>
    </div>
    <div :class="$style.tripInformation">
      <div :class="$style.departureInformation">
        <div :class="$style.tripDate"> {{ formatDate }}</div>
        <div :class="$style.tripTime">
          {{ service.ticket.timeFrom }} - {{ service.ticket.timerTo }}
        </div>
      </div>
      <div :class="$style.tripPrice">
        {{ priceFormatter(service.ticket.price) }}
      </div>
    </div>
    <div :class="$style.passengerList">
      <PassengerCard :passenger="passenger" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue';
import { type Service } from '@/types/Service';
import { priceFormatter } from '@/helper/price';
import { computed } from 'vue';
import { dateFormat, dateToFormat } from '@/helper/date-helper';
import PassengerCard from '@/components/elements/PassengerCard.vue';

interface Props {
  service: Service;
}
const props = defineProps<Props>();

const passenger = props.service.user;

const formatDate = computed(() => {
  const dateTimeIso = dateFormat(props.service.ticket.dateFrom, props.service.ticket.timeFrom);
  return dateToFormat(dateTimeIso.dateTime, 'DD.MM.YYYY');
});
</script>

<style module>
.root {
  background-color: var(--color-white);
  padding: 20px;
  border-radius: 10px;
  max-height: 202px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.routeInformation {
  display: flex;
  flex-direction: column;
  gap: 5px
}
.routeTrip {
  color: var(--color-primary);
  display: flex;
  gap: 4px;
}
.routeTripContent {
  color: var(--color-black);
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
}
.carrier {
  color: var(--color-gray);
  font-weight: 500;
  font-size: 14px;
  line-height: 1;
}
.tripInformation {
  display: flex;
  justify-content: space-between;
}
.departureInformation {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.tripDate {
  color: var(--color-black);
  font-weight: 500;
  font-size: 14px;
  line-height: 1;
}
.tripTime {
  color: var(--color-black);
  font-weight: 400;
  font-size: 12px;
  line-height: 1;
}
.tripPrice {
  color: var(--color-black);
  font-weight: 500;
  font-size: 14px;
  line-height: 1;
}
.passengerList{
  background-color: var(--color-gray-light);
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
}
</style>
