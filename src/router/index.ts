import { createRouter, createWebHistory } from 'vue-router';
import { EnumRouteName } from '@/router/types';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: EnumRouteName.HOME,
      component: () => import('@/pages/HomePage.vue'),
    },
    {
      path: '/trip/:id',
      name: EnumRouteName.TRIP,
      component: () => import('@/pages/TripPage.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
