import router from './router'
import store from '@/store'


const writeList = ['/login', '/register']
router.beforeEach(async(to, from, next) => {
    // console.log(to)
    // console.log(from)
    const token = store.state.user.token
    if (token) {
      if (to.path === '/login') {
        next('/')
        // console.log('已经有token,不能再去登录页了')
      } else {
        // console.log('已经有token,去其他页面就放行')
        next()
      }
    } else {
      // 定义了writeList,没有token,去登录页或去不存在的页面,
      if (writeList.includes(to.path)) {
        // console.log('没有token,去登录页,就放行')
        next()
      } else {
        // console.log('没有token,去其他页面,就遣返到登录页')
        next('/login')
      }
    }
  })
  