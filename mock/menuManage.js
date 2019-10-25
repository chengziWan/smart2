import Mock from 'mockjs'
const menuData =
  [
    {
      'id': 1,
      'path': '/console',
      'redirect': 'noredirect',
      'component': 'Layout',
      'name': 'console',
      'title': '系统管理',
      'icon': 'component',
      'parentId': -1,
      'children': [
        {
          'children': [],
          'name': 'user',
          'component': 'console/user/index',
          'id': 7,
          'title': '用户管理',
          'icon': 'user',
          'parentId': 1,
          'path': 'user'
        },
        {
          'children': [],
          'name': 'menu',
          'component': 'console/menu/index',
          'id': 8,
          'title': '菜单管理',
          'icon': 'documentation',
          'parentId': 1,
          'path': 'menu'
        },
        {
          'children': [],
          'name': 'role',
          'component': 'console/role/index',
          'id': 9,
          'title': '角色管理',
          'icon': 'documentation',
          'parentId': 1,
          'path': 'role'
        },
        {
          'children': [],
          'name': 'dict',
          'component': 'console/dict/index',
          'id': 10,
          'title': '字典管理',
          'icon': 'documentation',
          'parentId': 1,
          'path': 'dict'
        },
        {
          'children': [],
          'name': 'dept',
          'component': 'console/dept/index',
          'id': 11,
          'title': '部门管理',
          'icon': 'documentation',
          'parentId': 1,
          'path': 'dept'
        }
      ]
    }

  ]
const List = [
  {
    id: '1001',
    parent_id: '10',
    timestamp: +Mock.Random.date('T'),
    create_usr: '@first',
    name: '系统管理',
    url: '/',
    'status|1': ['published', 'deleted']
  },
  {
    id: '100101',
    parent_id: '1001',
    timestamp: +Mock.Random.date('T'),
    create_usr: '@first',
    name: '菜单管理',
    url: '/sysManage/menuManage',
    'status|1': ['published', 'deleted']
  },
  {
    id: '100102',
    parent_id: '1001',
    timestamp: +Mock.Random.date('T'),
    create_usr: '@first',
    name: '角色管理',
    url: '/sysManage/roleManage',
    'status|1': ['published', 'deleted']
  },
  {
    id: '100103',
    parent_id: '1001',
    timestamp: +Mock.Random.date('T'),
    create_usr: '@first',
    name: '账户管理',
    url: '/sysManage/userManage',
    'status|1': ['published', 'deleted']
  },
  {
    id: '1002',
    parent_id: '10',
    timestamp: +Mock.Random.date('T'),
    create_usr: '@first',
    name: '业务配置',
    url: '/',
    'status|1': ['published', 'deleted']
  },
  {
    id: '100201',
    parent_id: '1002',
    timestamp: +Mock.Random.date('T'),
    create_usr: '@first',
    name: '银行组织机构',
    url: '/business/bankManage',
    'status|1': ['published', 'deleted']
  },
  {
    id: '100202',
    parent_id: '1002',
    timestamp: +Mock.Random.date('T'),
    create_usr: '@first',
    name: '业务类型设置',
    url: '/business/settleTypeManage',
    'status|1': ['published', 'deleted']
  },
]
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'
const treeData = [
  {
    id: '1001',
    name: '系统管理',
    children:[
      {
        id: '100101',
        name: '菜单管理'
      },
      {
        id: '100102',
        name: '角色管理'
      },
      {
        id: '100103',
        name: '账户管理'
      },
    ]
  },
  {
    id: '1002',
    name: '业务配置',
    children:[
      {
        id: '100201',
        name: '银行组织机构'
      },
      {
        id: '100202',
        name: '业务类型设置'
      }
    ]
  }
]

export default [
  {
    url: '/menuManage/getTree',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: treeData
      }
    }
  },
  {
    url: '/menuManage/list',
    type: 'get',
    response: config => {
      const { parent_id, name, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (name && item.name.indexOf(name) < 0) return false
        if (!(item.parent_id === parent_id)) return false
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
    url: '/menuManage/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const menuManage of List) {
        if (menuManage.id === +id) {
          return {
            code: 20000,
            data: menuManage
          }
        }
      }
    }
  },


  {
    url: '/menuManage/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/menuManage/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/menuManage/getMenuByRole',
    type: 'get',
      response: config => {
        return menuData
      }
    }
]

