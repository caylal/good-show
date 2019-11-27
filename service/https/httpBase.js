import { HttpProxy } from './httpProxy.js'
import { Authorize } from '../../utils/config.js'

export class HttpBase {
  get (url, params) {
    return this.request(url, params)
  }
  post (url, params) {
    return this.request(url, params)
  } 
  delete (url, params) {
    return this.request(url, params)
  }

  request (api, params) {
    return new Promise((resolve, reject) => {
      HttpProxy.doRequest(api, params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}