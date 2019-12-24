import { LogFactory } from '../../../service/log/logFactory.js'
import { HttpBase } from '../../../service/https/httpBase.js'
import { Apis } from '../../../api/api.js'
import { isEmpty, getPageUrl, formatStatus, formatTime} from '../../../utils/util.js'
const app = getApp()
const log = LogFactory.get('OrderDetail')
const http = new HttpBase()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {},
    countdown: '00:00:00',
    timer: 0,
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
          if (data.orderStatus === 2) {
            _this.setCountDown()
          }
        }
        wx.hideLoading()
      })
    } else {
      _this.setData({
        order: list[0]
      })
      if (list[0].orderStatus === 2) {        
        _this.setCountDown()
      }
      wx.hideLoading()
    }
  },
  setCountDown () {
    this.data.timer = setInterval(this.setCountDownFn, 1000)
  },
  setCountDownFn () {
    let _this = this
    const order = _this.data.order
    let start_time = order.createTime
    let start = new Date(start_time).getTime()
    let end_time = start + 15 * 60000
    let date = new Date()
    let now = date.getTime()
    let allTime = end_time - now
    log.log('all_time: ', allTime)
    if (allTime > 0) {
      let formatTime = _this.getFormat(allTime)
      allTime -= 1000
      let countDown = `${formatTime.h}:${formatTime.m}:${formatTime.s}`
      _this.setData({
        countdown: countDown
      })
      log.log('timer: ', _this.data.timer)
    } else {
      log.log('已截至')// 超过时长   
      clearInterval(_this.data.timer)
      const data = _this.data.order
      data.orderStatus = 3
      data.status = formatStatus(3)
      _this.setData({
        countdown: '00:00:00',
        order: data
      })
      log.log('timer-over: ', _this.data.timer)
    }
  },
  getFormat (msec) {
    let seconds = parseInt(msec / 1000);
    let m = 0, h = 0, s = 0;
    h = this.timeFormat(Math.floor(seconds / 3600 % 24));
    m = this.timeFormat(Math.floor(seconds / 60 % 60));
    s = this.timeFormat(Math.floor(seconds % 60));
    return { s, m, h };
  },
  timeFormat (time) {
    return time < 10 ? '0' + time : time
  },
  cancel () {
    const data = this.data.order
    data.orderStatus = 3
    wx.showModal({
      title: '提示',
      content: '是否取消该订单',
      success: res => {
        if (res.confirm) {
          http.post(Apis.orders.restful.post, {
            data: data
          }).then(res => {
            if (!isEmpty(res)) {
              let state = (res.code === 200 && '成功') || '失败'
              log.log("取消订单" + state, res)
              wx.showToast({
                title: '取消订单' + state,
                icon: 'success',
                success: function (ress) {
                  let pages = getCurrentPages() // 获取当前页面
                  let prevPage = pages[pages.length - 2]
                  prevPage.setData({
                    refresh: true
                  })
                  wx.navigateBack({
                    delta: 1
                  })
                }
              })
            } else {
              log.log(getPageUrl() + " 接口数据返回错误")
              wx.showToast({
                title: '取消订单',
                icon: 'error'
              })
            }
          }).catch(err => {
            log.log(getPageUrl() + '取消订单失败：', err)
            wx.showToast({
              title: '取消订单失败',
              icon: 'error'
            })
          })
        } else if (res.cancel) {
          log.log(getPageUrl() + ' 用户点击取消', res)
        }
      }
    })
  },
  payfor () {
    //支付
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
    clearInterval(this.data.timer)
    log.log(getPageUrl() + ' onUnload: ', this.data.timer)
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