<template>
  <div :class="$style.root">
    <Transition name="slide-up-out">
      <div v-if="!isShownAviaVariants" :class="$style.formContainer">
        <SearchForm
          :aviaVariants="aviaVariants"
          :cities="cities"
          :options="passengers"
          @showTickets="showAviaVariants($event)"
          @updatePassengerList="getSelectedPassengers($event)"
        />
      </div>
    </Transition>

    <Transition name="slide-up-in">
      <div>
        <AviaVariants
          v-if="isShownAviaVariants"
          :aviaVariants="currentAviaVariants"
          :class="$style.aviaVariants"
          @update:CheckedExpensive="showExpensiveAviaVariants()"
          @update:CheckedCheap="showCheapAviaVariants()"
          @update:Open="openModal($event)"
        />
        <BuyTicketModal
          :isOpen="isOpen"
          text="Вы точно хотите забронировать?"
          @update:close="closeModal()"
          @addAviaVariant="addServiceToTrip()"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { cityApi } from '@/api/cities';
import { type Trip } from '@/types/Trip';
import { tripsApi } from '@/api/trips';
import { useRoute } from 'vue-router';
import AviaVariants from '@/components/AviaVariants.vue';
import SearchForm from '@/components/SearchForm.vue';
import BuyTicketModal from '@/components/elements/BuyTicketModal.vue';
import { type Ticket } from '@/types/Ticket';
import { AviaVariantApi } from '@/api/avia-variants';
import { type User } from '@/types/User';
import { EnumSortName } from '@/enums/enum-sort-name';

const route = useRoute();
const orderId = String(route.query.orderId);

const cities = ref<string[]>([]);
const trip = ref<Trip | null>(null);
const isShownAviaVariants = ref(false);
const isOpen = ref(false);
const aviaVariants = ref<Ticket[]>([]);
const currentSort = ref<EnumSortName>(EnumSortName.CHEAP);
const selectedPassengers = ref<User[]>([]);
const selectAviaVariant = ref<Ticket | null>(null);

const passengers = computed(() => {
  if (trip.value) {
    return trip.value.passengers;
  }
  return [];
});
const currentAviaVariants = computed(() => {
  const variants = [...aviaVariants.value];

  if (currentSort.value === EnumSortName.CHEAP) {
    return variants.sort((a, b) => a.price - b.price);
  } else {
    return variants.sort((a, b) => b.price - a.price);
  }
});

const showExpensiveAviaVariants = () => {
  currentSort.value = EnumSortName.EXPENSIVE;
};
const showCheapAviaVariants = () => {
  currentSort.value = EnumSortName.CHEAP;
};
const showAviaVariants = (selectedTickets: Ticket[]) => {
  isShownAviaVariants.value = !isShownAviaVariants.value;
  aviaVariants.value = selectedTickets;
};
const openModal = (ticket: Ticket): void => {
  isOpen.value = true;
  selectAviaVariant.value = ticket;
};
const closeModal = () => {
  isOpen.value = false;
};
const getSelectedPassengers = (passengers: User[]) => {
  selectedPassengers.value = passengers;
};
const addServiceToTrip = async () => {
  if (selectAviaVariant.value) {
    await tripsApi.addServiceToTrip(orderId, selectedPassengers.value, selectAviaVariant.value );
    closeModal();
  }
  return;
};
const getTripById = async () => {
  trip.value = await tripsApi.getTripById(orderId);
};
const fetchAviaVariant = async () => {
  aviaVariants.value = await AviaVariantApi.getAviaVariants();
};
const fetchCity = async () => {
  cities.value = await cityApi.getCities();
};

getTripById();
fetchCity();
fetchAviaVariant();
</script>

<style module>
.root {
  margin-top: 50px;
  position: relative;
  min-height: 500px;
}
.formContainer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
.aviaVariants {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
}
</style>

<style>
.slide-up-out-leave-active {
  animation: slideOutUp 0.6s ease-out forwards;
}
.slide-up-in-enter-active {
  animation: slideInUp 0.6s ease-out 0.1s forwards;
}

@keyframes slideOutUp {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  30% {
    transform: translateY(-50px);
    opacity: 0.8;
  }
  100% {
    transform: translateY(-1000px);
    opacity: 0;
  }
}

@keyframes slideInUp {
  0% {
    transform: translateY(1000px);
    opacity: 0;
  }
  70% {
    transform: translateY(-30px);
    opacity: 0.8;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
