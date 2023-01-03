import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//配置路由
const routes = [
    //首页页面路由
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/main/Main.vue')
    },
  //登录页面路由
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue')
  },
    //注册页面路由
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/Register.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
