<template>
  <div :class="$style.drawerContent">
    <AppSelectComponent />
    <AppSelectedUser
      username="Иванов Иван"
    />
  </div>
</template>

<script setup lang="ts">
import AppSelectComponent from "@/components/ui/AppSelectComponent.vue";
import AppSelectedUser from "@/components/ui/AppSelectedUser.vue";
</script>

<style module>
.drawerContent {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}
</style>
