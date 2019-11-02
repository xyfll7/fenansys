import { addJudge } from '@/store/api/judge'
const state = {
  judges: []
}
const mutations = {
  SET_JUDGES(state, judges) {
    state.judges = judges
  },
  ADD_JUDGE(state, judge) {
    state.judges.push(judge)
  },
  DELETE_JUDGE(state, index) {
    state.judges.splice(index, 1)
  },
  UPDATE_JUDGE(state, { judge, index }) {
    state.judges[index] = judge
  }
}
const actions = {
  async addJudge({ commit }, judge) {
    const res = await addJudge(judge)
    if (res.data) {
      const { data } = res
      commit('ADD_JUDGE', data)
      return res
    }
    if (res.message) {
      throw new Error(res.message)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
