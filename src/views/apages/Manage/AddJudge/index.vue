<template>
  <el-row>
    <el-row>
      <Title title="新增法官" />
      <p class="graytitle">请填写法官基本信息</p>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="10" :sm="9" :md="8" :lg="6" :xl="6">
        <Avatar />
      </el-col>
      <el-col :xs="19" :sm="15" :md="13" :lg="9" :xl="7">
        <Add />
      </el-col>
    </el-row>
  </el-row>
</template>
<script>
export default {
  name: 'AddJudge',
  components: {
    Title: () => import('../../Title'),
    Avatar: () => import('./Avatar'),
    Add: () => import('./Add')
  },
  activated () {
    if (this.$route.path !== '/addjudge') {
      this.$router.push({ path: '/addjudge' }).then(() => { })
    }
  },
  deactivated () {
    console.log('dddxxxxxxxxxx')
  }
}
</script>
<style scoped>
.graytitle {
  margin: 10px 0 25px 0;
}
</style>
