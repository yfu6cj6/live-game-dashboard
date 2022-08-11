const state = {
  accountStatusType: accountStatusType,
  announcementMarqueeStatusType: announcementMarqueeStatusType,
  roles: roles,
  statusType: statusType,
  gamePaymentStatusType: gamePaymentStatusType,
  game_play: game_play
}

const accountStatusType = [{
  key: '0',
  nickname: '__close'
},
{
  key: '1',
  nickname: '__open'
}]

const announcementMarqueeStatusType = [{
  key: '0',
  nickname: '__close'
},
{
  key: '1',
  nickname: '__open'
}]

const roles = [{
  key: 'AgentSubAccountAdmin',
  nickname: '__admin'
},
{
  key: 'AgentSubAccount',
  nickname: '__visitor'
}]

const statusType = [{
  key: 1,
  nickname: '__payouted'
},
{
  key: 2,
  nickname: '__statusNoPayout'
},
{
  key: 3,
  nickname: '__dealerNoSettle'
},
{
  key: 4,
  nickname: '__backedNoSettle'
},
{
  key: 5,
  nickname: '__backedSettle'
},
{
  key: 6,
  nickname: '__betting'
},
{
  key: 7,
  nickname: '__stopBet'
}]

const gamePaymentStatusType = [{
  key: 1,
  nickname: '__payouted'
},
{
  key: 2,
  nickname: '__gamePaymentNoPayout'
},
{
  key: 3,
  nickname: '__dealerNoSettle'
},
{
  key: 4,
  nickname: '__backedNoSettle'
},
{
  key: 5,
  nickname: '__backedSettle'
},
{
  key: 6,
  nickname: '__betting'
},
{
  key: 7,
  nickname: '__stopBet'
}]

const game_play = [{
  key: 0,
  nickname: '__banker'
},
{
  key: 1,
  nickname: '__player'
},
{
  key: 2,
  nickname: '__tie'
},
{
  key: 3,
  nickname: '__bankerPair'
},
{
  key: 4,
  nickname: '__playerPair'
},
{
  key: 6,
  nickname: '__luckySix'
},
{
  key: 9,
  nickname: '__anyPair'
},
{
  key: 10,
  nickname: '__perfectPair'
}]

const mutations = {
  SET_COMMON_TYPE(state) {
    state.accountStatusType = accountStatusType
    state.announcementMarqueeStatusType = announcementMarqueeStatusType
    state.roles = roles
    state.statusType = statusType
    state.gamePaymentStatusType = gamePaymentStatusType
    state.game_play = game_play
  }
}
const actions = {
  setCommonType({ commit }) {
    commit('SET_COMMON_TYPE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
