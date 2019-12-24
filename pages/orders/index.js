import { LogFactory } from '../../service/log/logFactory.js'
import { HttpBase } from '../../service/https/httpBase.js'
import { Apis } from '../../api/api.js'
import { isEmpty, getPageUrl, formatStatus, formatTime } from '../../utils/util.js'
const app = getApp()
const log = LogFactory.get('Orders')
const http = new HttpBase()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    pi: 1,
    ps: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...'
    })
    this.getOrdersList().then(res => wx.hideLoading())
  },
  getOrdersList () {
    let _this = this
    return new Promise((resolve, reject) => {
      http.get(Apis.orders.queryList, {
        data: {
          pi: _this.data.pi,
          ps: _this.data.ps,
          userid: app.globalData.userInfo.userid
        }
      }).then(res => {
        const data = res
        log.log('orders-list: ', res)
        if (!isEmpty(data.result)) {
          data.result.map(item => {
            item.status = formatStatus(item.orderStatus)
            item.createTime = formatTime(item.createTime)
            item.url = `/pages/orders/detail/detail?id=${item.id}`
          })
          _this.setData({
            orderList: data.result
          })
          wx.setStorageSync('order_list', data.result)
        } else {
          log.log(getPageUrl() + ' orders无数据', res)
        }
        resolve(true)
      }).catch(err => {
        log.log(getPageUrl() + ' orders接口error', err)
        reject(true)
      })
    })
  },
  onShow () {
    let pages = getCurrentPages()
    let currPage = pages[pages.length - 1]
    if (!isEmpty(currPage.data.refresh)) {
      this.onLoad()
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})