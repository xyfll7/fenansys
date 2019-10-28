const getters = {
  token: state => state.user.token,
  user: state => state.user.user,
  roles: state => state.user.roles,
  teams: state => state.team.teams
}

export default getters
