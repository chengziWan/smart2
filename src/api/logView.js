import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/logView/list',
    method: 'get',
    params: query
  })
}

