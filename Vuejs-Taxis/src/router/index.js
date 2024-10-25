import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'MainMenu',
      component: () => import('@/views/pages/Reservations/MainMenu.vue'),
    },
    {
      path: '/ReservationDetails',
      name: 'ReservationDetails',
      component: () => import('@/views/pages/Reservations/ReservationDetails.vue'),
    },
    {
      path: '/confirmation',
      name: 'confirmation',
      component: () => import('@/views/pages/Reservations/confirmation.vue'),
    },
  ],
});

export default router;
