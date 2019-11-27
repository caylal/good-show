import { Apis } from '../api/api.js'
import { LogFactory } from '../service/log/logFactory.js'
import { HttpBase } from '../service/https/httpBase.js'
const http = new HttpBase()
const log = LogFactory.get('user')
const loginByCustom = (info) => {
  wx.showLoading({
    title: '登录中',
  })
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        log.log("code: " + res.code)
        http.get(Apis.auth.login, {code: res.code}).then(res=> {
         // 储存用户信息
         if (res && res.user) {
           wx,wx.setStorageSync('userInfo', res.user)
           wx.setStorageSync('token', res.token)
           resolve(res)
         } else {
           reject("服务器异常")
         }
         wx.hideLoading()
        }).catch(err => {
          wx.hideLoading()
          reject(err)
        })
      }
    })
  })
}

/**获取用户信息 */
const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      withCredentials: true,
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

/**检查微信会话是否过期 */
const checkSession = () => {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success: () => {
        resolve(true)
      },
      fail: () => {
        reject(false)
      }
    })
  })
}
/**检查用户是否登录 */
const checkLogin = () => {
  return new Promise((resolve, reject) => {
    const user = wx.getStorageInfoSync('userInfo')
    const tokem = wx.getStorageInfoSync('token')
    if (user && token) {
      resolve(true)
    } else {
      reject(false)
    }
  })
}
module.exports = {
  checkLogin: checkLogin,
  getUserInfo: getUserInfo,
  loginByCustom: loginByCustom
}