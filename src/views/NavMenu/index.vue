<template>
  <div class="line">
    <el-row :gutter="20">
      <el-col :span="6">
        <Left class="centery height" />
      </el-col>
      <el-col :span="12">
        <Center class="centerxy height" />
      </el-col>
      <el-col :span="6">
        <Right class="centery end height" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Left from './Left'
import Center from './Center'
import Right from './Right'

export default {
  name: 'NavMenu',
  components: {
    Left,
    Center,
    Right
  }
}
</script>

<style scoped>
@import '../views.css';
@import './index.css';
.line {
  border-bottom: 1px solid rgb(233, 233, 233);
}
</style>
