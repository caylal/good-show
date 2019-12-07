export const Method = {
  get: 'get',
  post: 'post',
  put: 'put',
  delete: 'delete'
}

export class Restful {
  constructor(url) {
    this.post = Method.post + ' ' + url
    this.delete = Method.delete + ' ' + url + '/{id}'
    this.put = Method.put + ' ' + url
    this.get = url + '/{id}'
    this.query = url
  }
}
export const Apis = {
  banner: {
    queryBanner: 'banner'
  },
  show: {
    restful: new Restful('show'),  // 获取演出信息
    queryShow: 'getShow'
  },
  order: {
    restful: new Restful('order')  //获取订单信息
  },
  addr: {
    restful: new Restful('addr') // 获取地址信息
  },
  auth: {
    login: 'loginBywx'
  },
  user: {
    restful: new Restful('user')
  }
}