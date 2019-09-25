import Mock from 'mockjs'

const List = []
const List2 = []
const count = 3

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'


for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    create_usr: '@first',
    name: '管理',
    url: 'menuManage',
    'status|1': ['published', 'deleted'],
    id2: '@increment',
    timestamp2: +Mock.Random.date('T'),
    create_usr2: '@first',
    name2: '管理',
    url2: 'menuManage',
    'status2|1': ['published', 'deleted'],
    id1: '@increment',
    timestamp1: +Mock.Random.date('T'),
    create_usr1: '@first',
    name1: '管理',
    url1: 'menuManage',
    'status1|1': ['published', 'deleted']
  }))
}

for (let i = 0; i < count; i++) {
  List2.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    create_usr: '@first',
    name: '管理',
    url: 'html',
    'status|1': ['published', 'deleted'],
    id2: '@increment',
    timestamp2: +Mock.Random.date('T'),
    create_usr2: '@first',
    name2: '菜单',
    url2: 'html',
    'status2|1': ['published', 'deleted'],
    id1: '@increment',
    timestamp1: +Mock.Random.date('T'),
    create_usr1: '@first',
    name1: '菜单',
    url1: 'html',
    'status1|1': ['published', 'deleted']
  }))
}

export default [
  {
    url: '/dataSelect/list',
    type: 'get',
    response: config => {
      const { dataType, page = 1, limit = 20, sort } = config.query

      // let mockList = List.filter(item => {
      //   if (name && item.name.indexOf(name) < 0) return false
      //   return true
      // })
      let mockList = []
      let header = []
      if (dataType ==='aa1'){
        mockList = List;
        header = ['id','timestamp','create_usr','name','url','status']
      }else{
        mockList = List2;
        header = ['id1','timestamp1','create_usr1','name1','url1','status1']
      }
      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList,
          header: header
        }
      }
    }
  }


]
