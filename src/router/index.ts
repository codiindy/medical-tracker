import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import PatientDetail from '../pages/PatientDetail.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    {
      path: '/patient/:id(\\d+)',
      name: 'PatientDetail',
      component: PatientDetail,
      props: route => ({ id: String(route.params.id) }),
    },
  ],
})
