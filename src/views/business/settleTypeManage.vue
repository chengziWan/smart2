<template>
  <div>
    <split-pane :min-percent="10" :default-percent="20" split="vertical" @resize="resize">
      <template slot="paneL">
        <div style="margin-left: 10px;margin-top: 10px;">
          <el-input
            v-model="filterText"
            placeholder="输入关键字进行过滤"
          />

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
          <el-button type="primary" style="margin-top: 10px;" @click="handleAdd">新增</el-button>
          <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加载中" style="width: 100%;margin-top:30px;" border>
            <el-table-column align="center" label="序号" width="80">
              <template slot-scope="scope">
                {{ scope.$index+1 }}
              </template>
            </el-table-column>
            <el-table-column label="报告机构编码" align="center">
              <template slot-scope="scope">
                {{ scope.row.head_no }}
              </template>
            </el-table-column>
            <el-table-column label="业务类型1" align="center">
              <template slot-scope="scope">
                {{ scope.row.settle_type }}
              </template>
            </el-table-column>
            <el-table-column label="业务类型名称" align="center">
              <template slot-scope="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
                <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </split-pane>
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑信息':'新增信息'">
      <el-form :model="item" label-width="80px" label-position="left">
        <el-form-item label="报告机构编码">
          <el-input v-model="item.head_no" placeholder="head_no" />
        </el-form-item>
        <el-form-item label="业务类型">
          <el-input v-model="item.settle_type" placeholder="settle_type" />
        </el-form-item>
        <el-form-item label="业务类型名称">
          <el-input v-model="item.name" placeholder="name" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import splitPane from 'vue-splitpane'
import { deepClone } from '@/utils'
import { getTree, getTableList, addItem, updateItem, deleteItem } from '@/api/settleTypeManage'
const defaultItem = {
  head_no: '112',
  settle_type: '22',
  name: '33',
  parent_id: null
}

export default {
  name: 'SettleTypeManage',
  components: { splitPane },
  data() {
    return {
      filterText: '',
      list: [],
      listLoading: false,
      autoWidth: true,
      item: Object.assign({}, defaultItem),
      dialogVisible: false,
      dialogType: 'new',
      // TODO 银行树的数据
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.fetchList('')
    this.fetchTree()
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleNodeClick(node) {
      // 刷新右边查询table
      defaultItem.parent_id = node.id
      this.fetchList(node.id)
    },
    resize() {
      console.log('resize')
    },
    // 获取右侧查询列表
    async fetchList(parentId) {
      this.listLoading = true
      const res = await getTableList(parentId)
      this.list = res.data
      this.listLoading = false
    },
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
    // 点击新增事件
    handleAdd() {
      const parentId = defaultItem.parent_id // this.$refs.treeData.getCurrentKey()//获取父节点id
      this.dialogType = 'new'
      this.dialogVisible = true
      this.item = Object.assign({}, defaultItem)
      if (parentId == null) {
        // 提示请选择银行机构
        this.$confirm('请选择银行机构！', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
        this.dialogVisible = false
      }
    },
    // 点击编辑事件
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.item = deepClone(scope.row)
    },
    // 点击新增or编辑中的确认事件
    async confirm() {
      const isEdit = this.dialogType === 'edit'

      if (isEdit) {
        await updateItem(this.item.settle_type, this.item)
        for (let index = 0; index < this.list.length; index++) {
          if (this.list[index].settle_type === this.item.settle_type) {
            this.list.splice(index, 1, Object.assign({}, this.item))
            break
          }
        }
      } else {
        const { data } = await addItem(this.item)
        this.item.settle_type = data.settle_type
        this.list.push(this.item)
      }

      // const { head_no, settle_type, name, ank_name, bord_type} = this.item
      this.dialogVisible = false
      this.$notify({
        title: '提示',
        dangerouslyUseHTMLString: true,
        message: `
            <div>保存成功</div>
          `,
        type: 'success'
      })
      // 刷新tree 并设置 当前选定节点
      // const parentId = this.$refs.treeData.getCurrentKey()// 获取父节点id
      const parentId = defaultItem.parent_id // this.$refs.treeData.currentNode.node
      //this.fetchTree()
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey([parentId])

        // this.fetchList()
      })
    },
    // 点击删除事件
    handleDelete({ $index, row }) {
      this.$confirm('确认删除此信息吗?', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteItem(row.settle_type)
          this.list.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => { console.error(err) })
    }
  }

}
</script>
<style lang="scss" scoped>

</style>
