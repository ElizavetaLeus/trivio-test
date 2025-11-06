<template>
  <div :class="$style.root">
    <UserSelect :maxWidth="250"/>
  </div>
</template>
<script setup lang="ts">

import UserSelect from '@/components/elements/UserSelect.vue';
</script>
<style module>
.root {
  margin-top: 50px;
  display: flex;
  gap: 21px;
  align-items: center;
}

</style>
