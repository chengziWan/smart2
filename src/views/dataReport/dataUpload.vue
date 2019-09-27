<template>
  <div class="app-container" v-loading="loading1"  element-loading-text="加密上传中">
    <aside><strong>提示：</strong> 分类上传请先选择数据类型
        </aside>
    <aside><strong>分类上传</strong>
        <!-- <DataTypeOption v-model="dataType" style="margin-left: 80px;"/> -->
        <el-select v-model="dataType" style="width: 240px;margin-left: 80px;" class="filter-item">
          <el-option v-for="item in dataTypeOptions" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
        <upload-excel-component id="upload1" :on-success="handleSuccess" :before-upload="beforeUpload1" style="display: inline-block;"/>
    </aside>
    <aside><strong>打包上传</strong>
        <upload-excel-component id="upload2" :on-success="handleSuccess" :before-upload="beforeUpload2" style="display: inline-block;margin-left: 330px;" />
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
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchList" />

  </div>
</template>

<script>

import { getDataUploadList } from '@/api/dataUpload'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'AvatarUploadDemo',
  components: { UploadExcelComponent, Pagination },
  data() {
    return {
      dataType: '',
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        name: undefined
        //sort: '+id'
      },

      autoWidth: true,
      tableData: [],
      tableHeader: [],

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
       loading1: false
    }
  },
  created() {
    this.fetchList()
  },

  methods: {
    async fetchList() {
      this.listLoading = true
      getDataUploadList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    beforeUpload1(file) {
      console.log(file.name)

      if (this.dataType == '') {
        this.$message.error('分类上传请先选择数据类型')
        return false
      }
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!this.isExcel(file)) {
        this.$message.error('只能上传后缀为 .xlsx, .xls, .csv 的文件')
        return false
      }
      if (isLt1M) {
        this.loading1 = true
        return true
      }

      this.$message({
        message: '文件大小不能超过 1m ',
        type: 'warning'
      })
      return false
    },
    beforeUpload2(file) {
      console.log(file.name)
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!this.isExcel(file)) {
        this.$message.error('只能上传后缀为 .xlsx, .xls, .csv 的文件')
        return false
      }
      if (isLt1M) {
        this.loading1 = true
        return true
      }

      this.$message({
        message: '文件大小不能超过 1m ',
        type: 'warning'
      })
      return false
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    },
    handleSuccess({ results, header }) {
      setTimeout(() => {
        this.loading1 = false
      }, 1.5 * 1000)

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
