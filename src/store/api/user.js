import api from '@/store/api'

export function login(data) {
  return api({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getUserInfo(token) {
  return api({
    url: '/user/getUserInfo',
    method: 'get',
    headers: { Authorization: token }
  })
}

export function logout() {
  return api({
    url: '/user/logout',
    method: 'post'
  })
}
// 抄完
