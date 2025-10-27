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
        @updatePassengerList="setPassengerList($event)"
        @updateTripName="setITripName($event)"
        :isTripNameInvalid="isTripNameInvalid"
        :isSelectInvalid="isSelectInvalid"
      />
      <footer :class="$style.footer">
        <AppButton
          text="Создать"
          :class="$style.footerButton"
          @click="createTrip()"
        />
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
import { ref } from 'vue';
import { EnumRouteName } from '@/router/types';

type TripWithoutId = Omit<Trip, 'id'> & { id?: Trip['id'] };

interface Props {
  isOpen: boolean,
}

defineProps<Props>();

const drawer = useDrawerCreateTrip();
const router = useRouter();

const passengerList = ref<User[]>([]);
const tripName = ref<string>('');
const isTripNameInvalid = ref(false);
const isSelectInvalid = ref(false);

const closeDrawer = () => {
  drawer.closeDrawer();
};
const setPassengerList = (passengers: User[]) => {
  passengerList.value = passengers;
};
const setITripName = (value: string) => {
  tripName.value = value;
};
const checkValid = () => {
  if (tripName.value.length === 0) {
    isTripNameInvalid.value = true;
    alert('Укажите название поездки');
    return false;
  }
  isTripNameInvalid.value = false;

  if (passengerList.value.length === 0) {
    isSelectInvalid.value = true;
    alert('Выберите хотя бы одного пассажира');
    return false;
  }
  isSelectInvalid.value = false;

  return true;
};

const createTrip = async () => {
  if (!checkValid()) {
    return;
  }

  const trip: TripWithoutId = {
    name: tripName.value,
    price: 0,
    passengers: passengerList.value,
    services: [],
    status: 'new',
  };

  const createdTrip = await tripsApi.createTrip<TripWithoutId>(trip);
  if (createdTrip) {
    const tripId = createdTrip.id;
    closeDrawer();
    router.push({ name: EnumRouteName.TRIP, params: { id: tripId } });
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
.footerButton {
  max-width: 150px;
}
</style>
