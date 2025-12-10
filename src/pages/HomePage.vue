<template>
  <div :class="$style.content">
    <h1 :class="$style.title">{{ translator('поездки',localizationStore.locale) }}</h1>
    <div :class="$style.searchContainer">
      <div :class="$style.searchInputContainer">
        <AppInputText
          v-model:value="inputValue"
          iconName="search"
          :class="$style.inputTextSearch"
          placeholder="Введите название поездки или её номер"
        />
      </div>
      <AppButton
        :text="translator('найти',localizationStore.locale)"
        size="large"
        :class="$style.searchButton"
        @click="searchTrip()"
      />
    </div>
    <div v-if="tripList.length > 0" :class="$style.trips">
      <TripCard
        v-for="trip in tripList"
        :key="trip.id"
        :trip="trip"
      />
    </div>
    <div v-else :class="$style.tripList">
      <div>Список поездок пуст</div>
      <AppButton
        text="Создать поездку"
        type="text"
        :class="$style.buttonCreateTrip"
        @click="openDrawer()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppButton from '@/components/ui/AppButton.vue';
import useDrawerCreateTrip from '@/composables/useDrawerCreateTrip';
import AppInputText from '@/components/ui/AppInputText.vue';
import TripCard from '@/components/elements/TripCard.vue';
import { type Trip } from '@/types/Trip';
import { tripsApi } from '@/api/trips';
import { translator } from '@/libs/translator/translator';
import { useLocalizationStore } from '@/stores/localisationStore';

const drawer = useDrawerCreateTrip();
const localizationStore = useLocalizationStore();
const inputValue = ref('');
const tripList = ref<Trip[]>([]);

const fetchUser = async () => {
  tripList.value = await tripsApi.getTrips();
};

const openDrawer = () => {
  drawer.openDrawer();
};
const searchTrip = () => {
  console.log('я шота нашел');
};

fetchUser();
</script>

 <style module>
.content {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  padding-bottom: 50px;
}
.title {
  font-weight: 700;
  font-size: 26px;
  line-height: 1;
}
.title::first-letter {
  text-transform: uppercase;
}
.searchContainer {
  display: flex;
  align-items: flex-end;
  gap: 20px;
}
.searchInputContainer {
  position: relative;
  width: 100%;
  margin-top: 20px;
}
.inputTextSearch {
  padding-inline: 20px;
  height: 54px;
}
.searchButton {
  max-width: 130px;
}
.searchButton::first-letter {
  text-transform: uppercase;
}
.buttonCreateTrip {
  font-size: 16px;
  line-height: 1;
  border-bottom: 1px dashed var(--color-primary);
  margin-inline: auto;
}
.tripList {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin-top: 30px;
}
.trips {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
 </style>
