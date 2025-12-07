import { createRouter, createWebHistory } from "vue-router";
import Top from '../views/Top.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Vertify from '../views/Vertify.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import ConfirmForgotPassword from '../views/ConfirmForgotPassword.vue'

const routes = [
  { path: '/', component: Top },
  { path: '/register', component: Register },
  { path: '/vertify', component: Vertify },
  { path: '/login', component: Login },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/confirm-forgot-password', component: ConfirmForgotPassword }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router