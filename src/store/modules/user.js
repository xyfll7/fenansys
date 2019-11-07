import { login, logout, getUserInfo } from '@/store/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

import {
  SET_ROLES, // 用户权限
  SET_USER, // 用户信息
  SET_TOKEN // Token
} from './types'

const state = {
  token: getToken(),
  user: {},
  roles: []
}

const mutations = {
  [SET_TOKEN]: (state, token) => {
    state.token = token
  },
  [SET_ROLES]: (state, roles) => {
    state.roles = roles
  },
  [SET_USER]: (state, user) => {
    state.user = user
  }
}

const actions = {
  // 用户登陆(仅获取Token)
  login({ commit }, userInfo) {
    const { email, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ email: email.trim(), password })
        .then(response => {
          const { data } = response
          if (data.errors || data.email || data.password) {
            reject(data)
          } else {
            commit(SET_TOKEN, data.token) // 这里会覆盖掉getToken()方法，页面刷新以后，如果再从 vuex中获取Token肯定会失败
            setToken(data.token)
            resolve()
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo(state.token)
        .then(response => {
          const { data } = response
          if (!data) {
            reject(new Error('验证失败，请重新登陆'))
          }
          commit(SET_USER, data.user)
          commit(SET_ROLES, data.user.roles)
          resolve(data.user) // 这里怎么解决？哪里调用了这个函数？
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit(SET_TOKEN, '')
          commit(SET_ROLES, [])
          removeToken()
          resetRouter()

          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          dispatch('tagsView/delAllViews', null, { root: true })

          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit(SET_TOKEN, '')
      commit(SET_ROLES, [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
