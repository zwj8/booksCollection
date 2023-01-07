import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入element-UI和样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//注册
Vue.use(ElementUI)
//引入全局公共样式
import '@/assets/global.less'
//引入路由权限
import '@/permission'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
