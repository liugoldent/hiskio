export const state = () => ({
  baseUrl: 'https://api.hiskio.com/v2',
  loginToken: '',
  userName: '',
  userImg: '',
})

export const mutations = {
  setToken(state, token) {
    state.loginToken = token
  },
  setUser(state, info) {
    state.userName = info.account
    state.userImg = info.avatar
  },
}

export const actions = {
  setToken({ commit }, token) {
    commit('setToken', token)
  },
  setUser({ commit }, info) {
    commit('setUser', info)
  },
}
