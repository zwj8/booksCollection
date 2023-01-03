import axios from '@/utils/axios'

const AUTH= {}
//用户注册
AUTH.UserRegister = params=> { return axios.post('/api/reg', params ) } 

//用户登录
AUTH.UserLogin = params=> { return axios.post('/api/login', params ) } 


//默认导出
 export default AUTH