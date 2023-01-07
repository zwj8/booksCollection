import AUTH from '@/api/user'
export default {
    namespaced: true,
    state:{
        //取,先从本地存储取,
        token: localStorage.getItem('token') || '' , //token存储到vuex中
        // 用户信息
        info: JSON.parse(localStorage.getItem('info')) || {}
        
    },
    getters:{
        getUserinfos(state){
            return state.info
        }
    },

    mutations:{
        //存储token
     userToken(state,token){
        state.token=token
        localStorage.setItem('token',token) //token用本地存储做持久化,
      },
      //清空token
      deleteToken(state,token){
        state.token=token
        localStorage.setItem('token',token)
      },
    //存储用户信息
      getUserInfo(state,info){
        state.info=info
        localStorage.setItem('info',JSON.stringify(info))
        },
            //清空用户信息
      delUserInfo(state,info){
        state.info=info
        localStorage.setItem('info',JSON.stringify(info))
        }
    },
    //获取用户信息
    actions:{
        async getUserInfo(context){
            try {
                const {data:res} = await AUTH.UserInfo()
                console.log('获取用户信息成功', res.data)
                if(res.code !== 0) return this.$message.error(res.message)
                context.commit('getUserInfo',res.data)
                // 保存数据
            } catch (err) {
                console.log('获取用户信息失败', err)
          }
       },
  } 
    
}