<template>
  <button
    :class="$style.button"
    :isActive="isActive"
    @click="emitListener()"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  text: string;
  isActive?: boolean;
}
interface Emits {
  (event: 'click'): void;
}
const props = withDefaults(defineProps<Props>(), {
  isActive: false,
});

const emits = defineEmits<Emits>();
const emitListener = () => {
  emits('click');
}
</script>

<style module>
.button {
  --color-button: var(--color-primary);
  color: var(--color-white);
 display: flex;
  align-items: center;
  border-radius: 5px;
  border: 1px solid var(--color-button);
  background-color: var(--color-button);
  cursor: pointer;
  transition: 0.3s;
  line-height: 1;
}
.button:hover {
  opacity: 90%;
}
</style>
