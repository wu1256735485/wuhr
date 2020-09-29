import axios from 'axios'
const { EXCEPTION_BASEURL } = process.env
// 用户系统管理 axios instance
const planningService = axios.create({
  // http://10.167.43.231:8098/loginByNFC?nfcNo=
  baseURL: EXCEPTION_BASEURL, // api 的 base_url
  // baseURL: 'http://10.79.209.68:8110',
  timeout: 5000, // request timeout
  withCredentials: true
})

planningService.interceptors.request.use(
  config => {
    // const token = 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJnb25nenVvbGl1MSIsInVzZXJJZCI6Imdvbmd6dW9saXUxIiwidXNlck5hbWUiOiJnb25nenVvbGl1MSIsIm5hbWUiOiLnqbrosIPnu7Tkv64xIiwicGFzc3dvcmQiOiIyMDI1NmNkZGVmNzY1OTFlZWNjNmQyYWY3ZTdkOGY0YiIsInBlcm1pc3Npb24iOiI1OUZvODkwcFlRbHNjczF4LDEwMTExLHM5RmdBNUU1aHBFODlwUk0sY29tbW9ucm9sZWlkLElFRnBoaGNzTmxwQlIwc2siLCJleHAiOjE1NzcyNDEzNDR9.I2MVH1R8nN1TQlBE1hCOxt26F-UvvwV3pcunyyv1wu6SjS8lMYZy3Kr74KkLsEa1psIv6Z636z2E5RESOSCn_7kzlEHcxOKMZcjHs8FjFm3S0A_42f70ynoebt7U_PoZmXXw0am2EhN6jtgPUaydk7XIQDNIykRrT4qRnK1_k-o'
    // const sessionId = '4841c43a-6cc1-4e35-af02-d08add1ecfa6'
    if (sessionStorage.getItem('tokenStr')) {
      const sessionId = sessionStorage.getItem('sessionStr')
      const token = sessionStorage.getItem('tokenStr')
      config.headers['noaToken'] = token
      config.headers['noahsessionID'] = sessionId
    }
    // config.headers['noaToken'] = token
    // config.headers['noahsessionID'] = sessionId

    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)
planningService.interceptors.response.use(
  response => {
    if (response.headers.noatoken) {
      const noahsessionid = response.headers.noahsessionid
      const noatoken = response.headers.noatoken
      sessionStorage.setItem('tokenStr', noatoken)
      sessionStorage.setItem('sessionStr', noahsessionid)
    }
    const res = response.data
    if (res.code === 500) {
      let errtxt = '出现错误：'
      if (res.msg.includes(errtxt)) {
        res.msg = res.msg.replace(/出现错误：/, '')
        // console.log(res.msg)
      }
    }
    return response
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

export default planningService
