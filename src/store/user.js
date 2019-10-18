import { login } from '@/api/user.js'
import { getToken, setToken } from '@/utils/auth'

const state = {
  token: getToken(),
  user: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, user) => {
    state.user = user
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { email, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ email: email.trim(), password })
        .then(response => {
          if (response.errors || response.email || response.password) {
            reject(response)
          } else {
            console.log(response)
            commit('SET_TOKEN', response.token) // 这里会覆盖掉getToken()方法，页面刷新以后，如果再从 vuex中获取Token肯定会失败
            setToken(response.token)
            resolve()
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
