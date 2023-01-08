import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//配置路由
const routes = [
    //首页页面路由
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/main/Main.vue'),
      redirect:'/home',//路由重定向, 指打开首页时默认加载home页面
      children: [
        //首页
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/home/Home.vue')
        },
        //修改用户信息
        {
          path: 'user-info',
          name: 'userinfo',
          component: () => import('@/views/user/UserInfo.vue')
        },
        //更换用户头像
        {
          path: '/user-avatar',
          name: 'useravatar',
          component: () => import('@/views/user/Avator.vue')
        },
        //重置密码
        {
          path: "/user-pwd",
          name: 'userpwd',
          component: () => import('@/views/user/Password.vue')
        }
      ]
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
// 把下面的代码粘贴到路由模块中对应的位置，即可防止重复跳转到一个路由报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
