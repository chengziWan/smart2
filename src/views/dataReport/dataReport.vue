<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.name" placeholder="菜单名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button> -->
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="handleReport">
        上报
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

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { getDataUploadList } from '@/api/dataUpload'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
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
      sortOptions: [{ label: 'ID 升序', key: '+id' }, { label: 'ID 降序', key: '-id' }],
      statusOptions: ['published', 'deleted'],
      showReviewer: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
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
    handleReport({ $index, row }) {
      //记得检查数据状态是否为已上传
      let count = 0
      this.list.forEach(r => {
        if(r.status === '已上传')
          count++
      })
      if(count == this.list.length){
        this.$confirm('确认上报所有数据吗?', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            this.list.forEach(r => {
              r.status = '已上报'
            })
            await getDataUploadList()
            this.$message({
              type: 'success',
              message: '上报成功!'
            })
          })
          .catch(err => { console.error(err) })
      }else{
          this.$confirm('当前数据状态不能上报', '警告', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          })
      }

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
