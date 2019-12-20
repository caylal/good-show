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
      http.get(Apis.address.queryList, {
        data: {
          pi: _this.data.pi,
          ps: _this.data.ps,
          userid: app.globalData.userInfo.userid
        }
      }).then(res => {
        const data = res
        log.log('addr-list: ', res)
        if (!isEmpty(data.result)) {
          data.result.map(item => {
            item.formatPhone = _this.formatPhone(item.phone)
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
    let index = e.detail.value
    const list = this.data.addrList
    let current = list[index]
    current.isDefault = 1
    http.post(Apis.address.restful.post,{
      data: current
    }).then(res => {
      if (!isEmpty(res)) {
        let state = (res.code === 200 && '成功') || '失败'
        log.log("设为默认" + state, res)
        wx.showToast({
          title: '设置' + state,
          icon: 'none'
        })
      } else {
        log.log(getPageUrl() + " 接口数据返回错误")
        wx.showToast({
          title: '操作失败',
          icon: 'error'
        })
      }
    }).catch(err => log.log('设为默认接口error:', err))
  },
  addAddress () {
    wx.navigateTo({
      url: '/pages/address/add/add',
    })
  },
  editAddress (e) {
    const list = this.data.addrList
    let index = e.currentTarget.dataset.index
    let this_addr = list[index]
    const addr_str = JSON.stringify(this_addr)
    wx.navigateTo({
      url: '/pages/address/add/add?address=' + addr_str,
    })
  },
  deleAddress (e) {
    let _this = this
    const list = _this.data.addrList
    let index = e.currentTarget.dataset.index
    let this_addr = list[index]
    wx.showModal({
      title: '提示',
      content: '是否删除该收货地址',
      success: res => {
        if (res.confirm) {
          http.delete(Apis.address.restful.delete, {
            path: {
              id: this_addr.id
            }
          }).then(res => {
            if (!isEmpty(res)) {
              let state = (res.code === 200 && '成功') || '失败'
              log.log("删除" + state, res)
              wx.showToast({
                title: '删除' + state,
                icon: 'success',
                success: function (ress) {
                  _this.onLoad()
                }
              })
            } else {
              log.log(getPageUrl() + " 接口数据返回错误")
              wx.showToast({
                title: '删除失败',
                icon: 'error'
              })
            }
          }).catch(err => {
            log.log(getPageUrl() + '删除地址失败：', err)
            wx.showToast({
              title: '删除失败',
              icon: 'error'
            })
          })
        } else if (res.cancel) {
          log.log(getPageUrl() + ' 用户点击取消', res)
        }
      }
    })

  },
  formatPhone (tel) {
    let value = (Number(tel) && String(tel).length === 11 && String(tel)) || ''
    let reg = /^(\d{3})\d{4}(\d{4})$/
    return (value && value.replace(reg, '$1****$2')) || tel
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