<template>
  <select
    :value="selectedLang"
    name=""
    :class="$style.selectContainer"
    @change="handleOptionChange($event)"
  >
    <option
      v-for="language in languages"
      :key="language"
      :value="language"
    >
      {{ language }}
    </option>
  </select>
</template>

<script setup lang="ts">

interface Props {
  selectedLang: string;
  languages: string[];
}
interface Emits {
  (event: 'change', selectedLanguage: string): void;
}

defineProps<Props>();
const emits = defineEmits<Emits>();

const handleOptionChange = (event: Event) => {
  const selectElement = event.target as HTMLSelectElement;
  const selectedLanguage = selectElement.value;
  emits('change', selectedLanguage);
};
</script>

<style module>
.selectContainer {
  color: var(--color-primary);
  border: none;
  outline: none;
  border-radius: 5px;
  appearance: none;
  width: 100%;
  height: 20px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 400;
}
</style>
