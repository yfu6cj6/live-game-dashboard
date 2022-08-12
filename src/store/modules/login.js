const getDefaultState = () => {
  return {
    loginTip: ''
  }
}

const state = getDefaultState

const mutations = {
  SET_LOGINTIP: (state, tip) => {
    state.loginTip = tip
  }
}

const actions = {
  setLoginTip({ commit }, tip) {
    commit('SET_LOGINTIP', tip)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

