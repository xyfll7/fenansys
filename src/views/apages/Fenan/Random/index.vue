<template>
  <div>
    <Title :title="title" />
    <el-row>
      <el-col :span="8">
        <TeamNav />
      </el-col>
      <el-col :span="8">
        <JudgesAvatar />
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'Random',
  components: {
    Title: () => import('../../Title'),
    TeamNav: () => import('./TeamNav'),
    JudgesAvatar: () => import('../JudgesAvatar')
  },
  data() {
    return {
      title: undefined
    }
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
