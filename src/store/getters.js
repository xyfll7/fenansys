const getters = {
  token: state => state.user.token,
  user: state => state.user.user,
  roles: state => state.user.roles
}

export default getters
