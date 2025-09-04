<template>
  <div :class="[$style.drawer, isOpen && $style.open]">
    <div :class="[$style.drawerWrap, isOpen && $style.open]">
      <header :class="$style.header">
        <div :class="$style.headerTitle"> Введите название поездки</div>
        <button
          :class="$style.headerButton"
          @click="closeDrawer()"
        >
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
        <AppDrawerContent />
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
  </div>
</template>

<script setup lang="ts">

import AppIcon from "@/components/ui/AppIcon.vue";
import icons from "@/assets/icons/icons";
import InputText from "@/components/ui/InputText.vue";
import {ref} from "vue";
import AppButton from "@/components/ui/AppButton.vue";
import AppDrawerContent from "@/components/AppDrawerContent.vue";

const inputValue = ref("");
const isOpen = ref(true);
const setInputValue = (value: string) => {
  inputValue.value = value;
  return inputValue.value;
}
const closeDrawer = () => {
  isOpen.value = false;
}
</script>

<style module>
.drawer {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--color-black-40);
  visibility: hidden;
  opacity: 0;
}
.open.drawer {
  opacity: 1;
  visibility: visible;
}
.drawerWrap {
  max-width: 400px;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: -400px;
  transition: 0.2s;
}
.open .drawerWrap {
  right: 0;
  opacity: 1;
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
  height: calc(100% - 122px);
  padding-inline: 20px;
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
  height: 60px;
}
.footerButton {
  max-height: 40px;
  padding: 12px 47px;
}
</style>
