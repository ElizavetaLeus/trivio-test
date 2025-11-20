<template>
  <div :class="$style.root">
    <Transition name="slide-up-out">
      <div v-if="!isShownAviaVariants" :class="$style.formContainer">
        <UserSelect
          :options="passengers"
          :grid-count-column="3"
        />
        <div :class="$style.filters">
          <CitiesSelect
            :cities="cities"
            :text="'Город вылета'"
            :class="$style.citySelect"
          />
          <CitiesSelect
            :cities="cities"
            :text="'Город прилета'"
            :class="$style.citySelect"
          />
          <input
            type="date"
            id="calendar-input"
            :class="$style.calendar"
          />
          <input
            type="date"
            id="calendar-input"
            :class="$style.calendar"
          />
          <AppButton
            text="Найти"
            :class="$style.buttonSearch"
            @click="showAviaVariants()"
          />
        </div>
      </div>
    </Transition>

    <Transition name="slide-up-in">
      <AviaVariants
        v-if="isShownAviaVariants"
        :is-checked-expensive="isCheckedExpensive"
        :is-checked-cheap="isCheckedCheap"
        @update:checked-expensive="toggleRadioButtonExpensive"
        @update:checked-cheap="toggleRadioButtonCheap"
        :class="$style.aviaVariants"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import UserSelect from '@/components/elements/UserSelect.vue';
import CitiesSelect from '@/components/elements/CitiesSelect.vue';
import { computed, ref } from 'vue';
import { cityApi } from '@/api/cities';
import AppButton from '@/components/ui/AppButton.vue';
import { type Trip } from '@/types/Trip';
import { tripsApi } from '@/api/trips';
import { useRoute } from 'vue-router';
import AviaVariants from '@/components/AviaVariants.vue';

const route = useRoute();

const cities = ref<string[]>([]);
const trip = ref<Trip | null>(null);
const isCheckedExpensive = ref(false);
const isCheckedCheap = ref(false);
const isShownAviaVariants = ref(false);

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

.filters {
  background-color: var(--color-white);
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
  align-items: end;
}

.citySelect {
  grid-column: span 1;
}

.calendar {
  height: 40px;
  background-color: var(--color-gray-light);
  color: var(--color-gray);
  border-radius: 5px;
  width: 100%;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.buttonSearch {
  grid-column: 4;
  margin-top: 10px;
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
