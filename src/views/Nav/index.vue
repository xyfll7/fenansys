<template>
  <div class="line">
    <el-row>
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
  name: 'Nav',
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
  border-bottom: 1px solid #e4e7ed;
  background: white;
  padding: 0 10px 0 10px;
  margin: 0 5px 0 5px;
  border-radius: 4px;
}
</style>
