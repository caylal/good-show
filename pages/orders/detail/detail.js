import { LogFactory } from '../../../service/log/logFactory.js'
import { HttpBase } from '../../../service/https/httpBase.js'
import { Apis } from '../../../api/api.js'
import { isEmpty, getPageUrl, formatStatus, formatTime } from '../../../utils/util.js'
const app = getApp()
const log = LogFactory.get('OrderDetail')
const http = new HttpBase()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {},
    countdown: '00:00:00'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.getOrderDetail(options.id)
  },
  getOrderDetail(id) {
    let _this = this
    const order_list = wx.getStorageSync('order_list')
    let list = []
    list = order_list.length > 0 && order_list.filter(item => item.id == id)
    if (list.length <= 0) {
      http.get(Apis.orders.restful.get, {
        path: {
          id: id
        }
      }).then(res => {
        log.log("order_detail: ", res)
        if (res.code === 200 && !isEmpty(res.result)) {
          const data = res.result
          data.map(item => {
            item.status = formatStatus(item.orderStatus)
            item.createTime = formatTime(item.createTime)
          })
          _this.setData({
            order: data
          })
        }
        wx.hideLoading()
      })
    } else {
      _this.setData({
        order: list[0]
      })
      if (list[0].orderStatus === 2) {
        let time = list[0].createTime
        _this.countDown(time)
      }
      wx.hideLoading()
    }
  },
  countDown (time) {
    let _this = this
    let start_time = time
    log.log(start_time)
    let start = new Date(start_time).getTime()
    let end_time = start + 15 * 60000
    let date = new Date()
    let now = date.getTime()

    let allTime = end_time - now
    if (allTime  > 0) {
      let formatTime = this.getFormat(allTime)
      let countDown = `${formatTime.hh}:${formatTime.mm}:${formatTime.ss}`
      _this.setData({
        countdown: countDown
      })
      setTimeout(_this.countDown, 100);
    } else {
      log.log('已截至')
      const data = _this.data.order
      data.orderStatus = 3
      data.status = formatStatus(3)
      _this.setData({
        countdown: '00:00:00',
        order: data
      })
    }
  },
  getFormat (msec) {
    let ss = parseInt(msec / 1000);
    let ms = parseInt(msec % 1000);
    let mm = 0;
    let hh = 0;
    if (ss > 60) {
      mm = parseInt(ss / 60);
      ss = parseInt(ss % 60);
      if (mm > 60) {
        hh = parseInt(mm / 60);
        mm = parseInt(mm % 60);
      }
    }
    ss = ss > 9 ? ss : `0${ss}`;
    mm = mm > 9 ? mm : `0${mm}`;
    hh = hh > 9 ? hh : `0${hh}`;
    return { ss, mm, hh };
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