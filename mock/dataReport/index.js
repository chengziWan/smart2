import Mock from 'mockjs'
import { deepClone } from '../../src/utils/index.js'

const roles = [
  {
    head_no:'BGJG102',
    bank_code1:'JGWD102001',
    bank_code2:'JRJG102001',
    bord_type:'境内',
    bank_name: '工商银行济南分行',
    dataType: '存量个人客户信息表',
    auditNum: '1',
    auditResult: '通过',//XXXX表中XXX记录中电话号码不规范；XXXX表中XXX记录中有XX问题；
    usrName: 'admin',
    timestamp: '2019-09-19 12:21:23',
    status:'已上传',
    saveTable: 'tb_cst_pers_20190919_BGJG102',
    saveResult: '由原表XXXX归档至表tb_cst_pers_20190919_BGJG102',
  },
  {
    head_no:'BGJG102',
    bank_code1:'JGWD102002',
    bank_code2:'JRJG102002',
    bord_type:'境内',
    bank_name: '工商银行济南分行',
    dataType: '存量单位客户信息表',
    auditNum: '2',
    auditResult: '不通过',
    usrName: 'admin',
    timestamp: '2019-09-19 12:21:23',
    status:'已上传',
    saveTable: 'tb_cst_pers_20190919_BGJG102',
    saveResult: '由原表XXXX归档至表tb_cst_unit_20190919_BGJG102',
  },
]

const banks = [
  {
    bank_name: '工商银行',
    bankId:'0001',
    children: [
      {
        bank_name: '工商银行山东分行',
        bankId:'0001001',
        children: [
          {
            bank_name: '工商银行济南分行',
            bankId:'000100101',
          },
          {
            bank_name: '工商银行青岛分行',
            bankId:'000100102'
          }
        ]
      },
      {
        bank_name: '工商银行山西分行',
        bankId:'0001002'
      }
    ]
  },
  {
    bank_name: '工商银行济南分行',
    bankId:'0002'
  },
]

export default [
  // mock get all routes form server


  // mock get all roles form server
  {
    url: '/dataUploadList',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: roles
      }
    }
  },
  // mock get all banks form server
  {
    url: '/getBanks',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: banks
      }
    }
  }

]
