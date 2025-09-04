<template>
  <form>
    <select :class="$style.selectContainer" name="">
      <option value="">Выберите сотрудников</option>
    </select>
  </form>
</template>
<script setup lang="ts">
</script>
<style module>
.selectContainer {
padding: 10px 15px;
  background-color: var(--color-white);
  border: none;
  border-radius: 5px;
  width: 100%;
}
.selectLabel {}
</style>
