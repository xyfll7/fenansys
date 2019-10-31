import api from '@/store/api'

export const login = data =>
  api({
    url: '/user/login',
    method: 'post',
    data
  })
export const getUserInfo = token =>
  api({
    url: '/user/info',
    method: 'get',
    headers: { Authorization: token }
  })

export const logout = () =>
  api({
    url: '/user/logout',
    method: 'post'
  })
// 抄完
