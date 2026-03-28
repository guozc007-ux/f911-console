import request from './request'

export function getProjectReportList(params) {
  return request({
    url: '/project-reports',
    method: 'get',
    params,
  })
}

export function getProjectReportDetail(id) {
  return request({
    url: `/project-reports/${id}`,
    method: 'get',
  })
}

export function createProjectReport(data) {
  return request({
    url: '/project-reports',
    method: 'post',
    data,
  })
}

export function updateProjectReport(id, data) {
  return request({
    url: `/project-reports/${id}`,
    method: 'patch',
    data,
  })
}

export function updateProjectReportStatus(id, data) {
  return request({
    url: `/project-reports/${id}/status`,
    method: 'patch',
    data,
  })
}

export function updateProjectReportPayStatus(id, data) {
  return request({
    url: `/project-reports/${id}/pay-status`,
    method: 'patch',
    data,
  })
}

export function deleteProjectReport(id) {
  return request({
    url: `/project-reports/${id}`,
    method: 'delete',
  })
}
