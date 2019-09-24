import request from '@/utils/request'

export function getTree() {
  return request({
    url: '/settleTypeManage/getTree',
    method: 'get'
  })
}

export function getTableList(query) {
  return request({
    url: '/settleTypeManage/getTableList',
    method: 'get',
    params: query
  })
}

export function addItem(data) {
  return request({
    url: '/settleTypeManage/bankManage',
    method: 'post',
    data
  })
}

export function updateItem(id, data) {
  return request({
    url: `/settleTypeManage/bankManage/${id}`,
    method: 'put',
    data
  })
}

export function deleteItem(id) {
  return request({
    url: `/settleTypeManage/bankManage/${id}`,
    method: 'delete'
  })
}
