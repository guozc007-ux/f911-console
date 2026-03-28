import request from './request'

export function getBossList(params) {
  return request({
    url: '/bosses',
    method: 'get',
    params,
  })
}

export function getBossDetail(id) {
  return request({
    url: `/bosses/${id}`,
    method: 'get',
  })
}

export function createBoss(data) {
  return request({
    url: '/bosses',
    method: 'post',
    data,
  })
}

export function updateBoss(id, data) {
  return request({
    url: `/bosses/${id}`,
    method: 'patch',
    data,
  })
}

export function deleteBoss(id) {
  return request({
    url: `/bosses/${id}`,
    method: 'delete',
  })
}
