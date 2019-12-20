import { LogFactory } from '../log/logFactory.js'
import { apiPrefix, cfgMock } from '../../utils/config.js'
import { getMock } from '../../api/mock/_mock.js'

export class HttpProxy {
  static log = LogFactory.get("HttpProxy")

  static doRequest (api, params) {
    let result;
    if (cfgMock.enable) {
      this.log.log('mock request: ' + api, params)
      result = new Promise((resolve, reject) => {
        getMock({url: api, body: params}).then(res => {
          this.log.log('mock response: ' + api, res)
          resolve(res)
        })
      })
    } else {
      api = this.urlPrefix(api, apiPrefix)
      const httpApi = this.analyzeApi(api)
      if (!!params && !!params.path) {
        httpApi.url = this.urlFormat(httpApi.url, params.path)
      }
      this.log.log('request: ' + httpApi.method + ' ' + httpApi.url, params.data)
      const method = httpApi.method.toUpperCase()
      result = new Promise((resolve, reject) => {
        wx.request({
          url: httpApi.url,
          data: params.data,
          method: method,
          header: {
            'Content-Type': 'application/json'
          },
          sucess: res => {
            this.log.log('response: ' + httpApi.method + ' ' + httpApi.url, res.data)
            this.dealWitchCode({response: res, resolve, reject})
          },
          fail: res => {
            reject(res)
          }
        })
      })
    }
    return result
  }

  static dealWitchCode ({response, resolve, reject}) {
    const dataResponse = response.data
    if (!!dataResponse && dataResponse.code === 200) {
      resolve(dataResponse)
    } else if (dataResponse.code > 200) {
      reject(dataResponse)
    } else {
      wx.showModal({
        title: '接口请求错误',
        showCancel: false,
        content: dataResponse.result + `(${dataResponse.code})`
      })
      reject(dataResponse)
    }
  }

  static urlPrefix (url, prefix) {
    let result = url
    if (!!prefix) {
      if (url.indexOf(' ') > 0) {
        const splits = url.split(' ')
        result = splits[0] + ' ' + prefix + '/' + splits[1]
      } else {
        result = prefix + '/' + result
      }
    }
    return result
  }

  static analyzeApi (api) {
    let result;
    if (typeof api === 'string') {
      const splits = api.split(' ')
      let method = 'get'
      let url
      if (splits.length === 1) {
        url = splits[0]
      } else {
        method = splits[0]
        url = splits[1]
      }
      result = {
        method: method,
        url: url
      }
    } else {
      result = api
    }
    return result
  }

  static urlFormat (url, pathParam) {
    let result = url 
    if (!!pathParam) {
      for (const key in pathParam) {
        if(pathParam.hasOwnProperty(key)) {
          result = result.replace('{' + key + '}', pathParam[key])
        }
      }
    }
    return result
  }
}