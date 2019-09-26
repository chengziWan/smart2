import Mock from 'mockjs'

const List = []
const List2 = []
const count = 3

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

const tb_cst_pers =[
  {
    head_no:'BGJG102',
    bank_code1:'JGWD102',
    cst_no:'KHY1000000',
    open_time:'20190903',
    close_time:'20191003',
    acc_name:'阳震宏',
    cst_sex:'12',
    nation:'CHN',
    id_type:'11',
    id_no:'420101198101018000',
    id_deadline:'20220302',
    occupation:'医生',
    income:'200002',
    contact1:'13106453768',
    contact2:'@N',
    contact3:'@N',
    address1:'山东省济南市普集支路89号-19-1',
    address2:'@N',
    address3:'@N',
    company:'京东',
    sys_name:'工商融易联'

  },
  {
    head_no:'BGJG102',
    bank_code1:'JGWD102',
    cst_no:'KHY1000001',
    open_time:'20190903',
    close_time:'20191003',
    acc_name:'国士',
    cst_sex:'12',
    nation:'CHN',
    id_type:'11',
    id_no:'420101198101012000',
    id_deadline:'20220302',
    occupation:'医生',
    income:'200002',
    contact1:'13903317468',
    contact2:'@N',
    contact3:'@N',
    address1:'山东省济南市肥城街95号-18-9',
    address2:'@N',
    address3:'@N',
    company:'京东',
    sys_name:'工商融易联'

  },
  {
    head_no:'BGJG102',
    bank_code1:'JGWD102',
    cst_no:'KHY1000002',
    open_time:'20190903',
    close_time:'20191003',
    acc_name:'郁娜',
    cst_sex:'11',
    nation:'CHN',
    id_type:'11',
    id_no:'420101198101012000',
    id_deadline:'20220302',
    occupation:'医生',
    income:'200002',
    contact1:'13500197232',
    contact2:'@N',
    contact3:'@N',
    address1:'山东省济南市春城街93号-10-6',
    address2:'@N',
    address3:'@N',
    company:'京东',
    sys_name:'工商融易联'

  }
]
const tb_cst_unit =[
  {
    head_no:'BGJG102',
    bank_code1:'JGWD102',
    cst_no:'KHY8000000101',
    open_time:'20190903',
    acc_name:'印栋祥有限公司',
    address:'山东省济南市天台一广场53号-6-3',
    operate:'主营xxx业务',
    set_file:'11',
    license:'3500440012101',
    id_deadline:'20221021',
    org_no:'77301597-6',
    tax_no:'91210211773015976N',
    rep_name:'印栋祥',
    id_type2:'11',
    id_no2:'420101198101012000',
    id_deadline2:'20220304',
    man_name:'印栋祥',
    id_type3:'11',
    id_no3:'420101198101012000',
    id_deadline3:'20220304',
    ope_name:'李易联',
    id_type4:'11',
    id_no4:'380687198006024000',
    id_deadline4:'20291021',
    industry:'制造业',
    reg_amt:'100000',
    code:'RMB',
    sys_name:'系统名称'

  },
  {
    head_no:'BGJG102',
    bank_code1:'JGWD102',
    cst_no:'KHY8000001102',
    open_time:'20190903',
    acc_name:'吉琼琳有限公司',
    address:'山东省济南市春城街55号-11-2',
    operate:'主营xxx业务',
    set_file:'11',
    license:'3500440012102',
    id_deadline:'20221021',
    org_no:'77301597-6',
    tax_no:'91210211773015976N',
    rep_name:'吉琼琳',
    id_type2:'11',
    id_no2:'420101198101012000',
    id_deadline2:'20220304',
    man_name:'吉琼琳',
    id_type3:'11',
    id_no3:'420101198101012000',
    id_deadline3:'20220304',
    ope_name:'李易联',
    id_type4:'11',
    id_no4:'380687198006024000',
    id_deadline4:'20291021',
    industry:'制造业',
    reg_amt:'100000',
    code:'RMB',
    sys_name:'系统名称'

  },
  {
    head_no:'BGJG102',
    bank_code1:'JGWD102',
    cst_no:'KHY8000002103',
    open_time:'20190903',
    acc_name:'闻红静有限公司',
    address:'山东省济南市隆德广场111号-11-3',
    operate:'主营xxx业务',
    set_file:'11',
    license:'3500440012103',
    id_deadline:'20221021',
    org_no:'77301597-6',
    tax_no:'91210211773015976N',
    rep_name:'闻红静',
    id_type2:'11',
    id_no2:'420101198101017000',
    id_deadline2:'20220304',
    man_name:'闻红静',
    id_type3:'11',
    id_no3:'420101198101017000',
    id_deadline3:'20220304',
    ope_name:'李易联',
    id_type4:'11',
    id_no4:'380687198006024000',
    id_deadline4:'20291021',
    industry:'制造业',
    reg_amt:'100000',
    code:'RMB',
    sys_name:'系统名称'

  }
]

