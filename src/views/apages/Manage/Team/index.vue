<template>
  <el-row type="flex" justify="center">
    <el-col :xs="22" :sm="20" :md="17" :lg="12" :xl="11">
      <Title title="团队管理" />
      <p class="graytitle">请输入团队名称，添加团队</p>
      <Add />
      <Table />
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'Team',
  components: {
    Title: () => import('../../Title'),
    Add: () => import('./Add'),
    Table: () => import('./Table')
  },
  activated () {
    if (this.$route.path !== '/addteam') {
      this.$router.push({ path: '/addteam' }).then(() => { })
    }
  }
}
</script>
<style scoped>
.graytitle {
  margin: 10px 0 25px 0;
}
</style>
