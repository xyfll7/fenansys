<template>
  <div class="line">
    <el-row>
      <el-col :span="7">
        <Left class="centery height" />
      </el-col>
      <el-col :span="10">
        <Center class="centerxy height" />
      </el-col>
      <el-col :span="7">
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
.line {
  border-bottom: 1px solid #e4e7ed;
  background: #ffffffdb;
  padding: 0 10px 0 10px;
  border-radius: 4px;
}
.height {
  height: 60px;
}
</style>
