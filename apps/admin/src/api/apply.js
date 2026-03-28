import request from './request'

export function getApplyList(params) {
  return request({
    url: '/applys',
    method: 'get',
    params,
  })
}

export function getApplyDetail(id) {
  return request({
    url: `/applys/${id}`,
    method: 'get',
  })
}

export function createApply(data) {
  return request({
    url: '/applys',
    method: 'post',
    data,
  })
}

export function updateApply(id, data) {
  return request({
    url: `/applys/${id}`,
    method: 'patch',
    data,
  })
}

export function updateApplyCheck(id, data) {
  return request({
    url: `/applys/${id}/check`,
    method: 'patch',
    data,
  })
}

export function updateApplyRemit(id, data) {
  return request({
    url: `/applys/${id}/remit`,
    method: 'patch',
    data,
  })
}

export function deleteApply(id) {
  return request({
    url: `/applys/${id}`,
    method: 'delete',
  })
}
