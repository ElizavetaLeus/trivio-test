<template>
  <div
    :class="[$style.modal, isOpen && $style.modalOpen]"
    @click="closeModal()"
  >
    <div :class="$style.modalWrapper" @click.stop>
      <div :class="$style.modalContent">
        <div :class="$style.text"> Вы точно хотите забронировать? </div>
        <button
          :class="$style.crossButton"
          @click="closeModal()">
          <AppIcon name="cross"/>
        </button>
      </div>
      <div :class="$style.selectionPart">
        <AppButton
          text="Нет"
          :maxWidth="85"
          @click="closeModal()"
        />
        <AppButton
          text="Да"
          :maxWidth="79"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue';
import AppIcon from '@/components/ui/AppIcon.vue';
interface Props {
  isOpen: boolean;
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
.modalContent {
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
.selectionPart {
  display: flex;
  justify-content: flex-start;
  gap: 15px;
}
</style>
