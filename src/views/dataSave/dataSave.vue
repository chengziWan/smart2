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
       <div>
         <div class="filter-container">
           <!-- <el-input v-model="listQuery.name" placeholder="菜单名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" /> -->
          <!-- <el-select v-model="listQuery.dataType" style="width: 240px" class="filter-item" @change="handleFilter">
             <el-option v-for="item in dataTypeOptions" :key="item.key" :label="item.label" :value="item.key" />
           </el-select> -->
           <!-- <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
             <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
           </el-select> -->
           <el-button v-waves class="filter-item" type="primary" @click="handleSave">
             归档
           </el-button>
         </div>
          <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit highlight-current-row>
            <el-table-column align="center" label="序号" width="70px">
                          <template slot-scope="scope">
                            {{ scope.$index+1 }}
                          </template>
                        </el-table-column>
                        <el-table-column label="银行名称" align="center">
                          <template slot-scope="scope">
                            {{ scope.row.bank_name }}
                          </template>
                        </el-table-column>
                        <el-table-column label="归档次数" align="center" width="80px">
                          <template slot-scope="scope">
                            {{ scope.row.saveNum }}
                          </template>
                        </el-table-column>
                        <el-table-column align="center" label="归档时间" >
                          <template slot-scope="scope">
                            <i class="el-icon-time" />
                            <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="数据类型" align="center">
                          <template slot-scope="scope">
                            {{ scope.row.dataType }}
                          </template>
                        </el-table-column>
                        <el-table-column label="归档表" align="center">
                          <template slot-scope="scope">
                            {{ scope.row.saveTable }}
                          </template>
                        </el-table-column>
                        <el-table-column label="归档日志" align="center">
                          <template slot-scope="scope">
                            {{ scope.row.saveResult }}
                          </template>
                        </el-table-column>
                        <el-table-column label="归档人" align="center" width="80">
                          <template slot-scope="scope">
                            {{ scope.row.usrName }}
                          </template>
                        </el-table-column>
                        <!-- <el-table-column label="状态" align="center">
                          <template slot-scope="scope">
                            {{ scope.row.status }}
                          </template>
                        </el-table-column> -->
          </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
         </div>
      </template>
    </split-pane>

  </div>
</template>

<script>


import splitPane from 'vue-splitpane'
import { getDataUploadList, createItem } from '@/api/dataUpload'
import { getTree } from '@/api/bankManage'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const defaultItem = {
  dataType: '',
  parent_id: ''
}
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
      role: {},
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
      dataTypeOptions: [{ label: '个人客户存量信息表', key: 'aa1' }, { label: '单位客户存量信息表', key: 'aa2' }]

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
      defaultItem.parent_id = node.id
      this.list = []
      this.getList(node.id)
    },
    getList() {
      this.listLoading = true
      getDataUploadList(this.listQuery).then(response => {
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
    handleSave() {
      if (defaultItem.parent_id === '') {
        this.$message.error('请先选择银行网点再归档')
        return false
      }
      this.$confirm('确认归档此银行的记录吗?', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const temp = { bank_name: '工商银行济南分行',
                        dataType: '存量单位客户信息表',saveNum: this.list.length+1,
                        saveTable: 'tb_cst_pers_20190919_BGJG102',
                        saveResult: '由原表XXXX归档至表tb_cst_unit_20190919_BGJG102', usrName: 'admin',
                        timestamp: new Date()}
          createItem(temp).then(() => {
            this.list.unshift(temp)
            this.$message({
              type: 'success',
              message: '归档完毕!'
            })
          })
          //await deleteRole(row.key)
          //this.rolesList.splice($index, 1)
          //this.getList(defaultItem.parent_id)

        })
        .catch(err => { console.error(err) })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
