//引入axios
import axios from 'axios'
//创建axios实例
const service = axios.create({
    baseURL:'http://big-event-vue-api-t.itheima.net'
})
//请求拦截器
//响应拦截器
//默认暴露出去
export default service