//app.js
App({
  onLaunch: function () {
   let _this = this
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
    userInfo: null
  }
})