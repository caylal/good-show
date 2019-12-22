export const formatTime = (date, types = 1) => {
  date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  if (types !== 1) {
    return [hour, minute, second].map(formatNumber).join(':')
  } else {
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export const isEmpty = n => {
  if (Object.prototype.toString.call(n) === '[object Object]') {
    if (JSON.stringify(n) !== '{}' || Object.keys(n).length > 0) return false
  } else if (Object.prototype.toString.call(n) === '[object Array]') {
    if (n.length > 0) return false;
  } else {
    if (n != "" && n != null && n != undefined) return false;
  }
  return true
}

export const getPageUrl = () => {
  let pages = getCurrentPages()
  let currentPage = pages[pages.length - 1]
  return currentPage.route
}

export const formatStatus = (status) => {
  const state = {
    1: '交易成功',
    2: '待付款',
    3: '交易关闭'
  }
  return state[status] || '交易关闭'
}

