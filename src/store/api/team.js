import api from '@/store/api'

export function addTeam(data) {
  return api({
    url: '/team/add',
    method: 'post',
    data
  })
}

export function getTeam() {
  return api({
    url: '/team/get',
    method: 'get'
  })
}
