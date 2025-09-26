<template>
  <input
    type="text"
    :value="value"
    :class="$style.searchInput"
    :placeholder="placeholder"
    @input="handlerInput($event)"
  >
</template>

<script setup lang="ts">
interface Props {
  placeholder: string;
  value?: string;
}
interface Emits {
  (event: 'input', value: string): void;
}

withDefaults(defineProps<Props>(), {
  value: '',
});

const emits = defineEmits<Emits>();
const handlerInput = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  emits('input', inputElement.value);
};
</script>

<style module>
.searchInput {
  width: 100%;
  text-align: center;
  border: none;
  background: transparent;
  font-size: 14px;
  color: var(--color-primary);
  font-weight: 700;
  border-bottom: 1px solid transparent;
  padding: 7px 15px;
  transition: border-color 0.2s;
}
.searchInput::-webkit-input-placeholder {
  color: var(--color-black-20);
}
.searchInput:focus {
  outline: none;
  border-bottom-color: var(--color-primary);
}
</style>
