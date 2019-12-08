import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
  {
    path: '/planned',
    name: 'Planned',
    component: () => import('../views/Planned.vue'),
  },
  {
    path: '/actual',
    name: 'Actual',
    component: () => import('../views/Actual.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;