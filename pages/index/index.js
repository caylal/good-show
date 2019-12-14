// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PageCur: 'home'
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