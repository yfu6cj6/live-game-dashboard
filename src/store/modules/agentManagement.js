import { agentSearch } from '@/api/agentManagement/agent'
import store from '@/store'

const state = {
  agentLevelSidebar: localStorage.getItem('agentLevelSidebarStatus') ? localStorage.getItem('agentLevelSidebarStatus') : true,
  agentLevel: [],
  agentLevelLoading: true,
  agentLevelExpandedKeys: [],
  agentSearchKey: '',
  agentSearchValue: '',
  agentLevelCurrentKey: null
}

const mutations = {
  SET_AGENTLEVEL_SIDEBAR: (state, opened) => {
    state.agentLevelSidebar = opened
    localStorage.setItem('agentLevelSidebarStatus', opened)
  },
  SET_AGENT_LEVEL: (state, [agentLevel, currentKey]) => {
    state.agentLevelCurrentKey = currentKey
    if (JSON.stringify(state.agentLevel) !== JSON.stringify(agentLevel)) {
      state.agentLevel = agentLevel
    }
  },
  SET_AGENT_LEVEL_LOADING: (state, loading) => {
    state.agentLevelLoading = loading
  },
  SET_AGENT_LEVEL_EXPANDED_KEYS: (state, agentLevelExpandedKeys) => {
    if (!state.agentLevelExpandedKeys) {
      state.agentLevelExpandedKeys = []
    }
    state.agentLevelExpandedKeys.push(agentLevelExpandedKeys)
  },
  SET_AGENT_SEARCH: (state, [key, value]) => {
    state.agentSearchKey = key
    state.agentSearchValue = value
  },
  SET_AGENT_LEVEL_CURRENT_KEYS: (state, key) => {
    state.agentLevelCurrentKey = key
  }
}

const actions = {
  closeAgentLevelSideBar({ commit }) {
    commit('SET_AGENTLEVEL_SIDEBAR', false)
  },
  setAgentLevel({ commit }, [agentLevel, currentKey]) {
    commit('SET_AGENT_LEVEL', [agentLevel, currentKey])
  },
  setAgentLevelLoading({ commit }, loading) {
    commit('SET_AGENT_LEVEL_LOADING', loading)
  },
  agentSearch({ commit }, currentKey) {
    return new Promise((resolve, reject) => {
      commit('SET_AGENTLEVEL_SIDEBAR', true)
      store.dispatch('app/openSideBar', { withoutAnimation: false })
      commit('SET_AGENT_LEVEL_LOADING', true)
      agentSearch().then((res) => {
        commit('SET_AGENT_LEVEL', [res.agentLevel, currentKey])
        if (res.agentLevel.length > 0) {
          commit('SET_AGENT_LEVEL_EXPANDED_KEYS', res.agentLevel[0].AgentId)
        }
        commit('SET_AGENT_LEVEL_LOADING', false)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  setAgentSearch({ commit }, [key, value]) {
    commit('SET_AGENT_SEARCH', [key, value])
  },
  setAgentLevelCurrentKey({ commit }, key) {
    commit('SET_AGENT_LEVEL_CURRENT_KEYS', key)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
