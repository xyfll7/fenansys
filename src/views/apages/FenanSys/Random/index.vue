<template>
  <el-row>
    <el-col :span="8">
      <TeamNav />
    </el-col>
    <el-col :span="8">
      <JudgesAvatar />
    </el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple"></div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'Random',
  components: {
    TeamNav: () => import('./TeamNav'),
    JudgesAvatar: () => import('../JudgesAvatar')
  }
}
</script>
<style scoped>
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
