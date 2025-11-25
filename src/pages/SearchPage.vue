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
          :class="$style.aviaVariants"
          @update:checked-expensive="toggleRadioButtonExpensive"
          @update:checked-cheap="toggleRadioButtonCheap"
          @update:Open="openModal()"
        />
        <ModalWindow
          :isOpen="isOpen"
          @close="closeModal()"
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
import ModalWindow from '@/components/elements/ModalWindow.vue';
import SearchForm from '@/components/SearchForm.vue';

const route = useRoute();

const cities = ref<string[]>([]);
const trip = ref<Trip | null>(null);
const isCheckedExpensive = ref(false);
const isCheckedCheap = ref(false);
const isShownAviaVariants = ref(false);
const isOpen = ref(false);

const passengers = computed(() => {
  if (trip.value) {
    return trip.value.passengers;
  }
  return [];
});

const getTripById = async () => {
  const orderId = String(route.query.orderId);
  trip.value = await tripsApi.getTripById(orderId);
};

const showAviaVariants = () => {
  isShownAviaVariants.value = !isShownAviaVariants.value;
};

const toggleRadioButtonExpensive = () => {
  isCheckedExpensive.value = !isCheckedExpensive.value;
};

const toggleRadioButtonCheap = () => {
  isCheckedCheap.value = !isCheckedCheap.value;
};
const openModal = () => {
  isOpen.value = true;
};
const closeModal = () => {
  isOpen.value = false;
};

const fetchCity = async () => {
  cities.value = await cityApi.getCities();
};

getTripById();
fetchCity();
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
