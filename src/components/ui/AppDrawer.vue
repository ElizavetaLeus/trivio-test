<template>
  <div
    :class="[$style.drawer, isOpen && $style.open]"
    @click="closeDrawer()"
  >
    <div
      :class="$style.drawerWrapper"
      @click.stop
    >
      <header :class="$style.header">
        <div :class="$style.headerTitle">
          Введите название поездки
        </div>
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
        />
        <AppDrawerContent />
      </div>
      <footer :class="$style.footer">
        <AppButton text="Создать" />
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue';
import icons from '@/assets/icons/icons';
import InputText from '@/components/ui/InputText.vue';
import { ref } from 'vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppDrawerContent from '@/components/AppDrawerContent.vue';
import useDrawerCreateTrip from '@/composables/useDrawerCreateTrip';

interface Props {
  isOpen: boolean,
}

defineProps<Props>();
const inputValue = ref('');

// const setInputValue = (value: string) => {
//   inputValue.value = value;
//   console.log(value);
// };
const drawer = useDrawerCreateTrip();

const closeDrawer = () => {
  drawer.closeDrawer();
  console.log('на меня жмали');
};
</script>

<style module>
.drawer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--color-black-40);
  visibility: hidden;
  opacity: 0;
  transition: 0.3s ease;
}
.open.drawer {
  opacity: 1;
  visibility: visible;
}
.drawerWrapper {
  color: var(--color-white);
  width: 400px;
  height: 100%;
  position: absolute;
  top: 0;
  right: -400px;
  transition: 0.3s ease;
}
.open .drawerWrapper {
  right: 0;
}
.header {
  height: 60px;
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-black-10);
  display: flex;
  padding-inline: 20px;
  justify-content: space-between;
  align-items: center;
}
.headerTitle {
  font-weight: 500;
  color: var(--color-black);
  line-height: 1;
  font-size: 14px;
}
.headerButton {
  background-color: transparent;
  border: none;
  padding: 0;
  color: var(--color-gray);
}
.content {
  background-color: var(--color-gray-light);
  height: calc(100% - 122px);
  padding-inline: 20px;
  overflow-y: auto;
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
  border-top: 1px solid var(--color-black-10);
  padding: 10px 20px;
  height: 60px;
}
</style>
