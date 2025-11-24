<template>
  <div :class="$style.root">
    <div :class="$style.iconWrapper">
      <AppIcon name="airplane" />
    </div>
    <input
      type="date"
      :class="$style.calendar"
    />
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue';

</script>

<style module>
.root{
  position: relative;
}
.iconWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 1;
  color: var(--color-primary);
}
.calendar {
  height: 40px;
  background-color: var(--color-gray-light);
  color: var(--color-gray);
  border-radius: 5px;
  width: 100%;
  border: none;
  padding: 10px;
  cursor: pointer;
}
.calendar[type="date"] {
  position: relative;
  padding-inline-start: 40px;
}
.calendar[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  left: 10px;
  opacity: 0;
}
</style>
