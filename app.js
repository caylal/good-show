//app.js
App({
  onLaunch: function () {
   let _this = this
   wx.getSystemInfo({
     success: res => {
       _this.globalData.screenHeight = res.screenHeight;
       _this.globalData.screenWidth = res.screenWidth;
       _this.globalData.statusBarHeight = res.statusBarHeight;
     },
   })
  },
  globalData: {
    userInfo: null
  }
})