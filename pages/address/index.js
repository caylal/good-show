import { LogFactory } from '../../service/log/logFactory.js'
import { HttpBase } from '../../service/https/httpBase.js'
import { Apis } from '../../api/api.js'
import { isEmpty, getPageUrl } from '../../utils/util.js'
const app = getApp()
const log = LogFactory.get('Address')
const http = new HttpBase()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addrList: [],
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
    this.getAddressList().then(res => wx.hideLoading())
  },
  getAddressList () {
    let _this = this
    return new Promise((resolve, reject) => {
      http.get(Apis.address.restful.query, {
        data: {
          pi: _this.data.pi,
          ps: _this.data.ps
        }
      }).then(res => {
        const data = res
        log.log('addr-list: ', res)
        if (!isEmpty(data.result)) {
          data.result.map(item => {
            item.default = item.isDefault === 1 ? true : false
          })
          _this.setData({
            addrList: data.result
          })
        } else {
          log.log(getPageUrl() + ' address无数据', res)
        }
        resolve(true)
      }).catch(err => {
        log.log(getPageUrl() + ' address接口error', err)
        reject(true)
      })
    })
  },
  setDefault (e) {
    log.log('change value:', e.detail.value)
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