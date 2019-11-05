import { getTeams, addTeam, deleteTeam, updateTeam } from '@/store/api/team'

const SET_TEAMS = 'SET_TEAMS'
const ADD_TEAM = 'ADD_TEAM'
const DELETE_TEAM = 'DELETE_TEAM'
const UPDATE_TEAM = 'UPDATE_TEAM'

const state = {
  teams: []
}

const mutations = {
  [SET_TEAMS](state, teams) {
    state.teams = teams
  },
  [ADD_TEAM](state, team) {
    state.teams.push(team)
  },
  [DELETE_TEAM](state, index) {
    state.teams.splice(index, 1)
  },
  [UPDATE_TEAM](state, { team, index }) {
    state.teams[index] = team
  }
}

const actions = {
  async getTeams({ commit }) {
    try {
      const res = await getTeams()
      const { data } = res
      commit(SET_TEAMS, data)
    } catch (err) {
      console.log(err)
    }
  },
  async addTeam({ commit }, team) {
    try {
      const res = await addTeam(team)
      const { data } = res
      commit(ADD_TEAM, data)
      return res
    } catch (err) {
      throw err
    }
  },
  async deleteTeam({ commit }, { _id, index }) {
    try {
      const res = await deleteTeam(_id)
      if (res.data) {
        commit(DELETE_TEAM, index)
      }
      return res
    } catch (err) {
      console.log(err)
    }
  },
  async updateTeam({ commit }, { team, index }) {
    try {
      const res = await updateTeam(team)
      commit(UPDATE_TEAM, { team: res.data, index })
      return res
    } catch (err) {
      console.log('err0', err)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
