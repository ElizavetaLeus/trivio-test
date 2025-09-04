<template>
  <div :class="$style.content">
    <h1 :class="$style.title">Поездки</h1>
    <div :class="$style.searchContainer">
      <div :class="$style.searchInputContainer">
        <InputText
          :class="$style.inputText"
          :value="inputValue"
          @input="setInputValue($event)"/>
        <AppIcon
          :icon="icons.search"
          :class="$style.inputIcon"
        />
      </div>
      <AppButton
        text="Найти"
        :isActive="false"
        :class="$style.searchButton"
      />
    </div>
    <button :class="$style.button">создать поездку</button>
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
const createTrip = () => {
  console.log('на меня ткнули')
}
</script>

 <style module>
.content {
  margin-inline: 300px;
  display: flex;
  flex-direction: column;
}
.title {
  font-weight: 700;
  font-size: 26px;
  line-height: 1;
  margin-top: 50px;
}
.searchContainer {
  display: flex;
  align-items: flex-end;
  gap: 20px;
}
.searchInputContainer {
  position: relative;
  width: 100%;
  margin-top: 20px;
}
.inputText {
  max-width: 690px;
  padding: 17px 20px 17px 50px;
}
.inputIcon {
  color: var(--color-primary);
  background-color: var(--color-white);
  position: absolute;
  top: 14px;
  left: 20px;
}
.searchButton {
  height: 54px;
}
.button {
  all: unset;
  cursor: pointer;
  font-family: var(--font-family-secondary);
  color: var(--color-primary);
  font-size: 16px;
  line-height: 1;
  border-bottom: 1px dotted var(--color-primary);
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
 </style>
