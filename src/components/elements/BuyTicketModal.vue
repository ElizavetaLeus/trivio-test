<template>
  <AppModal
    :text="text"
    :isOpen="isOpen"
    @close="closeModal()"
  >
    <template v-slot:content>
      <div :class="$style.modalContent">
        <AppButton
          text="Нет"
          :maxWidth="85"
          type="gray"
          @click="closeModal()"
        />
        <AppButton
          text="Да"
          :maxWidth="79"
          @click="addAviaVariant()"
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
  (event: 'update:close'): void;
  (event: 'addAviaVariant'): void;
}
defineProps<Props>();
const emits = defineEmits<Emits>();

const closeModal = () => {
  emits('update:close');
};
const addAviaVariant = () => {
  emits('addAviaVariant');
};
</script>

<style module>
.modalContent {
  display: flex;
  justify-content: flex-start;
  gap: 15px;
}
</style>
