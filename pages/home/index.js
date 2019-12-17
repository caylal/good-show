import { LogFactory } from '../../service/log/logFactory.js'
import { HttpBase } from '../../service/https/httpBase.js'
import { Apis } from '../../api/api.js'
import { isEmpty, getPageUrl } from '../../utils/util.js'
const app = getApp()
const log = LogFactory.get('Home')
const http = new HttpBase()
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    cardCur: 0,
    bannerList: [],
    showList: [],
    pi: 1,
    ps: 10
  },
  attached () {
    wx.showLoading({
      title: '加载中...'
    })
    //this.getBanner().then(res => {wx.hideLoading()})
    Promise.all([
      this.getBanner(),
      this.getShowList()
    ]).then(res => {
      wx.hideLoading()
    })
  },
  methods: {
    DotStyle(e) {
      this.setData({
        DotStyle: e.detail.value
      })
    },
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
    getBanner() {
      let _this = this
      return new Promise((resolve, reject) => {
        http.get(Apis.banner.queryBanner, {
          data: {
            pi: _this.data.pi,
            ps: _this.data.ps
          }
        }).then(res => {
          const data = res
          log.log('banner-list: ', res)
          if (!isEmpty(data.result)) {
            _this.setData({
              bannerList: data.result
            })
          } else {
            log.log(getPageUrl() + ' banner无数据', res)
          }
          resolve(true)
        }).catch(err => {
          log.log(getPageUrl() + ' banner接口error', err)
          reject(true)
        })
      })
    },
    getShowList() {
      let _this = this
      return new Promise((resolve, reject) => {
        http.get(Apis.show.restful.query, {
          data: {
            pi: _this.data.pi,
            ps: _this.data.ps
          }
        }).then(res => {
          const data = res
          log.log('show-list: ', res)
          if (!isEmpty(data.result)) {
            data.result.map(item => {
              item.url = `pages/show/index?url=${Apis.show.restful.get}&&id=${item.id}`
            })
            _this.setData({
              showList: data.result
            })
          } else {
            log.log(getPageUrl() + ' showList无数据', res)
          }
          resolve(true)
        }).catch(err => {
          log.log(getPageUrl() + ' showList接口error', err)
          reject(true)
        })
      })
    }

  }
})
