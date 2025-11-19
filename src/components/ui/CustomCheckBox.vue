<template>
  <label>
    <input
      type="checkbox"
      :class="$style.originCheckbox"
      :checked="isChecked"
      @change="handleChange()"
    />
    <span :class="$style.fakeCheckbox"></span>
  </label>
</template>
<script setup lang="ts">
interface Props {
  isChecked: boolean;
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
