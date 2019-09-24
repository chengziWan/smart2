<template>
  <div class="app-container">
    <aside><strong>提示：</strong> 分类上传请先选择数据类型
        </aside>
    <aside><strong>分类上传</strong>
        <DataTypeOption v-model="dataType" style="margin-left: 80px;"/>
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">
          上传
        </el-button>
    </aside>
    <aside><strong>打包上传</strong>
        <el-button type="primary" icon="el-icon-upload" style="margin-left: 377px;" @click="imagecropperShow=true">
          上传
        </el-button>
    </aside>
    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="300"
      url="https://httpbin.org/post"
      lang-type="en"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
    <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit highlight-current-row>
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

import ImageCropper from '@/components/ImageCropper'
import DataTypeOption from './components/DataTypeOption'
import { getDataUploadList } from '@/api/dataUpload'
export default {
  name: 'AvatarUploadDemo',
  components: { ImageCropper, DataTypeOption },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      dataType: '请选择',
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

    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>

<style scoped>
  .avatar{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>
