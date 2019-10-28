import api from '@/store/api'

export function addTeam(data) {
  return api({
    url: '/team/add',
    method: 'post',
    data
  })
}

export function getTeams() {
  return api({
    url: '/team/get',
    method: 'get'
  })
}

export const deleteTeam = data =>
  api({
    url: '/team/delete',
    method: 'delete',
    data
  })

export const updateTeam = data =>
  api({
    url: '/team/update',
    method: 'post',
    data
  })
