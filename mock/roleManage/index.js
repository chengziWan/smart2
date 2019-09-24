import Mock from 'mockjs'
import { deepClone } from '../../src/utils/index.js'
import { asyncRoutes, constantRoutes } from './routes.js'

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [
  {
    id: 'admin',
    name: 'admin',
    timestamp: +Mock.Random.date('T'),
    create_usr: '@first',
    'status|1': ['published', 'deleted'],
    description: '超级管理员.',
    routes: routes
  },
  {
    id: 'editor',
    name: 'editor',
    timestamp: +Mock.Random.date('T'),
    create_usr: '@first',
    'status|1': ['published', 'deleted'],
    description: 'Normal Editor. Can see all pages except permission page',
    routes: routes.filter(i => i.path !== '/permission')// just a mock
  },
  {
    id: 'visitor',
    name: 'visitor',
    timestamp: +Mock.Random.date('T'),
    create_usr: '@first',
    'status|1': ['published', 'deleted'],
    description: 'Just a visitor. Can only see the home page and the document page',
    routes: [{
      path: '',
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard' }
        }
      ]
    }]
  }
]
export default [
 {
    url: '/roleManage/routes',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: routes
      }
    }
  },

  {
    url: '/roleManage/list',
    type: 'get',
    response: config => {
      const { name, page = 1, limit = 20, sort } = config.query

      let mockList = roles.filter(item => {
        if (name && item.name.indexOf(name) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },




  {
    url: '/roleManage/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/roleManage/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
