// pages/mine/index.js
import { isEmpty } from '../../utils/util.js'
import { LogFactory } from '../../service/log/logFactory.js'
const log = LogFactory.get("Mine")
const app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    info: {}
  },
  created () {
    if (isEmpty(wx.getStorageSync("userInfo"))) {
      wx.redirectTo({
        url: '/pages/authorize/index',
      })
    }
  },
  attached () {
    const user_info = wx.getStorageSync('userInfo')
    if (!isEmpty(user_info)) {
      this.setData({
        info: user_info
      })
    }
  }
})