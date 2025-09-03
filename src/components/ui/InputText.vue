<template>
  <input
    type="text"
    :value="value"
    :class="$style.searchInput"
    :placeholder="placeholder"
    @input="handlerInput($event)">
</template>

<script setup lang="ts">
interface Props {
  placeholder?: string;
  value?: string;
}
interface Emits {
  (event: 'click'): void;
}
withDefaults(defineProps<Props>(), {
  placeholder: 'Введите название поездки или её номер',
  value: ''
});

const emits = defineEmits<Emits>();

const handlerInput = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  emits('input', inputElement.value)
}
</script>

<style module>
.searchInput {
  width: 100%;
  padding: 17px 20px 17px 50px;
  border: 1px solid transparent;
  border-radius: 5px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.searchInput:focus {
  outline: none;
  border-color: var(--color-primary);
}
</style>
