import request from './request'

export function getFundFlowList(params) {
  return request({
    url: '/fund-flows',
    method: 'get',
    params,
  })
}

export function getFundFlowDetail(id) {
  return request({
    url: `/fund-flows/${id}`,
    method: 'get',
  })
}