const tb_acc = [
  {head_no:'BGJG102',
  bank_code1:'JGWD102',
  self_acc_name:'郁娜',
  acc_state:'11',
  self_acc_no:'6223097733004270000',
  card_no:'6223097733004270000',
  acc_type:'11',
  acc_type1:'11',
  id_no:'420101198101012000',
  cst_no:'KHY1000002',
  fixed_flag:'10',
  ent_cst_type:'@N',
  frg_flag:'12',
  open_time:'20190912',
  close_time:'@N',
  acc_flag:'11',
  credit_flag:'11',
  w_type:'12',
  bank_tel:'13500197232',
  open_type:'12',
  open_type1:'13',
  agent_name:'@N',
  agent_tel:'@N',
  agent_type:'@N',
  agent_no:'@N'},
  {head_no:'BGJG102',
  bank_code1:'JGWD102',
  self_acc_name:'国士',
  acc_state:'11',
  self_acc_no:'6223098134036920000',
  card_no:'6223098134036920000',
  acc_type:'11',
  acc_type1:'11',
  id_no:'420101198101012000',
  cst_no:'KHY1000001',
  fixed_flag:'10',
  ent_cst_type:'@N',
  frg_flag:'12',
  open_time:'20190912',
  close_time:'@N',
  acc_flag:'11',
  credit_flag:'11',
  w_type:'12',
  bank_tel:'13903317468',
  open_type:'12',
  open_type1:'13',
  agent_name:'@N',
  agent_tel:'@N',
  agent_type:'@N',
  agent_no:'@N'
  },
  {head_no:'BGJG102',
bank_code1:'JGWD102',
self_acc_name:'司航',
acc_state:'11',
self_acc_no:'6223095328886210000',
card_no:'6223095328886210000',
acc_type:'11',
acc_type1:'11',
id_no:'420101198101017000',
cst_no:'KHY1000004',
fixed_flag:'10',
ent_cst_type:'@N',
frg_flag:'12',
open_time:'20190912',
close_time:'@N',
acc_flag:'11',
credit_flag:'11',
w_type:'12',
bank_tel:'13204724233',
open_type:'12',
open_type1:'13',
agent_name:'@N',
agent_tel:'@N',
agent_type:'@N',
agent_no:'@N'
}
]
const tb_acc_txn =[
  {date:'20190909',
  time:'141133',
  self_bank_code:'JGWD102',
  acc_type:'11',
  cst_no:'KHY1000002',
  id_no:'420101198101012000',
  self_acc_no:'6223097733004270000',
  card_no:'6223097733004270000',
  self_acc_name:'郁娜',
  acc_flag:'11',
  part_bank_code:'@N',
  part_bank_name:'@N',
  part_acc_no:'@N',
  part_acc_name:'@N',
  lend_flag:'11',
  tsf_flag:'10',
  cur:'CNY',
  org_amt:'10000',
  usd_amt:'1388.89',
  rmb_amt:'10000',
  balance:'10000',
  agency_flag:'12',
  agent_name:'@N',
  agent_tel:'@N',
  agent_type:'@N',
  agent_no:'@N',
  ticd:'YW2019090910000001',
  counter_no:'GYH0001',
  settle_type:'1002',
  reverse_flag:'10',
  purpose:'摘要',
  bord_flag:'12',
  nation:'@N',
  bank_flag:'14',
  ip_code:'127.0.0.1',
  atm_code:'ATM00001',
  bank_code:'JGWD102',
  mac_info:'@N'},
  {date:'20190909',
  time:'141133',
  self_bank_code:'JGWD102',
  acc_type:'11',
  cst_no:'KHY1000002',
  id_no:'420101198101012000',
  self_acc_no:'6223097733004270000',
  card_no:'6223097733004270000',
  self_acc_name:'郁娜',
  acc_flag:'11',
  part_bank_code:'@N',
  part_bank_name:'@N',
  part_acc_no:'@N',
  part_acc_name:'@N',
  lend_flag:'11',
  tsf_flag:'10',
  cur:'CNY',
  org_amt:'10000',
  usd_amt:'1388.89',
  rmb_amt:'10000',
  balance:'10000',
  agency_flag:'12',
  agent_name:'@N',
  agent_tel:'@N',
  agent_type:'@N',
  agent_no:'@N',
  ticd:'YW2019090910000001',
  counter_no:'GYH0001',
  settle_type:'1002',
  reverse_flag:'10',
  purpose:'摘要',
  bord_flag:'12',
  nation:'@N',
  bank_flag:'14',
  ip_code:'127.0.0.1',
  atm_code:'ATM00001',
  bank_code:'JGWD102',
  mac_info:'@N'},
  {date:'20190909',
  time:'141133',
  self_bank_code:'JGWD102',
  acc_type:'11',
  cst_no:'KHY1000002',
  id_no:'420101198101012000',
  self_acc_no:'6223097733004270000',
  card_no:'6223097733004270000',
  self_acc_name:'郁娜',
  acc_flag:'11',
  part_bank_code:'@N',
  part_bank_name:'@N',
  part_acc_no:'@N',
  part_acc_name:'@N',
  lend_flag:'11',
  tsf_flag:'10',
  cur:'CNY',
  org_amt:'10000',
  usd_amt:'1388.89',
  rmb_amt:'10000',
  balance:'10000',
  agency_flag:'12',
  agent_name:'@N',
  agent_tel:'@N',
  agent_type:'@N',
  agent_no:'@N',
  ticd:'YW2019090910000001',
  counter_no:'GYH0001',
  settle_type:'1002',
  reverse_flag:'10',
  purpose:'摘要',
  bord_flag:'12',
  nation:'@N',
  bank_flag:'14',
  ip_code:'127.0.0.1',
  atm_code:'ATM00001',
  bank_code:'JGWD102',
  mac_info:'@N'}
]

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
      if (dataType ==='tb_cst_pers'){
        mockList = tb_cst_pers;
        header = ['head_no','bank_code1','cst_no','open_time','close_time','acc_name','cst_sex','nation','id_type','id_no','id_deadline','occupation','income','contact1','contact2','contact3','address1','address2','address3','company','sys_name']
      }else if (dataType ==='tb_cst_unit'){
        mockList = tb_cst_unit;
        header = ['head_no','bank_code1','cst_no','open_time','acc_name','address','operate','set_file','license','id_deadline','org_no','tax_no','rep_name','id_type2','id_no2','id_deadline2','man_name','id_type3','id_no3','id_deadline3','ope_name','id_type4','id_no4','id_deadline4','industry','reg_amt','code','sys_name']
      }else if (dataType ==='tb_acc'){
        mockList = tb_acc;
        header = ['head_no','bank_code1','self_acc_name','acc_state','self_acc_no','card_no','acc_type','acc_type1','id_no','cst_no','fixed_flag','ent_cst_type','frg_flag','open_time','close_time','acc_flag','credit_flag','w_type','bank_tel','open_type','open_type1','agent_name','agent_tel','agent_type','agent_no']
      }else if (dataType ==='tb_acc_txn'){
        mockList = tb_acc_txn;
        header = ['date','time','self_bank_code','acc_type','cst_no','id_no','self_acc_no','card_no','self_acc_name','acc_flag','part_bank_code','part_bank_name','part_acc_no','part_acc_name','lend_flag','tsf_flag','cur','org_amt','usd_amt','rmb_amt','balance','agency_flag','agent_name','agent_tel','agent_type','agent_no','ticd','counter_no','settle_type','reverse_flag','purpose','bord_flag','nation','bank_flag','ip_code','atm_code','bank_code','mac_info']
      }else if (dataType ==='tb_cross_border'){
        mockList = [];
        header = ['id','timestamp','create_usr','name','url','status']
      }else if (dataType ==='tb_cred_txn'){
        mockList = [];
        header = ['id','timestamp','create_usr','name','url','status']
      }else{
        mockList = [];
        header = []
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
