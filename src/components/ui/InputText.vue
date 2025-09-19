<template>
  <div :class="$style.root">
    <AppIcon
      v-if="iconName"
      :class="$style.inputIcon"
      :name="iconName"
    />
    <input
      type="text"
      :value="value"
      :placeholder="placeholder"
      :class="[$style.input, iconName && $style.inputWithIcon]"
      @input="onInput($event)"
    >
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue';
import { icons } from '@/assets/icons/icons.ts';

interface Props {
  value: string,
  placeholder: string,
  iconName?: keyof typeof icons,
}
interface Emits {
  (event: 'update:value', value: string): void,
}

withDefaults(defineProps<Props>(), {
  iconName: undefined,
});
const emits = defineEmits<Emits>();

const onInput = (event: Event) => {
  const element = event.target as HTMLInputElement;

  emits('update:value', element.value);
};
</script>

<style module>
.root {
  width: 100%;
  background-color: var(--color-white);
  border-radius: 5px;
  padding-inline: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.input {
  width: 100%;
  border: none;
  outline: none;
  min-height: 40px;
  height: 100%;
  padding: 0;
}
.inputIcon {
  color: var(--color-primary);
  background-color: var(--color-white);
}
.inputWithIcon {
  display: flex;
  gap: 10px;
}
</style>
