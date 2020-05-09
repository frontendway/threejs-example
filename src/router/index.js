import Vue from 'vue'
import VueRouter from 'vue-router'
import Learn1 from '../views/Learn1.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Learn1
  }
]

const router = new VueRouter({
  routes
})

export default router
