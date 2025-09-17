import { ref } from 'vue';

const isOpen = ref(false);

const useDrawerCreateTrip = () => {
  const openDrawer = () => {
    isOpen.value = true;
  };
  const closeDrawer = () => {
    isOpen.value = false;
  };

  return {
    isOpen,
    openDrawer,
    closeDrawer,
  };
};

export default useDrawerCreateTrip;
