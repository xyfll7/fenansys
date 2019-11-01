import api from '@/store/api'

export const getJudges = () =>
  api({
    url: '/judge/get',
    method: 'get'
  })

export const addJudge = data =>
  api({
    url: '/judge/add',
    method: 'post',
    data
  })

export const deleteJudge = data =>
  api({
    url: '/judge/delete',
    method: 'delete',
    data
  })

export const updateJudge = data =>
  api({
    url: '/judge/update',
    method: 'put',
    data
  })
