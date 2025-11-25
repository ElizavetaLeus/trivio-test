<template>
  <div
    :class="[$style.modal, isOpen && $style.modalOpen]"
    @click="closeModal()"
  >
    <div :class="$style.modalWrapper" @click.stop>
      <div :class="$style.modalHeader">
        <div :class="$style.text"> {{ text }} </div>
        <button
          :class="$style.crossButton"
          @click="closeModal()">
          <AppIcon name="cross"/>
        </button>
      </div>
      <div>
        <slot name="content">content</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue';
interface Props {
  isOpen: boolean;
  text: string;
}
interface Emits {
  (event: 'close'): void;
}
defineProps<Props>();
const emits = defineEmits<Emits>();

const closeModal = () => {
  emits('close');
};
</script>

<style module>
.modal {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  width: 100%;
  z-index: 5;
  height: 100%;
  background-color: var(--color-black-40);
}
.modalOpen {
  opacity: 1;
  visibility: visible;
}
.modalWrapper {
  display: flex;
  flex-direction: column;
  gap: 45px;
  height: 140px;
  width: 400px;
  position: absolute;
  max-width: 90%;
  background-color: var(--color-gray-light);
  padding: 20px;
  border-radius: 10px;
  transform: translateY(100px);
  opacity: 0;
  top: 250px;
}
.modalOpen .modalWrapper {
  transform: translateY(0);
  opacity: 1;
}
.modalHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.text {
  font-weight: 500;
  font-size: 14px;
  line-height: 1;
  color: var(--color-black);
}
.crossButton {
  background-color: transparent;
  border: none;
  padding: 0;
  color: var(--color-gray);
}
</style>
