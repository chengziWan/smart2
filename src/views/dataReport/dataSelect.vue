<template>
  <div class="app-container">
    <split-pane :min-percent='10' :default-percent='20' split="vertical">
      <template slot="paneL">
        <div style="margin-left: 10px;">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>
          <el-tree
            class="filter-tree"
            ref="tree"
            :data="treeData"
            :props="defaultProps"
            :filter-node-method="filterNode"
            node-key="id"
            :highlight-current="true"
            :check-on-click-node="true"
            @node-click="handleNodeClick"
          />
        </div>
      </template>
      <template slot="paneR">
       <div v-loading="listLoading" element-loading-text="解密查询中">
         <div class="filter-container">
           <!-- <el-input v-model="listQuery.name" placeholder="菜单名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" /> -->
           <el-select v-model="listQuery.dataType" style="width: 300px" class="filter-item" @change="handleTypeClick">
             <el-option v-for="item in dataTypeOptions" :key="item.key" :label="item.label" :value="item.key" />
           </el-select>
           <!-- <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
             <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
           </el-select> -->
           <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
             查询
           </el-button>
         </div>
         <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
           <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" width="180px" :show-overflow-tooltip="true" />
           <!-- :width="flexColumnWidth(item)"-->
         </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>
         </div>
      </template>
    </split-pane>
  </div>
</template>

<script>


import splitPane from 'vue-splitpane'
import { fetchList } from '@/api/dataSelect'
import { getTree } from '@/api/bankManage'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination, splitPane },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      filterText: '',
      // TODO 银行树的数据
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      tableData: [],
      tableHeader: [],


      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        dataType: undefined,
        sort: '+id'
      },
      sortOptions: [{ label: 'ID 升序', key: '+id' }, { label: 'ID 降序', key: '-id' }],
      dataTypeOptions: [{ key: 'tb_cst_pers', label: '存量个人客户身份信息表'},
                        { key: 'tb_cst_unit', label: '存量单位客户身份信息表'},
                        { key: 'tb_acc', label: '符合特定条件的银行账户信息表'},
                        { key: 'tb_acc_txn', label: '基于客户账户的交易数据表'},
                        { key: 'tb_cross_border', label: '跨境汇款交易数据表'},
                        { key: 'tb_cred_txn', label: '信用卡账户金融交易数据表'},
                        { key: 'tb_cash_remit', label: '现金汇款交易流水'},
                        { key: 'tb_cash_convert', label: '现钞兑换交易明细表'},
                        { key: 'tb_risk_new', label: '存量客户最新风险等级表'},
                        { key: 'tb_risk_his', label: '存量客户检查期限内历次风险等级划分表'},
                        { key: 'tb_lwhc_log', label: '公民联网核查日志记录表'},
                        { key: 'tb_lar_report', label: '大额交易报告明细'},
                        { key: 'tb_sus_report', label: '可疑交易报告明细'}],
        defaultItem: {
          dataType: '',
          parent_id: ''
        }

    }
  },
  created() {
    //this.getList()
    this.fetchTree()
  },
  methods: {
    // 获取左侧树
    async fetchTree() {
      const res = await getTree()
      this.treeData = this.generateTree(res.data)
    },
    // Reshape the routes structure so that it looks the same as the sidebar
    generateTree(datas) {
      const res = []
      for (let route of datas) {
        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)
        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }
        const data = {
          id: route.id,
          name: route.name
        }
        // recursive child routes
        if (route.children) {
          data.children = this.generateTree(route.children)
        }
        res.push(data)
      }
      return res
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)
      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ... parent, noShowingChildren: true }
        return onlyOneChild
      }
      return false
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleNodeClick(node) {
      // 刷新右边查询table
      this.defaultItem.parent_id = node.id
      //this.getList()
    },
    handleTypeClick() {
      // 刷新右边查询table
      this.defaultItem.dataType = this.dataType
      //this.getList()
    },
    getList() {
      if ( this.defaultItem.parent_id === '') {
        this.$message.error('请先选择银行网点再查询')
        return false
      }
      if (this.defaultItem.dataType === '') {
        this.$message.error('请先选择数据类型再查询')
        return false
      }
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.tableData = response.data.items
        this.tableHeader = response.data.header
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },

    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },

    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}`
        ? 'ascending'
        : sort === `-${key}`
          ? 'descending'
          : ''
    },
    // 自定义表头列宽
    flexColumnWidth(str) {
      let flexWidth = 0
      for (const char of str) {
        if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
          // 如果是英文字符，为字符分配8个单位宽度
          flexWidth += 18
        } else if (char >= '\u4e00' && char <= '\u9fa5') {
          // 如果是中文字符，为字符分配20个单位宽度
          flexWidth += 50
        } else {
          // 其他种类字符，为字符分配5个单位宽度
          flexWidth += 15
        }
      }
      if (flexWidth < 50) {
        // 设置最小宽度
        flexWidth = 100
      }
      // if (flexWidth > 250) {
      //   // 设置最大宽度
      //   flexWidth = 250
      // }
      return flexWidth + 'px'
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
