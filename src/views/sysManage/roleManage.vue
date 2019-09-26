<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="角色名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="角色编号" prop="id" sortable="custom" align="center" :class-name="getSortClass('id')" >
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色名称" align="center">
         <template slot-scope="{row}">
           <span>{{ row.name }}</span>
         </template>
      </el-table-column>
      <el-table-column label="禁用否" class-name="status-col" width="100px">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建人" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.create_usr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
            启用
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(row,'deleted')">
            禁用
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="角色编号" prop="id">
          <el-input v-model="temp.id" />
        </el-form-item>
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="配置权限" prop="permission">
           <el-tree
             ref="tree"
             :check-strictly="checkStrictly"
             :data="routesData"
             :props="defaultProps"
             show-checkbox
             node-key="path"
             class="permission-tree"
           />
        </el-form-item>
        <el-form-item label="禁用否">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
             <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="创建人" prop="create_usr">
           <el-input v-model="temp.create_usr" :readonly="true"/>
        </el-form-item>
        <el-form-item label="创建时间" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" :readonly="true"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from 'path'
import { fetchList, createItem, updateItem, getPermission } from '@/api/roleManage'
import waves from '@/directive/waves' // waves directive
import { parseTime, deepClone } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination


export default {
  name: 'ComplexTable',
  components: { Pagination },
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
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        sort: '+id'
      },
      sortOptions: [{ label: '角色编号 升序', key: '+id' }, { label: '角色编号 降序', key: '-id' }],
      statusOptions: ['published', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        name: '',
        routes: [],
        status: 'published',
        create_usr: 'admin',
        timestamp: new Date()
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        id: [{ required: true, message: '角色编号必填', trigger: 'blur' }],
        name: [{ required: true, message: '角色名称必填', trigger: 'blur' }],
        status: [{ required: true, message: '禁用否必填', trigger: 'change' }]
      },
      downloadLoading: false,

      routes: [],
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }

    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    this.getList()
    this.getRoutes()
  },
  methods: {
   async getRoutes() {
     const res = await getPermission()
     this.serviceRoutes = res.data
     this.routes = this.generateRoutes(res.data)
   },
   // Reshape the routes structure so that it looks the same as the sidebar
   generateRoutes(routes, basePath = '/') {
     const res = []

     for (let route of routes) {
       // skip some route
       if (route.hidden) { continue }

       const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

       if (route.children && onlyOneShowingChild && !route.alwaysShow) {
         route = onlyOneShowingChild
       }

       const data = {
         path: path.resolve(basePath, route.path),
         title: route.meta && route.meta.title

       }

       // recursive child routes
       if (route.children) {
         data.children = this.generateRoutes(route.children, data.path)
       }
       res.push(data)
     }
     return res
   },
   // reference: src/view/layout/components/Sidebar/SidebarItem.vue
   onlyOneShowingChild(children = [], parent) {
     let onlyOneChild = null
     const showingChildren = children.filter(item => !item.hidden)

     // When there is only one child route, the child route is displayed by default
     if (showingChildren.length === 1) {
       onlyOneChild = showingChildren[0]
       onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
       return onlyOneChild
     }

     // Show parent if there are no child route to display
     if (showingChildren.length === 0) {
       onlyOneChild = { ... parent, path: '', noShowingChildren: true }
       return onlyOneChild
     }

     return false
   },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
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
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
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
    resetTemp() {
      this.temp = {
        id: undefined,
        name: '',
        permission: [],
        status: 'published',
        create_usr: 'admin',
        timestamp: new Date()
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.checkStrictly = true
      this.$nextTick(() => {
        const routes = this.generateRoutes(this.temp.routes)
        this.$refs.tree.setCheckedNodes(this.generateArr(routes))
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false
        this.$refs['dataForm'].clearValidate()
      })
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          const checkedKeys = this.$refs.tree.getCheckedKeys()
          this.temp.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)
          createItem(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '提示：',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          const checkedKeys = this.$refs.tree.getCheckedKeys()
          this.temp.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)
          updateItem(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '提示：',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }
      return res
    },
    handleDelete(row) {
      this.$notify({
        title: '提示：',
        message: '已禁用',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['id', 'name', 'status', 'create_usr', 'timestamp']
        const filterVal = ['id', 'name', 'status', 'create_usr', 'timestamp']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}`
        ? 'ascending'
        : sort === `-${key}`
          ? 'descending'
          : ''
    }
  }
}
</script>
