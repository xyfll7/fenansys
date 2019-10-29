<template>
  <el-row type="flex" justify="center">
    <el-col :xs="22" :sm="20" :md="17" :lg="12" :xl="11">
      <Title title="团队管理" />
      <p class="graytitle">请填写团队名称</p>
      <Add />
      <Table />
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'AddTeam',
  components: {
    Title: () => import('../../Title'),
    Add: () => import('./Add'),
    Table: () => import('./Table')
  }
}
</script>
<style scoped>
.graytitle {
  margin: 10px 0 25px 0;
}
</style>
