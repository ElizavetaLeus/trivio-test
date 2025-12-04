<template>
  <div>
    <h1 :class="$style.title">
      {{ plural('найден', props.aviaVariants.length) }}
      <span :class="$style.sumVariants">{{ props.aviaVariants.length }}</span>
      {{ plural('вариант', props.aviaVariants.length) }}
    </h1>
    <form :class="$style.filterVariants" @submit.prevent>
      <AppRadioButton
        name="filterVariants"
        :isChecked="true"
        label="Сначала дешёвые"
        @update:isChecked="handleUpdateCheap()"
      />
      <AppRadioButton
        name="filterVariants"
        label="Сначала дорогие"
        @update:isChecked="handleUpdateExpensive()"
      />
    </form>
    <div :class="$style.aviaVariantWrapper">
      <AviaVariantCard
        v-for="aviaVariant in aviaVariants"
        :key="aviaVariant.id"
        :aviaVariant="aviaVariant"
        @open="openModal(aviaVariant)"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppRadioButton from '@/components/ui/AppRadioButton.vue';
import AviaVariantCard from '@/components/elements/AviaVariantCard.vue';
import { type Ticket } from '@/types/Ticket';
import { plural } from '@/libs/plural';

interface Props {
  aviaVariants: Ticket[];
}
interface Emits {
  (event: 'update:CheckedExpensive'): void;
  (event: 'update:CheckedCheap'): void;
  (event: 'update:Open', ticket: Ticket): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const handleUpdateExpensive = (): void => {
  emits('update:CheckedExpensive');
};
const handleUpdateCheap = (): void => {
  emits('update:CheckedCheap');
};
const openModal = (ticket: Ticket): void => {
  emits('update:Open', ticket);
};
</script>

<style module>
.title {
  font-weight: 700;
  font-size: 26px;
  line-height: 1;
  color: var(--color-black);
}
.title::first-letter {
  text-transform: uppercase;
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
