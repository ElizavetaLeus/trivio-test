<template>
  <div :class="$style.content">
    <h1 :class="$style.title">Поездки</h1>
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
        text="Найти"
        size="large"
        :class="$style.searchButton"
        @click="searchTrip()"
      />
    </div>
    <div v-if="tripList.length > 0" :class="$style.trips">
      <TripCard
        v-for="trip in tripList"
        :key="trip.id"
        :class="$style.trip"
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
import HTTP from '@/helper/http';
import { type Trip } from '@/types/Trip';

const inputValue = ref('');
const tripList = ref<Trip[]>([]);

const http = new HTTP();

const fetchUser = async () => {
  const response = await http.get<Trip[]>('/trips');
  if (response.data) {
    tripList.value = response.data;
  }
};
const drawer = useDrawerCreateTrip();
// const setInputValue = (value: string) => {
//   inputValue.value = value;
// };
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
}
.title {
  font-weight: 700;
  font-size: 26px;
  line-height: 1;
  margin-top: 50px;
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
