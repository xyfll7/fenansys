import api from '@/store/api'

export const addJudge = data =>
  api({
    url: '/judge/add',
    method: 'post',
    data
  })
