<template>
  <div :class="$style.root">
    <Transition name="slide-up-out">
      <div v-if="!isShownAviaVariants" :class="$style.formContainer">
        <SearchForm
          :cities="cities"
          :options="passengers"
          @open="showAviaVariants()"
        />
      </div>
    </Transition>

    <Transition name="slide-up-in">
      <div>
        <AviaVariants
          v-if="isShownAviaVariants"
          :is-checked-expensive="isCheckedExpensive"
          :is-checked-cheap="isCheckedCheap"
          :aviaVariants="aviaVariants"
          :class="$style.aviaVariants"
          @update:checked-expensive="showExpensiveAviaVariants()"
          @update:checked-cheap="showCheapAviaVariants()"
          @update:Open="openModal()"
        />
        <BuyTicketModal
          :isOpen="isOpen"
          text="Вы точно хотите забронировать?"
          @update:close="closeModal()"
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

const route = useRoute();

const cities = ref<string[]>([]);
const trip = ref<Trip | null>(null);
const isCheckedExpensive = ref(false);
const isCheckedCheap = ref(true); // По умолчанию выбраны дешёвые
const isShownAviaVariants = ref(false);
const isOpen = ref(false);
const aviaVariants = ref<Ticket[]>([]);

const passengers = computed(() => {
  if (trip.value) {
    return trip.value.passengers;
  }
  return [];
});

const showAviaVariants = () => {
  isShownAviaVariants.value = !isShownAviaVariants.value;
};
const showExpensiveAviaVariants = () => {
  isCheckedExpensive.value = !isCheckedExpensive.value;
};
const showCheapAviaVariants = () => {
  isCheckedCheap.value = !isCheckedCheap.value;
};
const openModal = () => {
  isOpen.value = true;
};
const closeModal = () => {
  isOpen.value = false;
};

const getTripById = async () => {
  const orderId = String(route.query.orderId);
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
