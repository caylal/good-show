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
    queryList: 'queryBanner'
  },
  show: {
    restful: new Restful('show'),  // 获取演出信息
    queryList: 'queryShow'
  },
  orders: {
    restful: new Restful('orders'), //获取订单信息
    queryList: 'queryOrders'
  },
  address: {
    restful: new Restful('address'),// 获取地址信息
    queryList: 'queryAddress'
  },
  auth: {
    login: 'loginBywx'
  },
  user: {
    restful: new Restful('user')
  }
}