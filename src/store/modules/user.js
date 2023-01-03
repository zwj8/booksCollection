export default {
    namespaced: true,
    state:{
        //取,先从本地存储取,
        token: localStorage.getItem('token') || '' //token存储到vuex中
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
      }
    },
    actions:{}
}