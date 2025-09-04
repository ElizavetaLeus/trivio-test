<template>
  <div :class="$style.drawer">
    <header :class="$style.header">
      <div :class="$style.headerTitle"> Введите название поездки</div>
      <button :class="$style.headerButton">
        <AppIcon :icon="icons.cross" />
      </button>
    </header>
    <div :class="$style.content">
      <InputText
        :class="$style.inputText"
        :value="inputValue"
        placeholder="Введите название поездки"
        @input="setInputValue($event)"
      />
      <div :class="$style.selectUsers">
      </div>
    </div>
    <footer :class="$style.footer">
      <AppButton
        text="Создать"
        :isActive="false"
        :class="$style.footerButton"
      >
      </AppButton>
    </footer>
  </div>
</template>

<script setup lang="ts">

import AppIcon from "@/components/ui/AppIcon.vue";
import icons from "@/assets/icons/icons";
import InputText from "@/components/ui/InputText.vue";
import {ref} from "vue";
import AppButton from "@/components/ui/AppButton.vue";

const inputValue = ref("");
const setInputValue = (value: string) => {
  inputValue.value = value;
  return inputValue.value;
}
</script>

<style module>
.drawer {
  position: absolute;
  top: 0;
  right: -400px;
  max-width: 400px;
  height: 100%;
}
.open .drawer {
  right: 0;
}
.header {
  background-color: var(--color-white);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-gray);
}
.headerTitle {
  font-family: var(--font-family-secondary);
  font-weight: 500;
  color: var(--color-black);
  line-height: 1;
}
.headerButton {
  all: unset;
  cursor: pointer;
  color: var(--color-gray);
}
.content {
  background-color: var(--color-gray-light);
}
.inputText {
  font-weight: 700;
  line-height: 1px;
  background-color: var(--color-gray-light);
  text-align: center;
  margin-top: 20px;
  padding: 7px;
}
.inputText:focus {
  outline: none;
  border-bottom-color: var(--color-primary);
}
.footer {
  background-color: var(--color-white);
  border-top: 1px solid var(--color-gray);
  padding: 10px 20px;
}
.footerButton {
  max-height: 40px;
}
</style>
