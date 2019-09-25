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
           <el-button v-waves class="filter-item" type="primary" @click="handleAudit">
             审计
           </el-button>
         </div>
          <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit highlight-current-row>
            <el-table-column align="center" label="序号" width="80">
              <template slot-scope="scope">
                {{ scope.$index+1 }}
              </template>
            </el-table-column>
            <el-table-column label="银行名称" align="center">
              <template slot-scope="{row}">
                {{ row.bank_name }}
              </template>
            </el-table-column>
            <el-table-column label="审计次数" align="center" width="90">
              <template slot-scope="{row}">
                {{ row.auditNum }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="审计时间" >
              <template slot-scope="{row}">
                <i class="el-icon-time" />
                <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
              </template>
            </el-table-column>
            <el-table-column label="审计结果" align="center">
              <template slot-scope="{row}">
                {{ row.auditResult }}
              </template>
            </el-table-column>
            <el-table-column label="审计人" align="center">
              <template slot-scope="{row}">
                {{ row.usrName }}
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="{row}">
                <el-button type="primary" size="small" @click="viewDetail(row)">查看详细</el-button>
              </template>
            </el-table-column>
          </el-table>
        <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->
         </div>
      </template>
    </split-pane>
    <el-dialog :visible.sync="dialogVisible" title="详细信息">
          <el-form :model="role" label-width="80px" label-position="left">
            <el-form-item label="银行名称">
              <el-input v-model="role.bank_name" placeholder="Role Name" :readonly="true"/>
            </el-form-item>
            <el-form-item label="审计次数">
              <el-input v-model="role.auditNum" placeholder="Role Name" :readonly="true"/>
            </el-form-item>
            <el-form-item label="审计时间">
              <el-input v-model="role.timestamp" placeholder="Role Name" :readonly="true"/>
            </el-form-item>
            <el-form-item label="审计人">
              <el-input v-model="role.usrName" placeholder="Role Name" :readonly="true"/>
            </el-form-item>
            <el-form-item label="审计结果">
              <el-input v-model="role.auditResult" placeholder="Role Name" :readonly="true"/>
            </el-form-item>
            <el-form-item label="审计明细">
              <el-input
                v-model="role.auditDetail"
                :autosize="{ minRows: 2, maxRows: 4}"
                type="textarea"
                placeholder="Role Description"
                :readonly="true"
              />
            </el-form-item>

          </el-form>
          <div style="text-align:right;">
            <el-button type="danger" @click="dialogVisible=false">关闭</el-button>
          </div>
        </el-dialog>
  </div>
</template>

<script>


import splitPane from 'vue-splitpane'
import { getDataUploadList } from '@/api/dataUpload'
import { getTree } from '@/api/bankManage'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const defaultItem = {
  dataType: '',
  parent_id: null
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
      dialogVisible: false,
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
      //this.getList(node.id)
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
      this.listLoading = true
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
    handleAudit() {
      this.$confirm('确认审计此银行的记录吗?', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          //await deleteRole(row.key)
          //this.rolesList.splice($index, 1)
          this.getList(defaultItem.parent_id)
          this.$message({
            type: 'success',
            message: '审计完毕!'
          })
        })
        .catch(err => { console.error(err) })
    },
    viewDetail(row) {
      this.role = Object.assign({}, row) // copy obj
      console.log(this.role)
      this.dialogType = 'view'
      this.dialogVisible = true
      this.checkStrictly = true
      this.$nextTick(() => {
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
