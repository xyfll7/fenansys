import { getTeams, addTeam, deleteTeam, updateTeam } from '@/store/api/team'
import {
  TEAMS_SET,
  TEAM_ADD,
  TEAM_DELETE,
  TEAM_UPDATE,
  TEAM_ADD_JUDGE, // 新增法官以后 给团队添加法官
  TEAM_DELETE_JUDGE // 删除法官后 在团队中也删除对应的法官
} from './types'

const state = {
  teams: []
}

const mutations = {
  [TEAMS_SET](state, teams) {
    state.teams = teams
  },
  [TEAM_ADD](state, team) {
    state.teams.push(team)
  },
  [TEAM_DELETE](state, index) {
    state.teams.splice(index, 1)
  },
  [TEAM_UPDATE](state, { team, index }) {
    state.teams[index] = team
  },
  // 新增法官以后 给团队添加法官
  [TEAM_ADD_JUDGE](state, judge) {
    judge.teams.forEach(team => {
      state.teams.forEach(team0 => {
        if (team._id === team0._id) {
          const { name, _id } = judge
          team0.members.push({ name, _id })
        }
      })
    })
  },
  // 删除法官后 在团队中也删除对应的法官
  [TEAM_DELETE_JUDGE](state, judge) {
    judge.teams.forEach(team => {
      state.teams.forEach(team0 => {
        if (team._id === team0._id) {
          team0.members = team0.members.filter(judge0 => judge._id !== judge0._id)
        }
      })
    })
  }
}

const actions = {
  async getTeams({ commit }) {
    try {
      const res = await getTeams()
      const { data } = res
      commit(TEAMS_SET, data)
    } catch (err) {
      console.log(err)
    }
  },
  async addTeam({ commit }, team) {
    try {
      const res = await addTeam(team)
      const { data } = res
      commit(TEAM_ADD, data)
      return res
    } catch (err) {
      throw err
    }
  },
  async deleteTeam({ commit }, { _id, index }) {
    try {
      const res = await deleteTeam(_id)
      if (res.data) {
        commit(TEAM_DELETE, index)
      }
      return res
    } catch (err) {
      console.log(err)
    }
  },
  async updateTeam({ commit }, { team, index }) {
    try {
      const res = await updateTeam(team)
      commit(TEAM_UPDATE, { team: res.data, index })
      return res
    } catch (err) {
      console.log('err0', err)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
