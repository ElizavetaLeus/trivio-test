<template>
  <label :class="$style.root">
    <input
      type="radio"
      :class="$style.originRadioButton"
      :checked="isChecked"
      @change="handleChange()"
    />
    <span :class="$style.fakeRadioButton"></span>
    <span :class="$style.labelText">{{ label }}</span>
  </label>
</template>
<script setup lang="ts">
interface Props {
  isChecked: boolean;
  label: string;
}
interface Emits {
  (event: 'update:isChecked'): void;
}
defineProps<Props>();
const emits = defineEmits<Emits>();
const handleChange = (): void => {
  emits('update:isChecked');
};
</script>
<style module>
.root {
  display: flex;
  align-items: center;
  gap: 5px;
}
.originRadioButton {
  display: none;
}
.originRadioButton:checked + .fakeRadioButton::before {
  background-color: var(--color-primary);
}
.fakeRadioButton {
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
.fakeRadioButton::before {
  content: '';
  --size: 6px;
  width: var(--size);
  height: var(--size);
  display: flex;
  background-color: transparent;
  border-radius: 50%;
}
.labelText {
  color: var(--color-black);
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
}
</style>
