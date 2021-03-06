import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
  {
    // ????????????
    path: '/backstageManagement',
    component: Layout,
    redirect: '/',
    name: 'backstageManagement',
    meta: { title: '__backstageManagement', icon: 'el-icon-s-operation', permission: 'BackStageManage' },
    displayChildren: true,
    children: [
      {
        // ????????????
        path: 'dealerManagement',
        name: 'DealerManagement',
        component: () => import('@/views/backstageManagement/dealerManagement/index'),
        meta: { title: '__dealerManagement', icon: 'el-icon-s-custom', permission: 'BackStageManage.DealerManage' }
      },
      {
        // ????????????
        path: 'giftManagement',
        name: 'GiftManagement',
        component: () => import('@/views/backstageManagement/giftManagement/index'),
        meta: { title: '__giftManagement', icon: 'el-icon-present', permission: 'BackStageManage.GiftManage' }
      },
      {
        // ??????????????????
        path: 'liveBetAreaManagement',
        name: 'LiveBetAreaManagement',
        component: () => import('@/views/backstageManagement/liveBetAreaManagement/index'),
        meta: { title: '__liveBetAreaManagement', icon: 'el-icon-user', permission: 'BackStageManage.LiveBetAreaManage' }
      },
      {
        // ???????????????
        path: 'gameTableManagement',
        name: 'GameTableManagement',
        component: () => import('@/views/backstageManagement/gameTableManagement/index'),
        meta: { title: '__gameTableManagement', icon: 'el-icon-set-up', permission: 'BackStageManage.GameTableManage' }
      },
      {
        // ???????????????
        path: 'gameAreaManagement',
        name: 'GameAreaManagement',
        component: () => import('@/views/backstageManagement/gameAreaManagement/index'),
        meta: { title: '__gameAreaManagement', icon: 'poker', permission: 'BackStageManage.GameAreaManage' }
      },
      {
        // ????????????
        path: 'roleManagement',
        name: 'RoleManagement',
        component: () => import('@/views/backstageManagement/roleManagement/index'),
        meta: { title: '__roleManagement', icon: 'people', permission: 'BackStageManage.RoleManage' }
      },
      {
        // ????????????
        path: 'timeZoneManagement',
        name: 'TimeZoneManagement',
        component: () => import('@/views/backstageManagement/timeZoneManagement/index'),
        meta: { title: '__timeZoneManagement', icon: 'international', permission: 'BackStageManage.TimeZoneManage' }
      }
    ]
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
