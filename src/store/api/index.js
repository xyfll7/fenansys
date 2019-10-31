import axios from 'axios'
import store from '@/store'
import Code from '@/utils/code'
import { Message, MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import { prefix } from '@/settings'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API + prefix,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.common['Authorization'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== Code.SUCCESS) {
      Message({
        message: res.message || 'Error!!',
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === Code.ILLEGAL_TOKEN || res.code === Code.OTHER_CLIENTS_LOGGED_IN || res.code === Code.TOKEN_EXPIRES) {
        console.log('DDDD', res)
        // to re-login
        MessageBox.confirm('您将退出登陆，您可以点击取消以保持此页面，或重新登陆', '确认退出', {
          confirmButtonText: '重新登陆',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
          .catch(() => {})
      }
      console.log('axios失败')
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      console.log('axios成功')
      return res
    }
  },
  error => {
    console.log('axios错误')
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
