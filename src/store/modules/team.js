import { getTeams, addTeam, deleteTeam, updateTeam } from '@/store/api/team'
const state = {
  teams: []
}

const mutations = {
  SET_TEAMS(state, teams) {
    state.teams = teams
  },
  ADD_TEAM(state, team) {
    state.teams.push(team)
  },
  DELETE_TEAM(state, index) {
    state.teams.splice(index, 1)
  },
  UPDATE_TEAM(state, { team, index }) {
    state.teams[index] = team
  }
}

const actions = {
  async getTeams({ commit }) {
    const res = await getTeams()
    const { data } = res
    commit('SET_TEAMS', data)
  },
  async addTeam({ commit }, team) {
    const res = await addTeam(team)
    if (res.data) {
      const { data } = res
      commit('ADD_TEAM', data)
      return res
    }
    if (res.message) {
      throw new Error(res.message)
    }
  },
  async deleteTeam({ commit }, { _id, index }) {
    const res = await deleteTeam(_id)
    if (res.data) {
      commit('DELETE_TEAM', index)
    }
    return res
  },
  async updateTeam({ commit }, { team, index }) {
    try {
      const res = await updateTeam(team)
      if (res.data) {
        const team = res.data
        commit('UPDATE_TEAM', { team, index })
      }
      return res
    } catch {}
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
