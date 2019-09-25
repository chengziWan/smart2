import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/dataSelect/list',
    method: 'get',
    params: query
  })
}

