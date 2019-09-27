import Mock from 'mockjs'

const List = [{
    head_no: 'BGJG102',
    bank_code1: 'JGWD102001',
    bank_code2: 'JRJG102001',
    bord_type: '境内',
    bank_name: '工商银行济南分行'
  },
  {
    head_no: 'BGJG102',
    bank_code1: 'JGWD102002',
    bank_code2: 'JRJG102002',
    bord_type: '境内',
    bank_name: '工商银行烟台分行'
  },
  {
    head_no: 'BGJG102',
    bank_code1: 'JGWD102001',
    bank_code2: 'JRJG102001',
    bord_type: '境内',
    bank_name: '工商银行济南分行'
  },
  {
    head_no: 'BGJG102',
    bank_code1: 'JGWD102002',
    bank_code2: 'JRJG102002',
    bord_type: '境内',
    bank_name: '工商银行烟台分行'
  },
  {
      head_no: 'BGJG102',
      bank_code1: 'JGWD102001',
      bank_code2: 'JRJG102001',
      bord_type: '境内',
      bank_name: '工商银行济南分行'
    },
    {
      head_no: 'BGJG102',
      bank_code1: 'JGWD102002',
      bank_code2: 'JRJG102002',
      bord_type: '境内',
      bank_name: '工商银行烟台分行'
    },
]
const treeData = [{
    id: 1,
    name: '工商银行',
    children: [{
      id: 4,
      name: '工商银行山东分行',
      children: [{
        id: 9,
        name: '工商银行山东济南分行'
      }, {
        id: 10,
        name: '工商银行山东烟台分行'
      }]
    }]
  }, {
    id: 2,
    name: '建设银行',
    children: [{
        id: 5,
        name: '建设银行山东分行'
      },
      {
        id: 6,
        name: '建设银行山西分行'
      }
    ]
  },
  {
    id: 3,
    name: '交通银行',
    children: [{
      id: 7,
      name: '交通银行山东分行'
    }, {
      id: 8,
      name: '交通银行山西分行'
    }]
  }
]

export default [
  // mock get all roles form server
  {
    url: '/bankManage/getTree',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: treeData
      }
    }
  },

  // mock get all roles form server
  {
    url: '/bankManage/getTableList',
    type: 'get',
    response: config => {
      const { name, page = 1, limit = 20, sort } = config.query
    
      let mockList = List.filter(item => {
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


  // add role
  {
    url: '/bankManage/bankManage',
    type: 'post',
    response: {
      code: 20000,
      data: {
        bank_code1: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // update role
  {
    url: '/bankManage/bankManage/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },

  // delete role
  {
    url: '/bankManage/bankManage/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }
]
