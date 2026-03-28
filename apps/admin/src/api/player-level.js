import request from './request'

export function getPlayerLevelList(params) {
  return request({
    url: '/player-levels',
    method: 'get',
    params,
  })
}

export function getPlayerLevelDetail(id) {
  return request({
    url: `/player-levels/${id}`,
    method: 'get',
  })
}

export function createPlayerLevel(data) {
  return request({
    url: '/player-levels',
    method: 'post',
    data,
  })
}

export function updatePlayerLevel(id, data) {
  return request({
    url: `/player-levels/${id}`,
    method: 'patch',
    data,
  })
}

export function deletePlayerLevel(id) {
  return request({
    url: `/player-levels/${id}`,
    method: 'delete',
  })
}
