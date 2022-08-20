import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import store from '@/store'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: { title: '__announcement', icon: 'nails' },
    children: [{
      path: 'home',
      name: 'Hhome',
      component: () => import('@/views/home/index'),
      meta: { title: '__announcement' }
    }]
  }
]

export const asyncRoutes = [
  // {
  //   // 後台管理
  //   path: '/backstageManagement',
  //   component: Layout,
  //   redirect: '/',
  //   name: 'backstageManagement',
  //   meta: { title: '__backstageManagement', icon: 'el-icon-s-operation', permission: 'BackStageManage' },
  //   displayChildren: true,
  //   children: [
  //     {
  //       // 荷官管理
  //       path: 'dealerManagement',
  //       name: 'DealerManagement',
  //       component: () => import('@/views/backstageManagement/dealerManagement/index'),
  //       meta: { title: '__dealerManagement', permission: 'BackStageManage.DealerManage' }
  //     },
  //     {
  //       // 贈禮管理
  //       path: 'giftManagement',
  //       name: 'GiftManagement',
  //       component: () => import('@/views/backstageManagement/giftManagement/index'),
  //       meta: { title: '__giftManagement', permission: 'BackStageManage.GiftManage' }
  //     },
  //     {
  //       // 真人玩法管理
  //       path: 'liveBetAreaManagement',
  //       name: 'LiveBetAreaManagement',
  //       component: () => import('@/views/backstageManagement/liveBetAreaManagement/index'),
  //       meta: { title: '__liveBetAreaManagement', permission: 'BackStageManage.LiveBetAreaManage' }
  //     },
  //     {
  //       // 遊戲桌管理
  //       path: 'gameTableManagement',
  //       name: 'GameTableManagement',
  //       component: () => import('@/views/backstageManagement/gameTableManagement/index'),
  //       meta: { title: '__gameTableManagement', permission: 'BackStageManage.GameTableManage' }
  //     },
  //     {
  //       // 遊戲區管理
  //       path: 'gameAreaManagement',
  //       name: 'GameAreaManagement',
  //       component: () => import('@/views/backstageManagement/gameAreaManagement/index'),
  //       meta: { title: '__gameAreaManagement', permission: 'BackStageManage.GameAreaManage' }
  //     },
  //     {
  //       // 帳號管理
  //       path: 'accountManagement',
  //       name: 'AccountManagement',
  //       component: () => import('@/views/backstageManagement/accountManagement/index'),
  //       meta: { title: '__accountManagement', permission: 'BackStageManage.AccountManage' }
  //     },
  //     {
  //       // 角色管理
  //       path: 'roleManagement',
  //       name: 'RoleManagement',
  //       component: () => import('@/views/backstageManagement/roleManagement/index'),
  //       meta: { title: '__roleManagement', permission: 'BackStageManage.RoleManage' }
  //     },
  //     {
  //       // 權限管理
  //       path: 'permissionManagement',
  //       name: 'PermissionManagement',
  //       component: () => import('@/views/backstageManagement/permissionManagement/index'),
  //       meta: { title: '__permissionManagement', permission: 'BackStageManage.PermissionManage' }
  //     },
  //     {
  //       // 時區管理
  //       path: 'timeZoneManagement',
  //       name: 'TimeZoneManagement',
  //       component: () => import('@/views/backstageManagement/timeZoneManagement/index'),
  //       meta: { title: '__timeZoneManagement', permission: 'BackStageManage.TimeZoneManage' }
  //     },
  //     {
  //       // 幣別管理
  //       path: 'currencyManagement',
  //       name: 'CurrencyManagement',
  //       component: () => import('@/views/backstageManagement/currencyManagement/index'),
  //       meta: { title: '__currencyManagement', permission: 'BackStageManage.CurrencyManage' }
  //     },
  //     {
  //       // 公告管理
  //       path: 'announcementManagement',
  //       name: 'AnnouncementManagement',
  //       component: () => import('@/views/backstageManagement/announcementManagement/index'),
  //       meta: { title: '__announcementManagement', permission: 'BackStageManage.AnnouncementManage' }
  //     },
  //     {
  //       // 系統管理
  //       path: 'systemManagement',
  //       name: 'SystemManagement',
  //       component: () => import('@/views/backstageManagement/systemManagement/index'),
  //       meta: { title: '__systemManagement', permission: 'BackStageManage.SystemParameterManage' }
  //     }
  //   ]
  // },

  {
    // 代理管理
    path: '/agentManagement',
    component: Layout,
    redirect: '/agentManagement',
    meta: { title: '__directAgentManagement', icon: 'tree', permission: 'AgentManage' },
    children: [{
      path: 'agentManagement',
      name: 'AgentManagement',
      meta: { title: '__directAgentManagement', showSuffix: true },
      click: () => { store.dispatch('agentManagement/agentSearch') }
    },
    {
      path: 'agentManagement/:id(\\d+)',
      name: 'AgentManagement{0}',
      component: () => import('@/views/agentManagement/index'),
      meta: { title: '__directAgentManagement', activeMenu: '/agentManagement/agentManagement' },
      hidden: true
    }]
  },

  {
    // 輸贏報表
    path: '/winLossReport',
    component: Layout,
    redirect: '/winLossReport',
    meta: { title: '__winLossReport', icon: 'winLossReportIcon', permission: 'AgentManage.WinLoss.Report' },
    children: [{
      path: 'winLossReport',
      name: 'WinLossReport',
      component: () => import('@/views/winLossReport/index'),
      meta: { title: '__winLossReport' }
    },
    {
      path: 'winLossReport/:id(\\d+)',
      name: 'WinLossReport{0}',
      component: () => import('@/views/winLossReport/index'),
      meta: { title: '__winLossReport', activeMenu: '/winLossReport/winLossReport' },
      hidden: true
    }]
  },

  {
    // 投注記錄
    path: '/memberBet',
    component: Layout,
    redirect: '/memberBet',
    meta: { title: '__memberBet', icon: 'memberBet', permission: 'MemberManage.Bet.Record' },
    children: [{
      path: 'memberBet',
      name: 'MemberBet',
      component: () => import('@/views/memberBet/index'),
      meta: { title: '__memberBet' }
    },
    {
      path: 'memberBet/:id(\\d+)',
      name: 'MemberBet{0}',
      component: () => import('@/views/memberBet/index'),
      meta: { title: '__memberBet', activeMenu: '/memberBet/memberBet' },
      hidden: true
    }]
  },

  // {
  //   // 遊戲結果
  //   path: '/gameResult',
  //   component: Layout,
  //   redirect: '/gameResult',
  //   meta: { title: '__gameResult', icon: 'poker', permission: 'GameResult' },
  //   children: [{
  //     path: 'gameResult',
  //     name: 'GameResult',
  //     component: () => import('@/views/gameResult/index'),
  //     meta: { title: '__gameResult' }
  //   }]
  // },

  {
    // 代理額度記錄
    path: '/agentBalanceRecord',
    component: Layout,
    redirect: '/agentBalanceRecord',
    meta: { title: '__agentBalanceRecord', icon: 'agentBalanceRecordIcon', permission: 'AgentManage.Balance.Record' },
    children: [{
      path: 'agentBalanceRecord',
      name: 'AgentBalanceRecord',
      component: () => import('@/views/agentBalanceRecord/index'),
      meta: { title: '__agentBalanceRecord' }
    }]
  },

  {
    // 玩家額度記錄
    path: '/memberBalanceRecord',
    component: Layout,
    redirect: '/memberBalanceRecord',
    meta: { title: '__memberBalanceRecord', icon: 'memberBalanceRecordIcon', permission: 'MemberManage.Balance.Record' },
    children: [{
      path: 'memberBalanceRecord',
      name: 'MemberBalanceRecord',
      component: () => import('@/views/memberBalanceRecord/index'),
      meta: { title: '__memberBalanceRecord' }
    }]
  },

  {
    // 代理商額度報表
    path: '/agentBalanceReport',
    component: Layout,
    redirect: '/agentBalanceReport',
    meta: { title: '__agentBalanceReport', icon: 'agentBalanceReportIcon', permission: 'AgentManage.Balance.Report' },
    children: [{
      path: 'agentBalanceReport',
      name: 'AgentBalanceReport',
      component: () => import('@/views/agentBalanceReport/index'),
      meta: { title: '__agentBalanceReport' }
    },
    {
      path: 'agentBalanceReport/:id(\\d+)',
      name: 'AgentBalanceReport{0}',
      component: () => import('@/views/agentBalanceReport/index'),
      meta: { title: '__agentBalanceReport', activeMenu: '/agentBalanceReport/agentBalanceReport' },
      hidden: true
    }]
  },

  // {
  //   // 禮物記錄
  //   path: '/giftRecord',
  //   component: Layout,
  //   redirect: '/giftRecord',
  //   meta: { title: '__giftRecord', icon: 'el-icon-data-analysis', permission: 'GiftManage.Record' },
  //   children: [{
  //     path: 'giftRecord',
  //     name: 'GiftRecord',
  //     component: () => import('@/views/giftRecord/index'),
  //     meta: { title: '__giftRecord' }
  //   },
  //   {
  //     path: 'giftRecord/:id(\\d+)',
  //     name: 'GiftRecord{0}',
  //     component: () => import('@/views/giftRecord/index'),
  //     meta: { title: '__giftRecord', activeMenu: '/giftRecord/giftRecord' },
  //     hidden: true
  //   }]
  // },

  // {
  //   // 贈禮報表
  //   path: '/giftReport',
  //   component: Layout,
  //   redirect: '/giftReport',
  //   meta: { title: '__giftReport', icon: 'el-icon-data-line', permission: 'GiftManage.Report' },
  //   children: [{
  //     path: 'giftReport',
  //     name: 'GiftReport',
  //     component: () => import('@/views/giftReport/index'),
  //     meta: { title: '__giftReport' }
  //   },
  //   {
  //     path: 'giftReport/:id(\\d+)',
  //     name: 'GiftReport{0}',
  //     component: () => import('@/views/giftReport/index'),
  //     meta: { title: '__giftReport', activeMenu: '/giftReport/giftReport' },
  //     hidden: true
  //   }]
  // },

  {
    // IP白名單
    path: '/ipWhitelist',
    component: Layout,
    redirect: '/ipWhitelist',
    meta: { title: '__loginIpWhitelist', icon: 'ipWhitelistIcon', permission: 'WhitelistManage' },
    children: [{
      path: 'ipWhitelist',
      name: 'IpWhitelist',
      component: () => import('@/views/ipWhitelist/index'),
      meta: { title: '__loginIpWhitelist' }
    }]
  },

  {
    // 日誌管理
    path: '/logManagement',
    component: Layout,
    redirect: '/logManagement',
    meta: { title: '__logManagement', icon: 'operationLogIcon', permission: 'LogManage' },
    children: [{
      // 操作日誌
      path: 'operationLog',
      name: 'OperationLog',
      component: () => import('@/views/logManagement/operationLog/index'),
      meta: { title: '__operationLog', icon: 'operationLogIcon', permission: 'LogManage.OperationLog' }
    }]
  },

  {
    // 修改密碼
    path: '/passwordReset',
    component: Layout,
    redirect: '/passwordReset',
    meta: { title: '__modPassword', icon: 'key', permission: 'ModPassword' },
    pcHidden: true,
    children: [{
      path: 'modPassword',
      name: 'ModPassword',
      component: () => import('@/views/modPassword/index'),
      meta: { title: '__modPassword' }
    }]
  },

  {
    path: '/logout',
    name: 'Logout',
    component: () => import('@/views/logout/index'),
    meta: { title: '__logout', icon: 'logout' }
  },

  // 404 pages must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
];

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
