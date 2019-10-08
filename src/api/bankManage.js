import request from '@/utils/request'

export function getTree(query) {
  return request({
    url: '/bankManage/getTree',
    method: 'get',
    params: query
  })
}

export function getTableList(query) {
  return request({
    url: '/bankManage/getTableList',
    method: 'get',
    params: query
  })
}

export function addItem(data) {
  return request({
    url: '/bankManage/bankManage',
    method: 'post',
    data
  })
}

export function updateItem(id, data) {
  return request({
    url: `/bankManage/bankManage/${id}`,
    method: 'put',
    data
  })
}

export function deleteItem(id) {
  return request({
    url: `/bankManage/bankManage/${id}`,
    method: 'delete'
  })
}
