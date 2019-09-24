<template>
  <div style="display:inline-block;">
    <label class="radio-label">数据类型: </label>
    <el-select v-model="dataType" style="width:220px;">
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: 'xlsx'
    }
  },
  data() {
    return {
      options: ['存量个人客户信息表', '存量单位客户信息表', '等']
    }
  },
  computed: {
    dataType: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
