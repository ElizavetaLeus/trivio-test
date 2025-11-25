<template>
  <AppModal
    :text="text"
    :isOpen="isOpen"
  >
    <template v-slot:content>
      <div :class="$style.modalContent">
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
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import AppModal from '@/components/ui/AppModal.vue';
import AppButton from '@/components/ui/AppButton.vue';

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
.modalContent {
  display: flex;
  justify-content: flex-start;
  gap: 15px;
}
</style>
