import { addJudge, getJudges } from '@/store/api/judge'

const SET_JUDGES = 'SET_JUDGES'
const ADD_JUDGE = 'ADD_JUDGE'
const DELETE_JUDGE = 'DELETE_JUDGE'
const UPDATE_JUDGE = 'UPDATE_JUDGE'
const state = {
  judges: []
}
const mutations = {
  [SET_JUDGES](state, judges) {
    state.judges = judges
  },
  [ADD_JUDGE](state, judge) {
    state.judges.push(judge)
  },
  [DELETE_JUDGE](state, index) {
    state.judges.splice(index, 1)
  },
  [UPDATE_JUDGE](state, { judge, index }) {
    state.judges[index] = judge
  }
}
const actions = {
  async getJudges({ commit }) {
    try {
      const res = await getJudges()
      const { data } = res
      commit(SET_JUDGES, data)
    } catch (err) {
      console.log('SS', err)
    }
  },
  async addJudge({ commit }, judge) {
    try {
      const res = await addJudge(judge)
      if (res.data) {
        const { data } = res
        commit(ADD_JUDGE, data)
        return res
      }
    } catch (err) {
      throw err
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
