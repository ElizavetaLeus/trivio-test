<template>
  <div :class="$style.userContainer">
    <div :class="$style.userName">
      {{ username }}
    </div>
    <button :class="$style.closeButton">
      <AppIcon
        :icon="icons.closeCross"
        :class="$style.icon"
        :style="16"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import AppIcon from "@/components/ui/AppIcon.vue";
import icons from "@/assets/icons/icons";

interface Props {
  username: string;
}
defineProps<Props>();
</script>

<style module>
.userContainer {
  position: relative;
  width: 100%;
}
.userName {
  width: 100%;
  padding: 15px 12px;
  background-color: var(--color-white);
  color: var(--color-black);
  border-radius: 5px;
}
.closeButton {
  background-color: transparent;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: none;
  position: absolute;
  top: -7px;
  right: 5px;
  color: var(--color-gray);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
