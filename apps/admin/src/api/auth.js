import request from './request'

export function getCaptcha() {
  return request({
    url: '/auth/captcha',
    method: 'get',
  })
}

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data,
  })
}

export function logout(data) {
  return request({
    url: '/auth/logout',
    method: 'post',
    data,
  })
}
