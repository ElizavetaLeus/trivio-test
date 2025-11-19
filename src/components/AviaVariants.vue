<template>
  <div :class="$style.root">
    <h1 :class="$style.title">
      Найдено
      <span :class="$style.sumVariants">349</span>
      Вариантов
    </h1>
    <div :class="$style.filterVariant">
      <CustomCheckBox
        :isChecked="isChecked"
        @update:isChecked="handleUpdate()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomCheckBox from '@/components/ui/CustomCheckBox.vue';

interface Props {
  isChecked: boolean;
}
interface Emits {
  (event: 'update:Checked'): void;
}
defineProps<Props>();
const emits = defineEmits<Emits>();
const handleUpdate = (): void => {
  emits('update:Checked');
};
</script>

<style module>
.originCheckbox {
  display: none;
}
.originCheckbox:checked + .fakeCheckbox::before {
  background-color: var(--color-primary);
}
.fakeCheckbox {
  --size: 10px;
  width: var(--size);
  height: var(--size);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--color-white);
  border: 1px solid var(--color-primary);
  transition: all 0.3s ease;
}
.fakeCheckbox::before {
  content: '';
  --size: 6px;
  width: var(--size);
  height: var(--size);
  display: flex;
  background-color: transparent;
  border-radius: 50%;
}
</style>
