<template>
  <el-row :gutter="15" type="flex" justify="center">
    <el-col :span="7" v-for="i in 7" :key="i">
      <el-card :body-style="{ padding: '0px' }" shadow="hover">
        <el-image :src="url" fit="cover" lazy></el-image>
        <p>{{"aaa"}}</p>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'JudgesAvatar',
  data() {
    return {
      url:
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
    }
  }
}
</script>
<style scoped>
.el-row {
  flex-wrap: wrap;
}
.el-col {
  margin-bottom: 17px;
  width: 150px;
}
.el-image {
  width: 100%;
  height: 100%;
  max-width: 160px;
}
p {
  padding: 11px;
}
</style>
