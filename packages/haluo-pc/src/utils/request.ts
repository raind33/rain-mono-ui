import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import { ElMessage } from 'element-plus'
export const MANAGERURL = '//manager.corp.jddmoto.com/' // 默认
export const CRMURL = '//crm.corp.jddmoto.com/api' // CRM服务地址
export const APIURL = '//api.jddmoto.com/'

// import { platformList2 } from '@/utils/enum'

axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Method': 'POST,GET'
}
const beforeAlterList = ['beforeAlterFirst', 'beforeAlterTwo', 'beforeAlterThree'] // 存储的列表字段名，在数组中，才会记录日志

// create an axios instance
const service = axios.create({
  baseURL: MANAGERURL, // api 的 base_url  // mp.jddmoto.com/admin
  timeout: 60000, // request timeout
  transformRequest: [
    function (data) {
      // `transformRequest` 允许在向服务器发送前，修改请求数据
      // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
      // if (data) { data['platform'] = platformList2['OSS']; }
      return qs.stringify(data)
    }
  ]
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // crm服务的替换
    if (config.url) {
      if (/\/crm/.test(config.url)) {
        config.baseURL = CRMURL
        config.url = config.url.replace('/crm', '')
      }
    }
    if ((config as any).contentType !== false) {
      config.headers = {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const findSuccess = beforeAlterList.find(_ => {
      return (response.config as any)[_] === true
    })
    if (findSuccess) {
      const data = response.data.data || {}
      const ext = response.data.ext || {}
      const storageData = data.list && data.list.length ? data.list[0] : data
      sessionStorage.setItem(findSuccess, JSON.stringify(storageData))
      console.log(ext)
      sessionStorage.setItem('objId', (ext && ext.objId) || '')
    } // 有上字段时，取出字段
    const code = response.data.code
    if ([0, 200, 1001, undefined].indexOf(code) > -1) {
      // 返回正常
      return response
    } else if (code === 90001) {
      // 用户没有权限
      ElMessage({
        message: '您没有操作权限, 请刷新页面重试',
        type: 'error',
        duration: 5 * 1000
      })
      // setTimeout(() => {
      //   location.reload()
      // }, 5000)
      return Promise.reject({
        // 保持结构和error的一致 可以在业务里面统一处理
        message: response.data.msg,
        response
      })
    } else {
      // 是否隐藏错误提示
      if (!response.config.params || (response.config.params && !response.config.params.hideErrorMsg)) {
        ElMessage({
          message: response.data.msg || '接口响应信息异常',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject({
        message: response.data.msg,
        response
      })
    }
  },
  error => {
    console.log(error.message)
    const message = error.response && error.response.data && error.response.data.message
    ElMessage({
      message: message || '网络超时',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
