// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PageCur: 'home'
  },
  onLoad (options) {
    if (options.cur) {
      this.setData({
        PageCur: options.cur
      })
    }
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  // onShareAppMessage() {
  //   return {
  //     title: '天空之旅',
  //     imageUrl: '',
  //     path: '/pages/index/index'
  //   }
  // }
})