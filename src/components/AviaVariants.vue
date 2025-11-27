<template>
  <div :class="$style.root">
    <h1 :class="$style.title">
      Найдено
      <span :class="$style.sumVariants">349</span>
      вариантов
    </h1>
    <form :class="$style.filterVariants">
      <AppRadioButton
        name="filterVariants"
        :isChecked="isCheckedCheap"
        @update:isChecked="handleUpdateCheap()"
        label="Сначала дешёвые"
      />
      <AppRadioButton
        name="filterVariants"
        :isChecked="isCheckedExpensive"
        @update:isChecked="handleUpdateExpensive()"
        label="Сначала дорогие"
      />
    </form>
    <div :class="$style.aviaVariantWrapper">
      <AviaVariantCard
        v-for="aviaVariant in aviaVariants"
        :key="aviaVariant.id"
        :aviaVariant="aviaVariant"
        @open="openModal()"/>
      <SkeletonAviaVariantCard />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppRadioButton from '@/components/ui/AppRadioButton.vue';
import AviaVariantCard from '@/components/elements/AviaVariantCard.vue';
import SkeletonAviaVariantCard from '@/components/elements/SkeletonAviaVariantCard.vue';
import { type Ticket } from '@/types/Ticket';

interface Props {
  isCheckedExpensive: boolean;
  isCheckedCheap: boolean;
  aviaVariants: Ticket[];
}
interface Emits {
  (event: 'update:CheckedExpensive'): void;
  (event: 'update:CheckedCheap'): void;
  (event: 'update:Open'): void;
}
defineProps<Props>();
const emits = defineEmits<Emits>();
const handleUpdateExpensive = (): void => {
  emits('update:CheckedExpensive');
};
const handleUpdateCheap = (): void => {
  emits('update:CheckedCheap');
};
const openModal = () => {
  emits('update:Open');
};
</script>

<style module>
.root {
  margin-top: 50px;
}
.title {
  font-weight: 700;
  font-size: 26px;
  line-height: 1;
  color: var(--color-black);
}
.sumVariants {
  color: var(--color-primary);
}
.filterVariants {
  margin-top: 20px;
  background-color: var(--color-white);
  border-radius: 10px;
  padding: 20px 10px;
  display: flex;
  gap: 20px;
  max-width: 420px;
  width: 100%;
}
.aviaVariantWrapper {
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
