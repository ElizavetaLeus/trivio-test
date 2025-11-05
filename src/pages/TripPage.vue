<template>
  <div v-if="trip" :class="$style.root">
    <h1 :class="$style.tripName">{{ trip.name }}</h1>
    <div :class="$style.content">
      <div
        v-if="trip.services.length === 0"
        :class="$style.emptyService"
      >
        <div :class="$style.serviceList">Список услуг пуст</div>
        <AppButton
          text="поиск авиа"
          type="text"
          :class="$style.searchButton"
          @click="goToSearch()"
        />
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
import { onUnmounted, ref } from 'vue';
import { type Trip } from '@/types/Trip';
import TicketCard from '@/components/elements/TicketCard.vue';
import { EnumRouteName } from '@/router/types';
import { useTripStore } from '@/stores/tripStore';
import AppButton from '@/components/ui/AppButton.vue';

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
const goToSearch = () => {
  router.push({ name: EnumRouteName.SEARCH });
};

onUnmounted( () => {
  tripStore.$reset();
  tripStore.$dispose();
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
.emptyService{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
.serviceList {
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
  text-align: center;
}
.searchButton {
  display: flex;
  align-items: center;
  border-bottom: 1px dashed var(--color-primary);
}
</style>
