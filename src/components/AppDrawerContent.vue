<template>
  <div :class="$style.drawerContent">
    <AppSelectComponent />
    <PassengerCard :passenger="passenger" />
  </div>
</template>

<script setup lang="ts">
import AppSelectComponent from '@/components/ui/AppSelectComponent.vue';
import PassengerCard from '@/components/elements/PassengerCard.vue';

const passenger = {
  'id': '1',
  'first_name': 'Смирнов',
  'second_name': 'Алексей',
  'last_name': 'Сергеевич',
};
</script>

<style module>
.drawerContent {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}
</style>
