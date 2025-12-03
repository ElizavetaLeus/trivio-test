<template>
  <div :class="$style.content">
    <InputTransparent
      :class="[$style.inputText, isTripNameInvalid && $style.inputTextInvalid]"
      :value="inputValue"
      placeholder="Введите название поездки"
      @input="setInputValue($event)"
    />
    <div :class="$style.selectContent">
      <UserSelect
        :options="passengers"
        defaultValue="Выберите сотрудников"
        :isSelectInvalid="isSelectInvalid"
        @updatePassengerList="updateSelectedPassengers($event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputTransparent from '@/components/elements/InputTransparent.vue';
import UserSelect from '@/components/elements/UserSelect.vue';
import type { User } from '@/types/User';
import { usersApi } from '@/api/users';

interface Props {
  isTripNameInvalid: boolean;
  isSelectInvalid: boolean;
}
interface Emits {
  (event: 'updateTripName', tripName: string): void;
  (event: 'updatePassengerList', selectedPassengers: User[]): void;
}

defineProps<Props>();
const emits = defineEmits<Emits>();

const inputValue = ref('');
const selectedPassengers = ref <User[]>([]);
const passengers = ref <User[]>([]);

const fetchUser = async () => {
  passengers.value = await usersApi.getUsers();
};
const setInputValue = (tripName: string) => {
  inputValue.value = tripName;
  emits('updateTripName', inputValue.value);
};
const updateSelectedPassengers = (passengers: User[]) => {
  selectedPassengers.value = passengers;
  emits('updatePassengerList', selectedPassengers.value);
};

fetchUser();
</script>

<style module>
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
.inputTextInvalid {
  border-color: var(--color-red);
}
.selectContent {
  margin-top: 20px;
}
</style>
