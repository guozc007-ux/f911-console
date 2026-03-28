import request from './request'

export function getBossTypeList(params) {
  return request({
    url: '/boss-types',
    method: 'get',
    params,
  })
}

export function getBossTypeDetail(id) {
  return request({
    url: `/boss-types/${id}`,
    method: 'get',
  })
}

export function createBossType(data) {
  return request({
    url: '/boss-types',
    method: 'post',
    data,
  })
}

export function updateBossType(id, data) {
  return request({
    url: `/boss-types/${id}`,
    method: 'patch',
    data,
  })
}

export function deleteBossType(id) {
  return request({
    url: `/boss-types/${id}`,
    method: 'delete',
  })
}
