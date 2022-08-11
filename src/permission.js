import router from './router'
import { resetRouter } from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home pages
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasPermissionRoutes = store.getters.permission_routes.length > 0
      if (hasPermissionRoutes || to.path === '/logout') {
        if (store.getters.modPwd && to.path !== '/home' && to.path !== '/logout') {
          next(`/home?redirect=${to.path}`)
        } else {
          next()
        }
      } else {
        try {
          resetRouter()
          // get user info
          await store.dispatch('user/getInfo')

          // get announcement info
          await store.dispatch('backstageManagement/getAnnouncement')

          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login pages to re-login
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login pages.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to, from) => {
  // finish progress bar
  handleKeepAlive(to)
  NProgress.done()
})

const handleKeepAlive = function(to) {
  if (to.matched && to.matched.length > 2) {
    for (let i = 0, max = to.matched.length - 1; i < max; i++) {
      const element = to.matched[i]
      // 因为import()异步懒加载,第一次获取不到element.components.default.name , 所以不能再beforeEach做,不然第一次访问的界面不缓存第二次才会缓存
      // afterEach就不一样了,这时候可以获取到element.components.default.name了
      if (element.components.default !== undefined && element.components.default.name === 'Layout') {
        continue
      }
      to.matched.splice(i, 1)
      handleKeepAlive(to)
    }
  }
}
