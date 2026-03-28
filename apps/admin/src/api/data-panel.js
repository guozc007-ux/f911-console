import request from './request'

export function getOverview() {
  return request({
    url: '/data-panels/overview',
    method: 'get',
  })
}

export function getPlayerOverview() {
  return request({
    url: '/data-panels/player-overview',
    method: 'get',
  })
}
