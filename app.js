import user from 'service/user.js'
import { LogFactory } from 'service/log/logFactory.js'
const log = LogFactory.get('App')
App({
  onLaunch: function () {
   let _this = this
    user.checkLogin().then(res => {
      log.log('app login')
      _this.globalData.userInfo = wx.getStorageSync('userInfo');
      _this.globalData.token = wx.getStorageSync('token')
      if (_this.userInfoCallback) {
        _this.userInfoCallback(wx.getStorageSync('userInfo'))
      }
    }).catch(() => {
      log.log('app login err')   
    });  
   wx.getSystemInfo({
     success: res => {
       _this.globalData.StatusBar = res.statusBarHeight;
       let custom = wx.getMenuButtonBoundingClientRect();
       _this.globalData.Custom = custom;
       _this.globalData.CustomBar = custom.bottom + custom.top - res.statusBarHeight;
     },
   })
  },
  globalData: {
    userInfo: null,
    token: null
  }
})