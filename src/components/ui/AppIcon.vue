<template>
  <div
    v-html="icon"
    :class="$style.icon"
    :style="`--size ${size}px`"
  >
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string,
  size?: number
}
withDefaults(defineProps<Props>(), {
  size: 20,
});
</script>

<style module>
.icon {
  --size: 20px;
  width: var(--size);
  height: var(--size);
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon svg {
  width: var(--size);
  height: var(--size);
}
</style>
