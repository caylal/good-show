import { Apis } from '../api/api.js'
import { LogFactory } from '../service/log/logFactory.js'
import { HttpBase } from '../service/https/httpBase.js'
import { isEmpty } from '../utils/util.js'
const http = new HttpBase()
const log = LogFactory.get('Service-user')
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
          const result = res.result
          if (!isEmpty(result) && !isEmpty(result.user)) {
            const userInfo = {
              name: info.nickName,
              avatar: info.avatarUrl,
              gender: info.gender === 1 ? 'male' : 'female',
              language: info.language,
              country: info.country,
              province: info.province,
              city: info.city
            }
            Object.assign(result.user, userInfo)
            wx.setStorageSync('userInfo', userInfo)
            wx.setStorageSync('token', result.token)
            resolve(result)
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