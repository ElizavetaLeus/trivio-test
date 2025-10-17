<template>
  <div :class="classList">{{ getText() }}</div>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';

interface Props {
  status: 'ended' | 'new' | '',
}
const props = defineProps<Props>();

const classList = computed(() => {
  return [
    style.status,
    props.status === 'new' && style.statusNew,
    props.status === 'ended' && style.statusEnded,
  ];
});
const style = useCssModule();
const getText = () => {
  if (props.status === 'new') {
    return 'новая';
  }
  if (props.status === 'ended') {
    return 'завершённая';
  }
  return;
};
</script>

<style module>
.status {
  color: var(--color-white);
  background-color: var(--background-color, transparent);
  font-weight: 400;
  font-size: 12px;
  line-height: 1;
  padding: 2px 30px 4px 30px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  position: absolute;
  right: 0;
  top: 0;
}
.statusNew {
  --background-color: var(--color-primary);
}
.statusEnded{
  --background-color: var(--color-green);
}
</style>
