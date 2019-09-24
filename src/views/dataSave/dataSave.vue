<template>
  <div>
    <split-pane v-on:resize="resize" :min-percent='10' :default-percent='20' split="vertical">
      <template slot="paneL">
        <div style="margin-left: 10px;margin-top: 10px;">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>

          <el-tree @node-click="handleNodeClick"
            class="filter-tree"
            :data="data"
            :props="defaultProps"
            :filter-node-method="filterNode"
            ref="tree"
            highlight-current
            check-on-click-node>
          </el-tree>
        </div>
      </template>
      <template slot="paneR">
        <div>
          <el-button type="primary" @click="handleSave" style="margin-top: 10px;">归档</el-button>
          <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加载中" style="width: 100%;margin-top:30px;" border>
            <el-table-column align="center" label="序号" width="80">
              <template slot-scope="scope">
                {{ scope.$index+1 }}
              </template>
            </el-table-column>
            <el-table-column label="银行名称" align="center">
              <template slot-scope="scope">
                {{ scope.row.bank_name }}
              </template>
            </el-table-column>
            <!-- <el-table-column label="归档次数" align="center">
              <template slot-scope="scope">
                {{ scope.row.saveNum }}
              </template>
            </el-table-column> -->
            <el-table-column align="center" label="归档时间" >
              <template slot-scope="scope">
                <i class="el-icon-time" />
                <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
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
        </div>
      </template>
    </split-pane>

  </div>
</template>

<script>


import splitPane from 'vue-splitpane'
import { getDataUploadList } from '@/api/dataUpload'

export default {
  name: 'SplitpaneDemo',
  components: { splitPane },
  data() {
    return {
      list: [],
      listLoading: true,
      autoWidth: true,
      filterText: '',
      //TODO 银行树的数据
      data: [{
        id: 1,
        label: '工商银行',
        children: [{
          id: 4,
          label: '工商银行山东分行',
          children: [{
            id: 9,
            label: '工商银行山东济南分行'
          }, {
            id: 10,
            label: '工商银行山东烟台分行'
          }]
        }]
      }, {
        id: 2,
        label: '建设银行',
        children: [{
          id: 5,
          label: '建设银行山东分行'
        },
        {
          id: 6,
          label: '建设银行山西分行'
        }]
      },
      {
        id: 3,
        label: '交通银行',
        children: [{
          id: 7,
          label: '交通银行山东分行'
        }, {
          id: 8,
          label: '交通银行山西分行'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleNodeClick(data) {
      console.log(data)
    },
    resize() {
      console.log('resize')
    },
    async fetchData() {
      this.listLoading = true
      const res = await getDataUploadList()
      this.list = res.data
      this.listLoading = false
    },

  }
}
</script>
<style lang="scss" scoped>

</style>
