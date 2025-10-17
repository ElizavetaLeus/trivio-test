<template>
  <button
    :class="classList"
    @click="emitListener()"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';

type ButtonSize = 'large' | 'default' | 'small';
type ButtonType = 'default' | 'text';

interface Props {
  text: string,
  type?: ButtonType,
  size?: ButtonSize,
}
interface Emits {
  (event: 'click'): void;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'default',
});
const emits = defineEmits<Emits>();
const $style = useCssModule();

const classList = computed(() => {
  return [
    $style.button,
    props.size === 'large' && $style.buttonSizeLarge,
    props.size === 'small' && $style.buttonSizeSmall,
    props.type === 'text' && $style.buttonTypeText,
  ];
});
const emitListener = () => {
  emits('click');
};
</script>

<style module>
.button {
  color: var(--color-white);
  background-color: var(--color-primary);
  padding-block: 12px;
  padding-inline: 44px;
  border-radius: 5px;
  border: none;
  font-size: 14px;
  width: 100%;
  height: 40px;
  transition: 0.3s;
  line-height: 1;
}
.button:hover {
  opacity: 90%;
}
.buttonSizeLarge {
  padding-block: 20px;
  height: 54px;
}
.buttonSizeSmall {
  padding-block: 9px;
  height: 30px;
}
.buttonTypeText {
  padding: 0;
  background-color: transparent;
  color: var(--color-primary);
  height: fit-content;
  width: fit-content;
}
</style>
