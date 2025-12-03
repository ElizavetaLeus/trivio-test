<template>
  <div :class="$style.root">
    <div :class="$style.carrier">Перевозчик: {{ aviaVariant.provider }}</div>
    <div :class="$style.tripContent">
      <div :class="$style.dateTime">
        <div :class="$style.time">{{ aviaVariant.timeFrom }}</div>
        <div :class="$style.date">{{ dateFormatter(aviaVariant).dateFrom }}</div>
      </div>
      <div :class="$style.roadMap">
        <div :class="$style.cities">
          <div>{{ aviaVariant.placeFrom }}</div>
          <div>{{ aviaVariant.placeTo }}</div>
        </div>
        <div :class="$style.border"></div>
        <div :class="$style.iata">
          <div>{{ aviaVariant.iataFrom }}</div>
          <div>{{ aviaVariant.iataTo }}</div>
        </div>
      </div>
      <div :class="$style.dateTime">
        <div :class="$style.time">{{ aviaVariant.timerTo }}</div>
        <div :class="$style.date">{{ dateFormatter(aviaVariant).dateTo }}</div>
      </div>
    </div>
    <footer :class="$style.footer">
      <AppButton
        :text="FormatPrice(aviaVariant)"
        :max-width="239"
        @click="openModal()"
      />
    </footer>
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue';
import { type Ticket } from '@/types/Ticket';
import { dateReverse, dateToFormat } from '@/helper/date-helper';
import { priceFormatter } from '@/helper/price';
interface Props {
  aviaVariant: Ticket;
}
interface Emits {
  (event: 'open'): void;
}
defineProps<Props>();
const emits = defineEmits<Emits>();

const openModal = () => {
  emits('open');
};
const dateFormatter = (aviaVariant: Ticket) => {
  const dateFrom = dateToFormat(dateReverse(aviaVariant.dateFrom), 'DD.MM');
  const dateTo = dateToFormat(dateReverse(aviaVariant.dateTo), 'DD.MM');

  return {
    dateFrom,
    dateTo,
  };
};
const FormatPrice = (aviaVariant: Ticket) => {
  const price = priceFormatter(aviaVariant.price);
  return `Забронировать от ${price}`;
};
</script>

<style module>
.root {
  background-color: var(--color-white);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.carrier {
  color: var(--color-black);
  font-weight: 500;
  font-size: 14px;
  line-height: 1;
}
.tripContent {
  display: flex;
  gap: 40px;
  padding-bottom: 20px;
  padding-top: 15px;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-black-10);
}
.dateTime {
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: var(--color-black);
  line-height: 1;
}
.time {
  font-weight: 700;
  font-size: 20px;
}
.date {
  font-weight: 400;
  font-size: 14px;
}
.roadMap {
  display: flex;
  flex-direction: column;
  max-width: 580px;
  width: 100%;
}
.cities {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
}
.border {
  margin-top: 5px;
  background-color: var(--color-gray-50);
  border-radius: 5px;
  height: 5px;
  width: 100%;
}
.iata {
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: var(--color-primary);
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  padding-top: 5px;
}
.footer {
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
