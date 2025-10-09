<template>
  <div :class="$style.drawerContent">
    <AppSelectComponent
      :passengers="passengers"
      @click="searchUser($event, passengers)"
    />
  </div>
</template>

<script setup lang="ts">
import AppSelectComponent from '@/components/ui/AppSelectComponent.vue';
import { ref } from 'vue';
import { type User } from '@/utils/UtilUser';
import HTTP from '@/helper/http';
import searchUser from '@/utils/UtilSearchUser';

const passengers = ref<User[]>([]);

new HTTP().get('/users').then(data => { passengers.value = data; });

</script>

<style module>
.drawerContent {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}
</style>
