import Mock from 'mockjs'

const List = []
const count = 99

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    usrid: '@first',
    content: '上传数据'+i,
    address: '127.0.0.'+i,
    'result|1': ['成功', '失败']
  }))
}

export default [
  {
    url: '/logView/list',
    type: 'get',
    response: config => {
      const { content, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (content && item.content.indexOf(content) < 0) return false
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

]
