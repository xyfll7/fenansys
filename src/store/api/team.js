import api from '@/store/api'

export const getTeams = () =>
  api({
    url: '/team/get',
    method: 'get'
  })

export const addTeam = data =>
  api({
    url: '/team/add',
    method: 'post',
    data
  })

export const deleteTeam = data =>
  api({
    url: '/team/delete',
    method: 'delete',
    data
  })

export const updateTeam = data =>
  api({
    url: '/team/update',
    method: 'put',
    data
  })
