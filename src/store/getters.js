import store from '@/store'
const getters = {
  token: state => state.user.token,
  user: state => state.user.user,
  roles: state => state.user.roles,
  teams: state => {
    console.log(!state.team.teams.length)
    if (!state.team.teams.length) {
      store.dispatch('team/getTeams')
    }
    console.log('KKK')
    return state.team.teams
  }
}

export default getters
