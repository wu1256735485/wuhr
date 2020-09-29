import axios from 'axios'
import store from '@/store'
import Vue from 'vue'
import router from '@/router'
import {Toast} from 'cube-ui'
Vue.use(Toast)
Vue.use(router)
import { getNoahsessionID, getNoaToken } from '@/common/js/auth'

const user_service = axios.create({
  baseURL: process.env.WAREHOUSE_URL, // api 的 base_url
  timeout: 120000 // request timeout
})

// 请求拦截器
user_service.interceptors.request.use(
  config => {
    const url = config.url
    if (url.indexOf('login') > -1) {
    } else if (store.getters.token) {
      // 请求之前设置noaToken、noahsessionID
      // 让每个请求携带token
      let token = sessionStorage.getItem('tokenStr')
      let session = sessionStorage.getItem('sessionStr')
      config.headers['noaToken'] = token
      config.headers['noahsessionID'] = session
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)
// 响应拦截器
user_service.interceptors.response.use(
  res => {
    return Promise.resolve(res)
  },
  error => {
   const status = error.response.status
   if (status=== 307 || status=== 900) {
    Toast.$create({
      type: 'txt',
      time: 2000,
      zIndex: 990,
      txt: '登录超时,请重新登录'
    }).show()
    router.push('/')
   } else if (status === 403) {
    Toast.$create({
      type: 'txt',
      time: 2000,
      txt: '您没有权限执行该操作'
    }).show()
   }
  return Promise.reject(status)
  }
)
// const url = 'http://10.167.43.232:8765/noah-cloud-user/loginByNFC'
// const url = 'http://10.167.43.155:8765/noah-cloud-user/loginByNFC'
export function requestLogin(data) {
  // const url = 'http://10.167.43.155:8765/noah-cloud-user/loginByNFC'
  const url = 'http://10.167.43.170:8765/noah-cloud-user/loginByNFC'
  let params = new URLSearchParams()
  params.append('nfcNo', data.nfcNo)
  return axios({
    url: url,
    method: 'post',
    data: params
  }).then((result) => {
    if (result.status === 200) {
      sessionStorage.setItem('tokenStr', result.headers.noatoken)
      sessionStorage.setItem('sessionStr', result.headers.noahsessionid)
      sessionStorage.setItem('personnelCode', result.data.data.username)
    }
    return Promise.resolve(result.data)
  })
}

export function getUserMenu(data) {
  // const url = 'http://10.167.43.155:8765/noah-cloud-user/mobilemenu/out/getMenusByUser'
  const url = 'http://10.167.43.170:8765/noah-cloud-user/mobilemenu/out/getMenusByUser'
  let token = sessionStorage.getItem('tokenStr')
  let session = sessionStorage.getItem('sessionStr')
  return axios({
    url: url,
    method: 'get',
    headers: {
      noaToken: token,
      noahsessionID: session
    },
    params: data
  }).then((result) => {
    return Promise.resolve(result.data)
  })
}


/**
 * params {url} 请求地址
 * params {method} 请求方式
 * params {data} 发送给服务端的数据
 * params {headers} 请求头设置
 */

const debug = process.env.NODE_ENV === 'production'
export function RequestQuery(url, method = 'get', data) {
  const userInfo = sessionStorage.getItem('userInfo')
  const code = sessionStorage.getItem('personnelCode')
  const header = {
    'Content-Type': 'application/json;charset=UTF-8',
    'token': JSON.stringify({'code': code})
    // 'token': JSON.stringify({'code': '10110'})
  }
    return method === 'GET' ?
      user_service({
        url: url,
        method: method,
        headers: header,
        params: data
      }).then((result) => {
        return Promise.resolve(result)
      }) : user_service({
        url: url,
        method: method,
        headers: header,
        data: data
      }).then((result) => {
        return Promise.resolve(result)
      })
  // } else {
    // return method === 'GET' ?
    //   axios({
    //     url: '/pro' + url,
    //     method: method,
    //     headers: header,
    //     params: data
    //   }).then((result) => {
    //     return Promise.resolve(result)
    //   }) : axios({
    //     url: '/pro' + url,
    //     method: method,
    //     headers: header,
    //     data: data
    //   }).then((result) => {
    //     return Promise.resolve(result)
    //   })
  // }
}
