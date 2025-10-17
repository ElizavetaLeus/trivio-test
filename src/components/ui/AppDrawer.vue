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
          Создание поездки
        </div>
        <button
          :class="$style.headerButton"
          @click="closeDrawer()"
        >
          <AppIcon name="cross"/>
        </button>
      </header>
      <AppDrawerContent
        @update="getSelectedPassenger($event)"
        @updateInputValue="getInputValue($event)"
      />
      <footer :class="$style.footer">
        <AppButton text="Создать" @click="goToTrip()" />
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppDrawerContent from '@/components/AppDrawerContent.vue';
import useDrawerCreateTrip from '@/composables/useDrawerCreateTrip';
import type { User } from '@/types/User';
import { tripsApi } from '@/api/trips';
import type { Trip } from '@/types/Trip';
import { useRouter } from 'vue-router';

type TripWithoutId = Omit<Trip, 'id'> & {id?: Trip['id']};

const router = useRouter();
let passengerList: User[];
let inputValue = '';

interface Props {
  isOpen: boolean,
}

defineProps<Props>();

const drawer = useDrawerCreateTrip();

const closeDrawer = () => {
  drawer.closeDrawer();
};
const getSelectedPassenger = (passengers:User[]) => {
  passengerList = passengers;
  console.log(passengerList, passengers);
};
const getInputValue = (value: string) => {
  inputValue = value;
};
const goToTrip = async () => {
  const trip: TripWithoutId = {
    name: inputValue,
    price: 0,
    passengers: passengerList,
    services: [],
    status: 'new',
  };
  if (inputValue.length === 0 || passengerList.length === 0) {
    alert('Заполните данные для создания поездки');
    return;
  }
  const createdTrip = await tripsApi.createTrip<TripWithoutId>(trip);
  if (createdTrip) {
    const tripId = createdTrip.id;
    closeDrawer();
    router.push({ name: 'trip', params: { id: tripId } });
  } else {
    alert('Ошибка создания поездки');
  }
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
.footer {
  background-color: var(--color-white);
  border-top: 1px solid var(--color-black-10);
  padding: 10px 20px;
  height: 60px;
}
</style>
