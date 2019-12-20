import { LogFactory } from '../../../service/log/logFactory.js'
import { HttpBase } from '../../../service/https/httpBase.js'
import { Apis } from '../../../api/api.js'
import { isEmpty, getPageUrl } from '../../../utils/util.js'
const app = getApp()
const log = LogFactory.get('AddressAdd')
const http = new HttpBase()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    region: ['广东省', '深圳市', '南山区'],
    customItem: '全部',
    isAdd: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.address) {
      const addr = JSON.parse(options.address)
      this.setData({
        address: addr,
        region: addr.region,
        isAdd: false
      })
    }   
  },
  bindName(e) {
    let addr = this.data.address
    addr.name = e.detail.value
    this.setData({
      address: addr
    })
  },
  bindPhoneFocus (e) {
    let addr = this.data.address
    addr.formatPhone = ''
    this.setData({
      address: addr
    })
  },
  bindPhone(e) {
    let addr = this.data.address
    addr.formatPhone = e.detail.value
    addr.phone = e.detail.value
    this.setData({
      address: addr
    })
  },
  bindAddress(e) {
    let addr = this.data.address
    addr.address = e.detail.value
    this.setData({
      address: addr
    })
  },
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  Submit () {
    let _this = this
    const data = _this.data.address
    if (isEmpty(data.name)) {
      wx.showToast({
        title: '请输入收货人',
        icon: 'none'
      })
      return false
    }
    if (isEmpty(data.phone)) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return false
    }
    if (isEmpty(_this.data.region)) {
      wx.showToast({
        title: '请输入所在地区',
      })
      return false
    } else {
      data.region = _this.data.region
    }
    if (isEmpty(data.address)) {
      wx.showToast({
        title: '请输入地址！',
        icon: 'none'
      })
      return false
    }
    let params = data
    params.userid = app.globalData.userInfo.userid
    !_this.data.isAdd && Object.assign(params, {id: data.id})
    http.post(Apis.address.restful.post, {
      data: params
    }).then(res => {
      log.log(getPageUrl() + ' 收货地址：', res)
      if (!isEmpty(res)) {
        let state = (res.code === 200 && '成功') || '失败'
        wx.showToast({
          title: '操作' + state,
          icon: 'success',
          success: function (ress) {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      } else {
        log.log(getPageUrl() + " 接口数据返回错误")
        wx.showToast({
          title: '操作失败',
          icon: 'error'
        })
      }
    }).catch(err => {
      log.log(getPageUrl() + '操作收货地址失败：', err)
      wx.showToast({
        title: '操作失败',
        icon: 'error'
      })
    })
  }
})