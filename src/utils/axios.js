//引入axios
import axios from 'axios'
import store from '@/store/index'
import router from '@/router'
//创建axios实例
const service = axios.create({
    baseURL:'http://big-event-vue-api-t.itheima.net'
})
// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // console.log('所有正常的请求都会经过这里',config);
    // 只需要给需要权限的接口添加
    // 判断哪些是需要访问权限的接口？？？？
    const token =store.state.user.token
    if(token){
        config.headers.Authorization=store.state.user.token //统一携带token
    }
        return config;
  }, function (error) {
    // 对请求错误做些什么
    // console.log('所有错误的请求都会经过这里', error);
    return Promise.reject(error);
  });


//响应拦截器
service.interceptors.response.use(function (response) {
  console.log('所有正确的响应都会经过这里',response);
  // 响应状态码为 2xx 时触发成功的回调，形参中的 response 是“成功的结果”

  return response
}, function (error) {
  console.log('所有不正常的响应都会经过这里',error);
  if(error.response.status === 401 && error.response.statusText==='Unauthorized'){
    //清空token和用户信息
    store.commit('user/deleteToken','')
    store.commit('user/delUserInfo',{})
    router.push('/login')
  }
  return Promise.reject(error) //将错误的信息返回给浏览器
})
//默认暴露出去
export default service