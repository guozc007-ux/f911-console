import request from './request'

export function getUserList(params) {
  return request({
    url: '/users',
    method: 'get',
    params,
  })
}

export function getUserDetail(id) {
  return request({
    url: `/users/${id}`,
    method: 'get',
  })
}

export function createUser(data) {
  return request({
    url: '/users',
    method: 'post',
    data,
  })
}

export function updateUser(id, data) {
  return request({
    url: `/users/${id}`,
    method: 'patch',
    data,
  })
}

export function updateUserStatus(id, data) {
  return request({
    url: `/users/${id}/status`,
    method: 'patch',
    data,
  })
}

export function deleteUser(id) {
  return request({
    url: `/users/${id}`,
    method: 'delete',
  })
}
