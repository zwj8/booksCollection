import axios from '@/utils/axios'

const AUTH= {}
//用户注册
AUTH.UserRegister = params=> { return axios.post('/api/reg', params ) } 

//用户登录
AUTH.UserLogin = params=> { return axios.post('/api/login', params ) } 

//用户基本资料
AUTH.UserInfo = ()=> { return axios.get('/my/userinfo') } 

//获取左侧菜单
AUTH.UserMenu = ()=> { return axios.get('/my/menus') } 

//获取左侧菜单
AUTH.UpdateUserInfo = params=> { return axios.put('/my/userinfo',params) } 

//获取左侧菜单
AUTH.UpdateAvator = params=> { return axios.patch('/my/update/avatar',params) } 

//获取左侧菜单
AUTH.UpdatePassword = params=> { return axios.patch('/my/updatepwd',params) } 

//默认导出
 export default AUTH