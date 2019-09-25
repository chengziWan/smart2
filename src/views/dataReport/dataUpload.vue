<template>
  <div class="app-container">
    <aside><strong>提示：</strong> 分类上传请先选择数据类型
        </aside>
    <aside><strong>分类上传</strong>
        <DataTypeOption v-model="dataType" style="margin-left: 80px;"/>
        <upload-excel-component id="upload1" :on-success="handleSuccess" :before-upload="beforeUpload" style="display: inline-block;" />
    </aside>
    <aside><strong>打包上传</strong>
        <upload-excel-component id="upload2" :on-success="handleSuccess" :before-upload="beforeUpload" style="display: inline-block;margin-left: 380px;" />
    </aside>

    <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label="上传编号" >
        <template slot-scope="{row}">
          {{ row.id }}
        </template>
      </el-table-column>
      <el-table-column label="银行名称" align="center">
        <template slot-scope="{row}">
          {{ row.bank_name }}
        </template>
      </el-table-column>
      <el-table-column label="数据类型" align="center">
        <template slot-scope="{row}">
          {{ row.dataType }}
        </template>
      </el-table-column>
      <el-table-column label="上传人" align="center">
        <template slot-scope="{row}">
          {{ row.usrName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="上传时间" >
        <template slot-scope="{row}">
          <i class="el-icon-time" />
          <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{row}">
          {{ row.status }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import DataTypeOption from './components/DataTypeOption'
import { getDataUploadList } from '@/api/dataUpload'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
export default {
  name: 'AvatarUploadDemo',
  components: { DataTypeOption, UploadExcelComponent },
  data() {
    return {
      dataType: '请选择',
      list: [],
      listLoading: true,
      autoWidth: true,
      tableData: [],
      tableHeader: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const res = await getDataUploadList()
      this.list = res.data.items
      this.listLoading = false
    },
    beforeUpload(file) {
      console.log(file.name)
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
      console.log(this.tableData)
      console.log(this.tableHeader)
    }

  }
}
</script>

<style scoped>

</style>
