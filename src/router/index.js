import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import CreateUser from '../views/CreateUser.vue'
import UpdateUser from '../views/UpdateUser.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/create',
    name: 'CreateUser',
    component: CreateUser
  },
  {
    path: '/update/:id',
    name: 'UpdateUser',
    component: UpdateUser
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
