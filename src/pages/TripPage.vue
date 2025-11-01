<template>
  <div v-if="trip" :class="$style.root">
    <h1 :class="$style.tripName">{{ trip.name }}</h1>
    <div :class="$style.content">
      <div v-if="trip.services.length === 0">
        Список услуг пуст
      </div>
      <div v-else>
        <TicketCard
          v-for="service in trip.services"
          :service="service"
          :key="service.ticket.id"
        />
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { tripsApi } from '@/api/trips';
import { onMounted, ref } from 'vue';
import { type Trip } from '@/types/Trip';
import TicketCard from '@/components/elements/TicketCard.vue';
import { EnumRouteName } from '@/router/types';
import { useTripStore } from '@/stores/tripStore';

const route = useRoute();
const trip = ref<Trip | null>(null);
const router = useRouter();
const tripStore = useTripStore();

const getTripById = async () => {
  trip.value = await tripsApi.getTripById(route.params.id);

  if (trip.value === null) {
    router.push({ name: EnumRouteName.HOME });
  }
  else {
    tripStore.setTrip(trip.value);
  }
};

onMounted( () => {
  tripStore.$reset();
});

getTripById();
</script>

<style module>
.root {
margin-top: 50px;
}
.tripName {
  font-size: 26px;
  font-weight: 700;
  line-height: 1;
  color: var(--color-primary);
  text-align: center;
}
.content{
  margin-top: 30px;
}
</style>
