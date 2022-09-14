import axios from 'axios'
import { getToken, setToken, removeToken, getTokenType, setTokenType, removeTokenType } from '@/utils/auth'
import router from '@/router/index'
import { Message } from 'element-ui'
import { getMsg } from './response'
import store from '@/store'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    const token = getToken()
    const tokenType = getTokenType()
    if (token && tokenType) {
      // let each request carry token
      config.headers['Authorization'] = tokenType + ' ' + token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (res.code === 401 || res.code === 101) {
      router.push({ path: '/logout' })
      Message.error(getMsg(res.message))
      store.dispatch('login/setLoginTip', res.message)
      return Promise.reject(response)
    }

    if (res.access_token) {
      setToken(res.access_token)
    } else {
      removeToken()
    }
    if (res.token_type) {
      setTokenType(res.token_type)
    } else {
      removeTokenType()
    }

    if (res.code !== 200) {
      Message.error(getMsg(res.message))
      store.dispatch('login/setLoginTip', res.message)
      return Promise.reject(response)
    } else {
      if (res.data) {
        return res.data
      } else {
        return res
      }
    }
  },
  error => {
    console.log('errstatus: ' + error.response.status + ' errstatusText: ' + error.response.statusText) // for debug
    router.push({ path: '/logout' })
    Message.error(error.response.statusText || 'Has Error')
    return Promise.reject(error)
  }
)

export default service
