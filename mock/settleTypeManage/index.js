import Mock from 'mockjs'

const List = [{
    head_no: 'BGJG102',
    settle_type: 'YWLX001',
    name: '取现',
    bord_type: '境内',
    bank_name: '工商银行济南分行'
  },
  {
    head_no: 'BGJG102',
    settle_type: 'YWLX002',
    name: '存款',
    bord_type: '境内',
    bank_name: '工商银行烟台分行'
  },
  {
    head_no: 'BGJG102',
    settle_type: 'YWLX003',
    name: '转入',
    bord_type: '境内',
    bank_name: '工商银行济南分行'
  },
  {
    head_no: 'BGJG102',
    settle_type: 'YWLX004',
    name: '转出',
    bord_type: '境内',
    bank_name: '工商银行烟台分行'
  },
  {
      head_no: 'BGJG102',
      settle_type: 'YWLX001',
      name: '取现',
      bord_type: '境内',
      bank_name: '工商银行济南分行'
    },
    {
      head_no: 'BGJG102',
      settle_type: 'YWLX002',
      name: '存款',
      bord_type: '境内',
      bank_name: '工商银行烟台分行'
    },
    {
      head_no: 'BGJG102',
      settle_type: 'YWLX003',
      name: '转入',
      bord_type: '境内',
      bank_name: '工商银行济南分行'
    },
    {
      head_no: 'BGJG102',
      settle_type: 'YWLX004',
      name: '转出',
      bord_type: '境内',
      bank_name: '工商银行烟台分行'
    },
    {
        head_no: 'BGJG102',
        settle_type: 'YWLX001',
        name: '取现',
        bord_type: '境内',
        bank_name: '工商银行济南分行'
      },
      {
        head_no: 'BGJG102',
        settle_type: 'YWLX002',
        name: '存款',
        bord_type: '境内',
        bank_name: '工商银行烟台分行'
      },
      {
        head_no: 'BGJG102',
        settle_type: 'YWLX003',
        name: '转入',
        bord_type: '境内',
        bank_name: '工商银行济南分行'
      },
      {
        head_no: 'BGJG102',
        settle_type: 'YWLX004',
        name: '转出',
        bord_type: '境内',
        bank_name: '工商银行烟台分行'
      },
      {
          head_no: 'BGJG102',
          settle_type: 'YWLX001',
          name: '取现',
          bord_type: '境内',
          bank_name: '工商银行济南分行'
        },
        {
          head_no: 'BGJG102',
          settle_type: 'YWLX002',
          name: '存款',
          bord_type: '境内',
          bank_name: '工商银行烟台分行'
        },
        {
          head_no: 'BGJG102',
          settle_type: 'YWLX003',
          name: '转入',
          bord_type: '境内',
          bank_name: '工商银行济南分行'
        },
        {
          head_no: 'BGJG102',
          settle_type: 'YWLX004',
          name: '转出',
          bord_type: '境内',
          bank_name: '工商银行烟台分行'
        },
        {
            head_no: 'BGJG102',
            settle_type: 'YWLX001',
            name: '取现',
            bord_type: '境内',
            bank_name: '工商银行济南分行'
          },
          {
            head_no: 'BGJG102',
            settle_type: 'YWLX002',
            name: '存款',
            bord_type: '境内',
            bank_name: '工商银行烟台分行'
          },
          {
            head_no: 'BGJG102',
            settle_type: 'YWLX003',
            name: '转入',
            bord_type: '境内',
            bank_name: '工商银行济南分行'
          },
          {
            head_no: 'BGJG102',
            settle_type: 'YWLX004',
            name: '转出',
            bord_type: '境内',
            bank_name: '工商银行烟台分行'
          },
          {
              head_no: 'BGJG102',
              settle_type: 'YWLX001',
              name: '取现',
              bord_type: '境内',
              bank_name: '工商银行济南分行'
            },
            {
              head_no: 'BGJG102',
              settle_type: 'YWLX002',
              name: '存款',
              bord_type: '境内',
              bank_name: '工商银行烟台分行'
            },
            {
              head_no: 'BGJG102',
              settle_type: 'YWLX003',
              name: '转入',
              bord_type: '境内',
              bank_name: '工商银行济南分行'
            },
            {
              head_no: 'BGJG102',
              settle_type: 'YWLX004',
              name: '转出',
              bord_type: '境内',
              bank_name: '工商银行烟台分行'
            },
            {
                head_no: 'BGJG102',
                settle_type: 'YWLX001',
                name: '取现',
                bord_type: '境内',
                bank_name: '工商银行济南分行'
              },
              {
                head_no: 'BGJG102',
                settle_type: 'YWLX002',
                name: '存款',
                bord_type: '境内',
                bank_name: '工商银行烟台分行'
              },
              {
                head_no: 'BGJG102',
                settle_type: 'YWLX003',
                name: '转入',
                bord_type: '境内',
                bank_name: '工商银行济南分行'
              },
              {
                head_no: 'BGJG102',
                settle_type: 'YWLX004',
                name: '转出',
                bord_type: '境内',
                bank_name: '工商银行烟台分行'
              }
]
const treeData = [{
    id: 1,
    name: '工商银行'
  },
  {
    id: 2,
    name: '建设银行'
  },
  {
    id: 3,
    name: '交通银行'
  }
]

export default [
  // mock get all roles form server
  {
    url: '/settleTypeManage/getTree',
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
    url: '/settleTypeManage/getTableList',
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
    url: '/settleTypeManage/bankManage',
    type: 'post',
    response: {
      code: 20000,
      data: {
        settle_type: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // update role
  {
    url: '/settleTypeManage/bankManage/[A-Za-z0-9]',
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
    url: '/settleTypeManage/bankManage/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }
]
