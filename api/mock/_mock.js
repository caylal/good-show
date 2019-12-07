import { isEmpty, formatTime } from '../../utils/util.js'
import { Apis } from '../api.js'
// banner数据
const b_list = []
const b_total = 3
for (let i = 0; i < b_total; i++) {
  b_list.push({
    id: i + 1,
    img: `/assets/images/banner0${i + 1}.jpg`,
    url: `pages/show/detail?url=${Apis.show.restful.get}&&id=${i + 1}`
  })
}
// show-list数据
const s_list = [
  {
    id: "1000",
    title: "红宝石艺术团.春之颂音乐会",
    time: "2020.05.20-2020.05.31",
    address: "深圳 | 保利剧院",
    img: "/assets/images/item01.jpg",
    price: 180,
    createTime: formatTime(new Date()),
    upateTime: formatTime(new Date())
  },
  {
    id: "1001",
    title: "开心麻花独角音乐剧《求婚女王》",
    time: "2019.11.23-11.24",
    address: "深圳 | 华夏艺术中心小剧场",
    img: "/assets/images/item02.jpg",
    price: 390,
    createTime: formatTime(new Date()),
    updateTime: formatTime(new Date())
  },
  {
    id: "1002",
    title: "百老汇原版音乐剧《狮子王》国际巡演深圳站",
    time: "2020.05.22-05.24",
    address: "深圳 | 保利剧院",
    img: "/assets/images/item03.jpg",
    price: 299,
    createTime: formatTime(new Date()),
    updateTime: formatTime(new Date())
  },
  {
    id: "1003",
    title: "吴青峰“太空备忘记”巡回演唱会深圳站",
    time: "2020.01.10-01.11",
    address: "深圳 | 华润深圳湾体育中心“春茧”体育馆",
    img: "/assets/images/item04.jpg",
    price: 380,
    createTime: formatTime(new Date()),
    updateTime: formatTime(new Date())
  },
  {
    id: "1004",
    title: "开心麻花爆笑舞台剧《乌龙山伯爵》",
    time: "2019.12.06-12.08",
    address: "深圳 | 华夏艺术中心-大剧场",
    img: "/assets/images/item05.jpg",
    price: 100,
    createTime: formatTime(new Date()),
    updateTime: formatTime(new Date())
  }
]

// 微信登录
const loginUser = {
  user: { openid: 'oBtr-0JClB18EjozGjP-PbQf_AW4' },
  token: { session_key: 'brN8JCSMB519ajSXCzMYYQ==', expires_in: 7200 }
}


const template = {
  banner: b_list,
  show: s_list,
  login: loginUser
}

export const getMock = (res) => {
  return MockApis[res.url](res)
}

export const MockApis = {
  'banner': req => getData(req.body, template.banner),
  'getShow': req => getData(req.body, template.show),
  'loginBywx': req => getData(req.body, template.login)
}

export const getData = (req, tpl) => {
  return new Promise((resolve, reject) => {
    if (!isEmpty(req)) {
      let result = {code: 200, result: tpl}
      resolve(result)
    }
  })
}