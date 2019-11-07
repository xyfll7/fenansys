import { addJudge, getJudges, deleteJudge } from '@/store/api/judge'
import store from '@/store'

import {
  JUDGES_SET,
  JUDGE_ADD,
  JUDGE_DELETE,
  JUDGE_UPDATE,
  TEAM_ADD_JUDGE, // 新增法官以后 给团队添加法官
  TEAM_DELETE_JUDGE // 删除法官后 在团队中也删除对应的法官
} from './types'

const state = {
  judges: []
}
const mutations = {
  [JUDGES_SET](state, judges) {
    state.judges = judges
  },
  [JUDGE_ADD](state, judge) {
    state.judges.push(judge)
  },
  [JUDGE_DELETE](state, index) {
    state.judges.splice(index, 1)
  },
  [JUDGE_UPDATE](state, { judge, index }) {
    state.judges[index] = judge
  }
}
const actions = {
  async getJudges({ commit }) {
    try {
      const res = await getJudges()
      const { data } = res
      commit(JUDGES_SET, data)
    } catch (err) {
      console.log('SS', err)
    }
  },
  async addJudge({ commit }, judge) {
    try {
      const res = await addJudge(judge)
      const { data } = res
      store.commit(TEAM_ADD_JUDGE, data) // 新增法官以后 给团队添加法官
      commit(JUDGE_ADD, data)
      return res
    } catch (err) {
      throw err
    }
  },
  async deleteJudge({ commit }, { judge, index }) {
    try {
      const res = await deleteJudge(judge)
      const { data } = res
      store.commit(TEAM_DELETE_JUDGE, data) // 删除法官后 在团队中也删除对应的法官
      commit(JUDGE_DELETE, index)

      return res
    } catch (err) {
      console.log(err)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
