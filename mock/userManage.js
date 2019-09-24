import Mock from 'mockjs'

const List = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: 'W'+'@increment',
    timestamp: +Mock.Random.date('T'),
    create_usr: '@first',
    bank_code1: '工商银行山东济南分行',
    roles: ['admin', 'editor', 'visitor'],
    'status|1': ['published', 'deleted']
  }))
}
const roles = [{
        value: 'admin',
        label: 'admin'
      }, {
        value: 'visitor',
        label: 'visitor'
      }, {
        value: 'editor',
        label: 'editor'
      }]
export default [

  {
    url: '/userManage/getRoles',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: roles
      }
    }
  },
  {
    url: '/userManage/list',
    type: 'get',
    response: config => {
      const { id, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (id && item.id.indexOf(id) < 0) return false
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
    url: '/userManage/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/userManage/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
