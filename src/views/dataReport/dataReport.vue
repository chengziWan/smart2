<template>
  <div class="app-container">
    <el-button type="primary" @click="handleReport">上报</el-button>
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
      <el-table-column label="数据类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.dataType }}
        </template>
      </el-table-column>
      <el-table-column label="上传人" align="center">
        <template slot-scope="scope">
          {{ scope.row.usrName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="上传时间" >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>

import { getDataUploadList } from '@/api/dataUpload'

export default {
  data() {
    return {
      list: [],
      listLoading: true,
      autoWidth: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const res = await getDataUploadList()
      this.list = res.data
      this.listLoading = false
    },
    handleReport({ $index, row }) {
      this.$confirm('确认上报所有数据吗?', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await getDataUploadList()
          this.list.splice($index, 1)
          this.$message({
            type: 'success',
            message: '上报成功!'
          })
        })
        .catch(err => { console.error(err) })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
